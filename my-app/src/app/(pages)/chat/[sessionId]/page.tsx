"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; 
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from 'react-toastify';

import { useSession } from "next-auth/react";

import Sidebar from "../../../components/sidebar/sidebar";
import { FaStopCircle } from "react-icons/fa";
import { FaCircleArrowUp } from "react-icons/fa6";
import "../page.css";

// Add interface for chat message
interface ChatMessage {
  role: string;
  content: string;
}

const Page = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  const [userChat, setUserChat] = useState<ChatMessage[]>([]);
  const [aiChat, setAiChat] = useState<ChatMessage[]>([]);

  
  const router = useRouter();

  const [geminiApiKey, setGeminiApiKey] = useState("");

  const { status, data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const { sessionId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/api/history?sessionId=${sessionId}`);

        console.log(response.data)
        setUserChat(response.data.chatSession.messages.filter((msg: any) => msg.role === "user"));
        setAiChat(response.data.chatSession.messages.filter((msg: any) => msg.role === "ai"));
        
      } catch (error) {
        toast.error("Error fetching chat session");
      }
    }
    if (sessionId) {
      fetch();
    }
  }, [sessionId]);  
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedApiKey = localStorage.getItem("GEMINI_API_KEY");
      if (storedApiKey) {
        setGeminiApiKey(storedApiKey);
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    if (!geminiApiKey) {
      toast.error("Please enter your Gemini API key");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`/api/chat/${sessionId}`, { 
        message: message,
        apiKey: geminiApiKey,
        sessionId: sessionId
      }, { 
        headers: { "Content-Type": "application/json" } 
      });

      setMessage("");

      // Update chat messages from the response
      setUserChat(response.data.chatSession.messages.filter((msg: any) => msg.role === "user"));
      setAiChat(response.data.chatSession.messages.filter((msg: any) => msg.role === "ai"));

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error processing your request");
      setResponse("Error: Unable to fetch response. Try again.");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");  
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;


  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="ChatComponent">
      <div className="ChatComponent-in">
        <div className={`chat-one ${isOpen ? "open" : "closed"}`}>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        <div className={`chat-two ${isOpen ? "open" : "closed"}`}>
          <div className="chat-two-in">
            <div className="chat-two-one">
              <div className="chat-two-one-one">
                <h1>OpenQuery AI</h1>
              </div>
                {session && (
                  <div className="chat-two-one-two">
                        <Image 
                            src={session?.user?.image || '/user.png'}
                            alt='user'
                            width={30}
                            height={30}
                        />
                        <p>{session?.user?.name}</p>
                  </div>
                )}
            </div>

            <div className="chat-two-two">
                <div className="chat-response">
                  {userChat.map((msg, index) => (
                    <React.Fragment key={index}>
                      <div className="chat-response-one">
                        <div className="chat-response-one-one">
                          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                      {aiChat[index] && (
                        <div className="chat-response-two">
                          <div className="chat-response-two-one">
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                              {aiChat[index].content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {isLoading && <p>Thinking....</p>}
              <div className="chat-input-container">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  value={message}
                  onChange={handleChange}
                  className="chat-input"
                  onKeyPress={handleEnter}
                />
                <div className="chat-send" onClick={handleSubmit}>
                  {isLoading ? <FaStopCircle /> : <FaCircleArrowUp />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

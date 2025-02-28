"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; 
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import Sidebar from "../../components/sidebar/sidebar";
import { FaCircleArrowUp } from "react-icons/fa6";
import "./page.css";


const Page = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state


  const { status, data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { message: message }, { 
        headers: { "Content-Type": "application/json" } 
      });

      setResponse(res.data.response);
    } catch (error) {
      console.error("API Error:", error);
      setResponse("⚠️ Error: Unable to fetch response. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");  
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;

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
              {loading ? (
                <div className="chat-loading">⏳ Generating response...</div>
              ) : response ? (
                <div className="chat-response">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {response}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="chat-placeholder">
                  <h1>What can I help with?</h1>
                </div>
              )}

              <div className="chat-input-container">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  value={message}
                  onChange={handleChange}
                  className="chat-input"
                />
                <div className="chat-send" onClick={handleSubmit}>
                  <FaCircleArrowUp />
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

import React, { useState} from 'react'

import "./apiModel.css";

import { IoMdClose } from "react-icons/io";


interface apiModelProps {
    setOpenApiModel: (open: boolean) => void;
}

const ApiModel = ({ setOpenApiModel }: apiModelProps) => {

    const [apiKey, setApiKey] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(e.target.value);
    };

    const handleSubmit = async () => {
        if (!apiKey.trim()) return;
        localStorage.setItem("GEMINI_API_KEY", apiKey);
        setApiKey("");
        setOpenApiModel(false);
        window.location.reload();
    } 

    const handleApiModel = () => {
        setOpenApiModel(false);
    }

  return (
        <div className="apiModelComponent">
            <div className="apiModelComponent-in">
                <div className="apiModel-one" onClick={handleApiModel}>
                    <IoMdClose />
                </div>
                <div className="apiModel-two">
                    <h1>Enter you Gemini api key from Google AI Studio</h1>
                    <p>We don&apos;t store your API keys. They are securely stored in your browser&apos;s local storage.</p>
                </div>
                <div className="apiModel-three">
                    <input 
                        type="text" 
                        placeholder="Enter your API key" 
                        value={apiKey}
                        name={apiKey}
                        onChange={handleChange}
                    />
                </div>
                <div className="apiModel-four">
                    <button onClick={handleSubmit} >Save</button>
                </div>
            </div>
        </div>
  )
}

export default ApiModel
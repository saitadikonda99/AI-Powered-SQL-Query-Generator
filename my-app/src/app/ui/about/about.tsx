import React from 'react'
import { CodeBlock, irBlack	 } from 'react-code-blocks';

import './about.css'

import { BsCopy } from "react-icons/bs";

const About = () => {
  return (
        <div className="AboutComponent">
            <div className="AboutComponent-in">
                <div className="about-one">
                    <h1>How OpenQuery AI <span>Works?</span></h1>
                </div>
                <div className="about-two">
                    <div className="about-two-in">
                        <div className="about-two-in-one">
                            <p>The <span>AI-Powered SQL Query Generator</span> converts natural language into optimized SQL using <span>Gemini API</span>. When a user inputs a query like <span>&quot;Show all orders from last month&quot;</span>, the system generates an SQL statement, which can be executed on a <span>MySQL/PostgreSQL</span> database for instant results. 🚀</p>
                        </div>
                        <div className="about-two-in-two">
                            <div className="about-two-in-two-one">
                                <p>Show all orders from last month</p>
                            </div>
                            <div className="about-two-in-two-two">
                                <div className="about-two-in-two-two-one">
                                    <p>The SQL query to retrieve all orders from last month:</p>
                                </div>
                                <div className="about-two-in-two-two-two">
                                    <p>sql</p>
                                    <p><BsCopy /> copy</p>
                                </div>
                                <div className="about-two-in-two-two-three">
                                    <CodeBlock
                                        text={`SELECT * FROM orders \nWHERE order_date >= '2021-08-01' \nAND order_date <= '2021-08-31';`}
                                        language='sql'
                                        showLineNumbers={false}
                                        theme={irBlack	}
                                    />
                                </div>
                                <div className="about-two-in-two-two-four">
                                    <p>Let me know if you need any modifications! 🚀</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default About;
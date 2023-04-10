import React, { useState } from 'react';
import openai from 'openai';

const ChatGPT = () => {
  const [conversation, setConversation] = useState([]);

  const chat = async (message) => {
    const prompt = `The following is a conversation with an AI assistant. The assistant helps with answering questions about various topics. Please feel free to ask any question about food or cooking.\n\nUser: ${message}\nAI:`;
    const result = await openai.completions.create({
      engine: 'text-davinci-002',
      prompt: prompt,
      maxTokens: 150,
      n: 1,
      stop: ['\n'],
    });
    const response = result.choices[0].text.trim();
    setConversation([...conversation, { message, response }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    chat(message);
    event.target.message.value = '';
  };

  return (
    <div>
      <h1>Chat with AI Assistant</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" placeholder="Ask a question..." />
        <button type="submit">Send</button>
      </form>
      <ul>
        {conversation.map((item, index) => (
          <li key={index}>
            <strong>You: </strong>
            {item.message}
            <br />
            <strong>AI: </strong>
            {item.response}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatGPT;

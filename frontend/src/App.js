import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //When clicked on send button, send text to backend
  const handleClick = async () => {
    try {
      //request using fetch, using await wait for the response from backend
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "prompt": input })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setResponse(data.answer);  // Update the response state with the data
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={handleClick}>Send</button>
      <p>{response}</p> 
    </div>
  );
}

export default App;

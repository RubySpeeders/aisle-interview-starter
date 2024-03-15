import { useState } from "react";
import "./App.css";

function App() {
  const [ letter, setLetter ] = useState<string>('');
  const [message, setMessage ] = useState("")

  // Example POST method implementation:
  async function postData(url = "http://localhost:3000/letter", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  
  return (
    <>
      <label htmlFor="letter">Letter:</label>
      <input type="text" id="letter" name="letter" required minLength={0} maxLength={1} value={letter} onChange={(e)=>setLetter(e.target.value)}/>
      <button type="button" onClick={()=>{
        postData("http://localhost:3000/letter", {letter: letter }).then((data) => {
        setMessage(data.message); // JSON data parsed by `data.json()` call
      })}}>Submit</button>
      {message?<p>{message}</p>: <p>No data! Try submitting a letter</p>}
    </>
  )
}

export default App;
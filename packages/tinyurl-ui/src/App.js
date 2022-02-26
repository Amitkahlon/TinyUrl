import "./App.css";
import { useState } from "react";
import { submit } from "./Services/urlService";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="center">
      <h1 id="header" style={{ fontSize: 45 }}>TinyURL</h1>
      <p style={{ fontSize: 15 }} id="sub_title">
        <b>Enter a a long url, and we will make it shorter &#128512;: </b>
      </p>
      <input id="url_input" onChange={(e) => setLongUrl(e.target.value)} />
      <button
      id="submit_btn"
      style={{marginLeft: 10}}
        onClick={async (e) => {
          try {
            const message = await submit(longUrl);
            setError("");
            setShortUrl(message);
          } catch (error) {
            setError(error.message);
          }
        }}
      >
        Submit
      </button>
      <p id="output_msg">
        <b>Your link:</b>
      </p>
      {!error ? <a id="output_link" href={shortUrl}>{shortUrl}</a> : <p id="error" style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;

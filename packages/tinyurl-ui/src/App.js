import "./App.css";
import { useState } from "react";
import { submit } from "./Services/urlService";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="center">
      <h1 style={{ fontSize: 45 }}>TinyURL</h1>
      <p style={{ fontSize: 15 }}>
        <b>Enter a a long url, and we will make it shorter &#128512;: </b>
      </p>
      <input onChange={(e) => setLongUrl(e.target.value)} />
      <button
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
      <p>
        <b>Your link:</b>
      </p>
      {!error ? <a href={shortUrl}>{shortUrl}</a> : <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;

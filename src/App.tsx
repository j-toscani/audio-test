import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Mein Audio",
        artist: "Künstler",
        album: "Album",
      });

      const audio = document.querySelector("audio")!;
      console.log(audio)
      // Play/Pause Buttons
      navigator.mediaSession.setActionHandler("play", () => {
        audio.play();
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        audio.pause();
      });

      // **Vorspulen (z.B. 10 Sekunden vor)**
      navigator.mediaSession.setActionHandler("seekforward", (details) => {
        const seekTime = details.seekOffset || 10; // Standardmäßig 10 Sekunden
        audio.currentTime = Math.min(
          audio.currentTime + seekTime,
          audio.duration
        );
      });

      // **Zurückspulen (z.B. 10 Sekunden zurück)**
      navigator.mediaSession.setActionHandler("seekbackward", (details) => {
        const seekTime = details.seekOffset || 10; // Standardmäßig 10 Sekunden
        audio.currentTime = Math.max(audio.currentTime - seekTime, 0);
      });

      // **Direktes Springen zu einer bestimmten Stelle (optional)**
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.seekTime !== undefined) {
          audio.currentTime = details.seekTime;
        }
      });
    }
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <audio controls src="rainy-day-in-town-with-birds-singing-194011.mp3"></audio>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

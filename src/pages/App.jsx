import { Button } from "@/components/ui/button";
import LandingPages from "./landingPage/Faq";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import { useState } from "react";
import "../styles/index.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          className="mx-3 bg-slate-600"
          onClick={() => setCount((count) => count + 1)}
          disabled
        >
          count is {count}
        </Button>
        <Button
          className="mx-3 bg-slate-600"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <Button variant="outline">Button outline</Button>
        <Button variant="link">
          <a href="/aaa">Link Btn</a>
        </Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <LandingPages />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

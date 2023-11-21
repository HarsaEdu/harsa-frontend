import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
// import '../styles/App.css'
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/landing-page/hero";
import GetApps from "@/components/landing-page/get-apps";
import { InputType, InputSelect, TextAreaLabel } from "@/components/inputs";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Hero />
      <GetApps />
      <div className="container">
        <div className="mb-4">
          <InputType label="Email" type="email" placeholder="Email Disini" />
        </div>
        <div className="mb-4">
          <InputType label="File" type="file" />
        </div>
        <div className="mb-4">
          <InputType
            label="Label"
            type="password"
            placeholder="Password Disini"
          />
        </div>
        <div className="mb-4">
          <InputSelect
            label="Role"
            placeholder="Role Pilih Disini"
            id="role"
            options={["Admin", "Instructor"]}
          />
        </div>
        <div className="mb-4">
          <TextAreaLabel
            label="Deskripsi"
            id="description"
            placeholder="Deskripsi Masukkan Disini"
          />
        </div>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

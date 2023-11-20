import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
// import '../styles/App.css'
import { Button } from '@/components/ui/button'
import { buttonVariants } from "@/components/ui/button"
import { Link } from 'lucide-react'
import Navbar from '@/components/ui/navbar'

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
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
        <Button className="bg-slate-600 mx-3" onClick={() => setCount((count) => count + 1)} disabled>count is {count}</Button>
        <Button className="bg-slate-600 mx-3" onClick={() => setCount((count) => count + 1)} >count is {count}</Button>
        <Button variant="outline">Button outline</Button>
        <Button variant="link"><a href="/aaa">Link Btn</a></Button>
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

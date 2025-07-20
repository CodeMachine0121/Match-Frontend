import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MatchList from "./MatchList";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MatchList />
    </>
  )
}

export default App

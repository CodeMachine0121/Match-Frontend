import { useState } from 'react'
import './App.css'
import MatchList from "./MatchList";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>MatchVista</h1>
        <p className="app-subtitle">Live Esports Match Tracker</p>
      </header>
      <main className="app-main">
        <MatchList />
      </main>
    </div>
  )
}

export default App

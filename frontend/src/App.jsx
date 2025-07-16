import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VulnerabilityWarning from './components/VulnerabilityWarning'
import Home from './components/Home'
import EventPreview from './components/EventPreview'
import './App.css'

function App() {
  const [showWarning, setShowWarning] = useState(true)

  const handleDismissWarning = () => {
    setShowWarning(false)
  }

  if (showWarning) {
    return <VulnerabilityWarning onDismiss={handleDismissWarning} />
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventPreview />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

import { useState, useEffect } from 'react'
import { Search, MessageCircle, Eye, EyeOff, Wifi, Terminal } from 'lucide-react'
import EventCard from './EventCard'
import './Home.css'

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    description: "Join us for an amazing outdoor music experience with top artists from around the world. A night full of great music and vibes.",
    price: "$89.99",
    icon: "🎵",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Electronic Nights",
    description: "Experience the best electronic music with world-class DJs and an incredible light show that will blow your mind.",
    price: "$65.50",
    icon: "🎧",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Jazz & Blues Evening",
    description: "A sophisticated evening of smooth jazz and soulful blues performed by talented local and international artists.",
    price: "$45.00",
    icon: "🎷",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Rock Concert Extravaganza",
    description: "Get ready to rock! High-energy performances from the best rock bands with an explosive atmosphere.",
    price: "$75.99",
    icon: "🎸",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=300&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Classical Orchestra Performance",
    description: "An elegant evening featuring a full orchestra performing timeless classical masterpieces in a beautiful venue.",
    price: "$55.00",
    icon: "🎼",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
  },
  {
    id: 6,
    title: "Hip-Hop Block Party",
    description: "Street culture comes alive with the hottest hip-hop artists, breakdancing, and urban art in an epic block party.",
    price: "$40.00",
    icon: "🎤",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=300&h=200&fit=crop"
  }
]

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [showIntercepted, setShowIntercepted] = useState(false)
  const [logIndex, setLogIndex] = useState(0)

  // Simulated log countdown effect
  useEffect(() => {
    if (showIntercepted) {
      const timer = setInterval(() => {
        setLogIndex(prev => (prev + 1) % 3)
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [showIntercepted])

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    const filtered = mockEvents.filter(event =>
      event.title.toLowerCase().includes(term) ||
      event.description.toLowerCase().includes(term)
    )
    setFilteredEvents(filtered)
  }

  // Network traffic logs with subtle hints (Caesar VII encoded)
  const interceptedLogs = [
    {
      timestamp: "2025-01-10 15:47:23",
      source: "192.168.1.127",
      destination: "hackfest.local",
      protocol: "HTTP POST",
      path: "/jvumpn",
      payload: "Johkhizpvu lhkwvpua pz h khjrtlu mvby jvumpn chyz",
      status: "ENCRYPTED",
      severity: "HIGH"
    },
    {
      timestamp: "2025-01-10 15:48:11",
      source: "10.0.0.88",
      destination: "hackfest.local",
      protocol: "HTTP",
      path: "/admin/logs",
      payload: "Phts whyzly hjjlwaz hwwspjhapvu-u-phts jvualua afw",
      status: "INTERCEPTED",
      severity: "CRITICAL"
    },
    {
      timestamp: "2025-01-10 15:49:45",
      source: "172.16.0.42",
      destination: "hackfest.local",
      protocol: "TCP",
      path: "/system/config",
      payload: "Buzzhml svhkly hssvdz viqlja hwwsf ltljbapvu jvkl",
      status: "COMPROMISED",
      severity: "CRITICAL"
    }
  ]

  const toggleIntercepted = () => {
    setShowIntercepted(!showIntercepted)
    setLogIndex(0)
  }

  return (
    <div className="home">
      {/* Header Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">hackfest</h1>
          <p className="subtitle">Discover Amazing Music Events</p>

          <div className="search-container">
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search for events..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intercepted Communications Section */}
      <section className="intercepted-section">
        <div className="container">
          <div className="intercepted-banner">
            <div className="banner-header">
              <Wifi className="signal-icon" size={24} />
              <div className="header-text">
                <h3>🔴 COMUNICACIONES INTERCEPTADAS</h3>
                <p>Tráfico de red anómalo detectado - Protocolo de seguridad comprometido</p>
              </div>
              <Terminal className="terminal-icon" size={24} />
            </div>

            <div className="status-bar">
              <span className="status-item">
                <span className="status-dot active"></span>
                MONITOREO ACTIVO
              </span>
              <span className="status-item">
                <span className="status-dot warning"></span>
                PAQUETES CIFRADOS: 3
              </span>
              <span className="status-item">
                <span className="status-dot danger"></span>
                AMENAZA: ALTA
              </span>
            </div>

            <button className="access-logs-button" onClick={toggleIntercepted}>
              {showIntercepted ? <EyeOff size={16} /> : <Eye size={16} />}
              {showIntercepted ? 'OCULTAR LOGS' : 'ACCEDER A LOGS DE RED'}
            </button>

            {showIntercepted && (
              <div className="logs-terminal">
                <div className="terminal-header">
                  <div className="terminal-controls">
                    <span className="control-dot red"></span>
                    <span className="control-dot yellow"></span>
                    <span className="control-dot green"></span>
                  </div>
                  <div className="terminal-title">NETWORK_MONITOR.exe - SHADOW ACCESS</div>
                </div>

                <div className="terminal-content">
                  <div className="log-header">
                    [SHADOWBYTE COLLECTIVE] - NETWORK TRAFFIC ANALYSIS
                    <br />
                    Scanning compromised endpoints... Found encrypted communications
                    <br />
                    <span className="blink">▋</span>
                  </div>

                  {interceptedLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`log-entry ${index === logIndex ? 'highlighted' : ''} ${index <= logIndex ? 'visible' : ''}`}
                    >
                      <div className="log-meta">
                        <span className="timestamp">[{log.timestamp}]</span>
                        <span className={`severity ${log.severity.toLowerCase()}`}>[{log.severity}]</span>
                        <span className="protocol">{log.protocol}</span>
                      </div>
                      <div className="log-network">
                        {log.source} → {log.destination}{log.path}
                      </div>
                      <div className="log-payload">
                        <span className="payload-label">ENCRYPTED_DATA:</span>
                        <span className="encrypted-data">{log.payload}</span>
                      </div>
                      <div className="log-status">
                        STATUS: <span className={`status ${log.status.toLowerCase()}`}>{log.status}</span>
                      </div>
                    </div>
                  ))}

                  <div className="log-footer">
                    <br />
                    {'>'} Encryption pattern detected: Classical substitution cipher
                    <br />
                    {'>'} Key rotation: Historical sequence VII
                    <br />
                    {'>'} Recommendation: Analyze communication patterns
                    <br />
                    <span className="blink">▋</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="container">
          <h2 className="section-title">Featured Events</h2>
          <div className="events-grid">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="no-results">
              <p>No events found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home

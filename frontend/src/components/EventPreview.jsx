import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Clock, Users, ShoppingCart } from 'lucide-react'
import './EventPreview.css'

// Mock event data (in a real app, this would come from an API)
const eventDetails = {
  1: {
    id: 1,
    title: "Summer Music Festival",
    description: "Join us for an amazing outdoor music experience with top artists from around the world. A night full of great music and vibes.",
    fullDescription: "Get ready for the ultimate summer music experience! This festival brings together the biggest names in music for an unforgettable weekend. With multiple stages, food vendors, and activities for all ages, this is the perfect event for music lovers. Experience live performances from chart-topping artists, discover new bands, and create memories that will last a lifetime.",
    price: "$89.99",
    icon: "🎵",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=400&fit=crop",
    date: "July 15-17, 2024",
    location: "Central Park, New York",
    time: "6:00 PM - 2:00 AM",
    capacity: "50,000 people",
    artists: ["Artist One", "The Music Band", "DJ Awesome", "Rock Stars"]
  },
  2: {
    id: 2,
    title: "Electronic Nights",
    description: "Experience the best electronic music with world-class DJs and an incredible light show that will blow your mind.",
    fullDescription: "Immerse yourself in the pulsating world of electronic music. This event features the most talented DJs from around the globe, cutting-edge sound systems, and mesmerizing visual effects. Dance the night away under spectacular light shows and experience electronic music like never before.",
    price: "$65.50",
    icon: "🎧",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    date: "August 5, 2024",
    location: "Electric Arena, Los Angeles",
    time: "9:00 PM - 6:00 AM",
    capacity: "15,000 people",
    artists: ["DJ Electro", "Bass Master", "Synth Wave", "Future Beats"]
  },
  3: {
    id: 3,
    title: "Jazz & Blues Evening",
    description: "A sophisticated evening of smooth jazz and soulful blues performed by talented local and international artists.",
    fullDescription: "Step into an elegant world of smooth jazz and soulful blues. This intimate evening features world-class musicians performing in a beautiful venue with perfect acoustics. Enjoy craft cocktails and gourmet food while listening to timeless melodies and contemporary interpretations.",
    price: "$45.00",
    icon: "🎷",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=400&fit=crop",
    date: "September 12, 2024",
    location: "Blue Note Club, Chicago",
    time: "7:30 PM - 11:30 PM",
    capacity: "500 people",
    artists: ["Jazz Quartet", "Blues Legend", "Smooth Saxophone", "Piano Virtuoso"]
  },
  4: {
    id: 4,
    title: "Rock Concert Extravaganza",
    description: "Get ready to rock! High-energy performances from the best rock bands with an explosive atmosphere.",
    fullDescription: "Feel the power of rock music at its finest! This high-energy concert features legendary and upcoming rock bands delivering unforgettable performances. With thunderous drums, screaming guitars, and passionate vocals, this show will leave you breathless and wanting more.",
    price: "$75.99",
    icon: "🎸",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=400&fit=crop",
    date: "October 20, 2024",
    location: "Rock Stadium, Detroit",
    time: "7:00 PM - 12:00 AM",
    capacity: "25,000 people",
    artists: ["Thunder Rock", "Electric Storm", "Metal Legends", "Rock Revolution"]
  },
  5: {
    id: 5,
    title: "Classical Orchestra Performance",
    description: "An elegant evening featuring a full orchestra performing timeless classical masterpieces in a beautiful venue.",
    fullDescription: "Experience the grandeur of classical music with a full symphony orchestra. This elegant evening features masterpieces from renowned composers performed in a stunning concert hall. Dress up for this sophisticated cultural experience that celebrates the timeless beauty of classical music.",
    price: "$55.00",
    icon: "🎼",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    date: "November 8, 2024",
    location: "Symphony Hall, Boston",
    time: "8:00 PM - 10:30 PM",
    capacity: "2,500 people",
    artists: ["Metropolitan Orchestra", "Conductor Maestro", "Violin Soloist", "Piano Concerto"]
  },
  6: {
    id: 6,
    title: "Hip-Hop Block Party",
    description: "Street culture comes alive with the hottest hip-hop artists, breakdancing, and urban art in an epic block party.",
    fullDescription: "Join the ultimate celebration of hip-hop culture! This block party brings together the hottest artists, amazing breakdancers, graffiti artists, and the whole community for an authentic urban experience. Feel the energy of the streets and witness incredible performances.",
    price: "$40.00",
    icon: "🎤",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=400&fit=crop",
    date: "December 3, 2024",
    location: "Urban Plaza, Atlanta",
    time: "4:00 PM - 11:00 PM",
    capacity: "8,000 people",
    artists: ["MC Flow", "Hip-Hop Legends", "Street Dancers", "Beat Makers"]
  }
}

function EventPreview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = eventDetails[id]

  if (!event) {
    return (
      <div className="event-preview error">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Events</span>
        </button>
        <h2>Event not found</h2>
        <p>The event you're looking for doesn't exist.</p>
      </div>
    )
  }

  const handleBuyTicket = () => {
    alert(`Purchase functionality for "${event.title}" will be implemented later!`)
  }

  return (
    <div className="event-preview">
      <button onClick={() => navigate('/')} className="back-button">
        <ArrowLeft size={20} />
        <span>Back to Events</span>
      </button>

      <div className="preview-hero">
        <img src={event.image} alt={event.title} className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="event-icon-large">{event.icon}</div>
            <h1 className="preview-title">{event.title}</h1>
            <p className="preview-subtitle">{event.description}</p>
          </div>
        </div>
      </div>

      <div className="preview-content">
        <div className="content-grid">
          <div className="main-content">
            <section className="description-section">
              <h2>About This Event</h2>
              <p>{event.fullDescription}</p>
            </section>

            <section className="artists-section">
              <h2>Featured Artists</h2>
              <div className="artists-list">
                {event.artists.map((artist, index) => (
                  <span key={index} className="artist-tag">{artist}</span>
                ))}
              </div>
            </section>
          </div>

          <div className="sidebar">
            <div className="event-details">
              <h3>Event Details</h3>

              <div className="detail-item">
                <Calendar size={18} />
                <span>{event.date}</span>
              </div>

              <div className="detail-item">
                <Clock size={18} />
                <span>{event.time}</span>
              </div>

              <div className="detail-item">
                <MapPin size={18} />
                <span>{event.location}</span>
              </div>

              <div className="detail-item">
                <Users size={18} />
                <span>{event.capacity}</span>
              </div>
            </div>

            <div className="purchase-section">
              <div className="price-display">
                <span className="price-label">Ticket Price</span>
                <span className="price-value">{event.price}</span>
              </div>

              <button className="purchase-button" onClick={handleBuyTicket}>
                <ShoppingCart size={20} />
                <span>Buy Tickets</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPreview

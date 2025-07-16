import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import './EventCard.css'

function EventCard({ event }) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/event/${event.id}`)
  }

  const handleBuyClick = (e) => {
    e.stopPropagation() // Prevent card click when buy button is clicked
    // Handle buy functionality here (not implemented yet)
    alert(`Purchase functionality for "${event.title}" will be implemented later!`)
  }

  return (
    <div className="event-card" onClick={handleCardClick}>
      <div className="card-image">
        <div className="event-icon">{event.icon}</div>
        <img src={event.image} alt={event.title} className="event-image" />
      </div>

      <div className="card-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>

        <div className="card-footer">
          <div className="price-section">
            <span className="price">{event.price}</span>
          </div>

          <button
            className="buy-button"
            onClick={handleBuyClick}
          >
            <ShoppingCart size={16} />
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCard

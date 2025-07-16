# Hackfest Frontend

A modern React + Vite frontend for the hackfest music events platform.

## 🚀 Features

### Home Page
- **Hero Section**: Beautiful gradient background with the "hackfest" title and search functionality
- **Search Bar**: Real-time filtering of events by title and description
- **Events Grid**: Responsive grid layout displaying event cards

### Event Cards
- **Visual Design**: Each card includes:
  - Event icon (emoji)
  - Event image
  - Title and description
  - Price display
  - Buy button with shopping cart icon
- **Interactive**: Cards are clickable to navigate to event details
- **Hover Effects**: Smooth animations and elevated shadows

### Event Preview Page
- **Hero Section**: Large event image with overlay containing event details
- **Detailed Information**:
  - Full event description
  - Featured artists list
  - Event details (date, time, location, capacity)
  - Purchase section with pricing
- **Navigation**: Back button to return to home page

## 🛠️ Technologies

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Lucide React**: Modern icon library
- **Custom CSS**: Responsive design with modern styling

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradient backgrounds
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper semantic HTML and keyboard navigation
- **Typography**: Inter font for clean, readable text

## 📁 Project Structure

```
src/
├── components/
│   ├── Home.jsx           # Main home page component
│   ├── Home.css          # Home page styles
│   ├── EventCard.jsx     # Individual event card component
│   ├── EventCard.css     # Event card styles
│   ├── EventPreview.jsx  # Event detail page component
│   └── EventPreview.css  # Event preview styles
├── App.jsx               # Main app component with routing
├── App.css              # Global app styles
├── index.css            # Global CSS and fonts
└── main.jsx             # App entry point
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Current Status

- ✅ Home page with search functionality
- ✅ Event cards with all required elements
- ✅ Event preview/detail pages
- ✅ Responsive design
- ✅ Modern UI/UX
- ⏳ Backend integration (to be implemented)
- ⏳ Functional purchase system (to be implemented)

## 🔮 Next Steps

1. **Backend Integration**: Connect to the Flask backend for real event data
2. **Purchase Flow**: Implement actual ticket purchasing functionality
3. **User Authentication**: Add user login/registration
4. **Payment Processing**: Integrate payment gateway
5. **Event Management**: Admin interface for managing events

## 📱 Demo Data

The app currently uses mock data with 6 different music events:
- Summer Music Festival
- Electronic Nights
- Jazz & Blues Evening
- Rock Concert Extravaganza
- Classical Orchestra Performance
- Hip-Hop Block Party

Each event includes realistic details, pricing, and featured artists for demonstration purposes.

## 🎵 Events Available

All events are music-focused as requested:
- Various genres (Electronic, Jazz, Rock, Classical, Hip-Hop)
- Different venues and capacities
- Realistic pricing ($40-$90 range)
- Featured artists and detailed descriptions
- Event dates, times, and locations

Visit http://localhost:5173 to explore the application!

import React, { useState, useEffect } from 'react'
import {
    IonPage,
    IonContent,
    IonIcon
} from '@ionic/react'
import {
    location,
    chevronDown,
    notifications,
    arrowForward,
    search,
    qrCode
} from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './HomePage.css'

// Mock data
const sponsoredRestaurants = [
    {
        id: '1',
        name: 'Spicy Korean BBQ',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
        cuisine: 'Korean • BBQ',
        rating: 4.8,
        reviewCount: '1.2k',
        description: 'Experience the authentic taste of Seoul with our premium wagyu beef set.',
    },
    {
        id: '2',
        name: 'The Gourmet Kitchen',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        cuisine: 'Italian • Pizza • Pasta',
        rating: 4.5,
        reviewCount: '890',
        description: 'Authentic Italian cuisine with handmade pasta and wood-fired pizzas.',
    },
    {
        id: '3',
        name: 'Sakura Japanese',
        image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
        cuisine: 'Japanese • Sushi • Ramen',
        rating: 4.7,
        reviewCount: '1.5k',
        description: 'Traditional Japanese flavors with a modern twist.',
    },
]

const nearbyRestaurants = [
    {
        id: '4',
        name: 'Green Bowl',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        cuisine: 'Salads • Healthy • Vegan',
        rating: 4.2,
        offer: '50% OFF',
        isVeg: true,
        deliveryTime: '25-30 min',
        priceForTwo: '20',
    },
    {
        id: '5',
        name: 'Burger Bistro',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        cuisine: 'American • Fast Food',
        rating: 4.5,
        deliveryTime: '35-40 min',
        priceForTwo: '15',
    },
    {
        id: '6',
        name: 'Pizza Paradise',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
        cuisine: 'Italian • Pizza',
        rating: 4.1,
        offer: 'FREE DELIVERY',
        isVeg: true,
        deliveryTime: '40-50 min',
        priceForTwo: '25',
    },
    {
        id: '7',
        name: 'Taco Fiesta',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
        cuisine: 'Mexican • Tacos',
        rating: 4.8,
        deliveryTime: '20-30 min',
        priceForTwo: '18',
    },
    {
        id: '8',
        name: 'Sakura Japanese',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
        cuisine: 'Japanese • Sushi • Ramen',
        rating: 4.7,
        deliveryTime: '30-45 min',
        priceForTwo: '30',
    },
    {
        id: '9',
        name: 'Bella Italia',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
        cuisine: 'Italian • Pizza • Pasta',
        rating: 4.5,
        isVeg: true,
        deliveryTime: '30-40 min',
        priceForTwo: '28',
    },
]

const personalizedPicks = [
    { id: 'p1', name: 'Spicy Korean BBQ', cuisine: 'Korean • BBQ', rating: 4.6, priceRange: '$$$', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200' },
    { id: 'p2', name: 'The Vegan Spot', cuisine: 'Vegan • Healthy', rating: 4.9, priceRange: '$$', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200' },
    { id: 'p3', name: 'Mediterranean Grill', cuisine: 'Mediterranean • Grills', rating: 4.3, priceRange: '$$', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200' },
]

interface Restaurant {
    id: string
    name: string
    image: string
    cuisine: string
    rating: number
    reviewCount?: string
    offer?: string
    isVeg?: boolean
    deliveryTime?: string
    priceForTwo?: string
    description?: string
    priceRange?: string
}

const HomePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [currentSlide, setCurrentSlide] = useState(0)
    const history = useHistory()

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sponsoredRestaurants.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const handleRestaurantPress = (restaurant: Restaurant) => {
        history.push(`/restaurant/${restaurant.id}`, { restaurant })
    }

    const handleQRPress = () => {
        history.push('/qr-scan')
    }

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sponsoredRestaurants.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sponsoredRestaurants.length) % sponsoredRestaurants.length)

    const currentFeatured = sponsoredRestaurants[currentSlide]

    return (
        <IonPage>
            <IonContent className="home-content" fullscreen scrollY={true}>
                {/* ==================== MOBILE VIEW ==================== */}
                <div className="mobile-view">
                    {/* Mobile Header */}
                    <header className="home-header">
                        <div className="location-container">
                            <span className="location-label">CURRENT LOCATION</span>
                            <button className="location-row">
                                <IonIcon icon={location} className="location-icon" />
                                <span className="location-text">Home • 5th Avenue, NYC</span>
                                <IonIcon icon={chevronDown} className="chevron-icon" />
                            </button>
                        </div>
                        <button className="notification-btn" onClick={() => history.push('/notifications')}>
                            <IonIcon icon={notifications} />
                            <span className="notification-dot" />
                        </button>
                    </header>

                    {/* Mobile Search Bar */}
                    <div className="search-wrapper">
                        <div className="search-bar-premium">
                            <IonIcon icon={search} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search restaurants..."
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Mobile QR Card */}
                    <button className="qr-hero-card" onClick={handleQRPress}>
                        <div className="qr-hero-icon-box">
                            <IonIcon icon={qrCode} />
                        </div>
                        <div className="qr-hero-text">
                            <span className="qr-hero-title">Scan Table QR</span>
                            <span className="qr-hero-subtitle">Order & pay from your table</span>
                        </div>
                        <div className="qr-hero-arrow">
                            <IonIcon icon={arrowForward} />
                        </div>
                    </button>

                    {/* Mobile Carousel */}
                    <section className="section sponsored-section">
                        <div className="section-header">
                            <h2 className="section-title">Best for you</h2>
                        </div>
                        <div className="slideshow-container">
                            <div className="slideshow-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                {sponsoredRestaurants.map((restaurant) => (
                                    <article key={restaurant.id} className="slideshow-slide" onClick={() => handleRestaurantPress(restaurant)}>
                                        <div className="slide-image-wrapper">
                                            <img src={restaurant.image} alt={restaurant.name} />
                                            <div className="slide-overlay" />
                                            <div className="slide-content">
                                                <div className="slide-badge-row">
                                                    <div className="slide-rating">
                                                        <span className="star">★</span>
                                                        <span>{restaurant.rating}</span>
                                                    </div>
                                                </div>
                                                <h3 className="slide-title">{restaurant.name}</h3>
                                                <p className="slide-cuisine">{restaurant.cuisine}</p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <div className="slideshow-dots">
                                {sponsoredRestaurants.map((_, index) => (
                                    <button key={index} className={`slideshow-dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Mobile Nearby Section */}
                    <section className="section">
                        <div className="section-header">
                            <h2 className="section-title">Nearby</h2>
                            <button className="see-all-btn" onClick={() => history.push('/all-restaurants')}>See all</button>
                        </div>
                        <div className="restaurants-list">
                            {nearbyRestaurants.slice(0, 3).map((restaurant) => (
                                <article key={restaurant.id} className="restaurant-card-list" onClick={() => handleRestaurantPress(restaurant)}>
                                    <div className="list-card-image">
                                        <img src={restaurant.image} alt={restaurant.name} />
                                        {restaurant.offer && <span className="badge-offer">{restaurant.offer}</span>}
                                    </div>
                                    <div className="list-card-body">
                                        <div className="list-card-header">
                                            <h3 className="list-card-title">{restaurant.name}</h3>
                                            {restaurant.isVeg && <div className="veg-dot" />}
                                        </div>
                                        <p className="list-card-cuisine">{restaurant.cuisine}</p>
                                        <div className="list-card-meta">
                                            <div className="rating-pill small">
                                                <span className="star">★</span>
                                                <span>{restaurant.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <div className="layout-bottom-spacer" />
                </div>


                {/* ==================== DESKTOP VIEW ==================== */}
                {/* Desktop Sticky Navbar */}
                <div className="desktop-view">
                    <nav className="desktop-navbar">
                        <div className="navbar-container">
                            <div className="nav-left">
                                <div className="nav-location">
                                    <span className="nav-location-label">Current Location</span>
                                    <button className="nav-location-btn">
                                        <IonIcon icon={location} style={{ fontSize: '20px', color: '#FF8C00' }} />
                                        <span>Home • 5th Avenue, NYC</span>
                                        <IonIcon icon={chevronDown} style={{ fontSize: '16px', color: '#9CA3AF' }} />
                                    </button>
                                </div>
                                <div className="nav-links">
                                    <a href="#" className="nav-link active">Home</a>
                                    <a href="#" className="nav-link">Explore</a>
                                    <a href="#" className="nav-link">Favorites</a>
                                    <a href="#" className="nav-link">Profile</a>
                                </div>
                            </div>

                            <div className="nav-search-container">
                                <div className="nav-search-wrapper">
                                    <IonIcon icon={search} className="nav-search-icon" />
                                    <input
                                        type="text"
                                        className="nav-search-input"
                                        placeholder="Search restaurants, cuisines..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="nav-actions">
                                <button className="nav-notify-btn">
                                    <IonIcon icon={notifications} />
                                    <span className="nav-notify-dot"></span>
                                </button>
                                <div className="nav-profile">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKpmsSzrU2bmoW-uTMMYxf44wkISf2gXPBLiucFsgi4lLQB5pKwZpUc2Fwc9XmZi_sxR_2-izpbXoYBjPFIriVTncGWI6WWMe8Ax-CcE1f_Xb0KV_Twl4iSNAKgBG6gOMl6XSObYIAPTzLA5coVffyYfONXr1o9s3DBscyzhhf1vpM7mnbMX7sxGRimvdHX4LYgvgHEOltBdUkyYyMz7SmQl5t5c7B21ECbJlPSl8afpjIP0Hzu6SFyfiEnVuOFOBo5U-b2yGrvog" alt="User" className="nav-avatar" />
                                    <div className="nav-user-info">
                                        <p className="nav-user-name">Alex Johnson</p>
                                        <p className="nav-user-level">Foodie Level 3</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className="desktop-layout">
                        {/* Left Sidebar */}
                        <aside className="left-sidebar">
                            <div className="desktop-card filter-card">
                                <h3 className="section-header">
                                    <span className="material-symbols-outlined text-primary" style={{ marginRight: '8px' }}>filter_alt</span>
                                    Filters
                                </h3>
                                <div className="filter-group">
                                    <h4 className="filter-title">Cuisine</h4>
                                    <label className="checkbox-label"><input type="checkbox" className="form-checkbox" /><span>Italian</span></label>
                                    <label className="checkbox-label"><input type="checkbox" className="form-checkbox" /><span>Japanese</span></label>
                                    <label className="checkbox-label"><input type="checkbox" className="form-checkbox" /><span>American</span></label>
                                    <label className="checkbox-label"><input type="checkbox" className="form-checkbox" /><span>Mexican</span></label>
                                    <button className="see-more-btn">See more</button>
                                </div>
                                <div className="filter-group">
                                    <h4 className="filter-title">Price Range</h4>
                                    <label className="checkbox-label"><input type="radio" name="price" className="form-radio" /><span>$ (Under $15)</span></label>
                                    <label className="checkbox-label"><input type="radio" name="price" className="form-radio" /><span>$$ ($15-$30)</span></label>
                                    <label className="checkbox-label"><input type="radio" name="price" className="form-radio" /><span>$$$ ($30+)</span></label>
                                </div>
                                <div className="filter-group">
                                    <h4 className="filter-title">Dietary</h4>
                                    <label className="checkbox-label"><input type="checkbox" className="form-checkbox" /><span>Vegetarian</span></label>
                                    <label className="checkbox-label"><input type="checkbox" className="form-checkbox" /><span>Vegan</span></label>
                                    <label className="checkbox-label"><input type="checkbox" className="form-checkbox" /><span>Gluten-Free</span></label>
                                </div>
                                <button className="apply-btn">Apply Filters</button>
                            </div>

                            <div className="desktop-card">
                                <h3 className="section-header">
                                    <span className="material-symbols-outlined text-primary" style={{ marginRight: '8px' }}>bookmark</span>
                                    Saved Lists
                                </h3>
                                <ul className="saved-lists">
                                    <li>
                                        <a href="#" className="saved-list-item">
                                            <span className="material-symbols-outlined text-muted" style={{ marginRight: '8px', fontSize: '18px' }}>arrow_right</span>
                                            Favorites (12)
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="saved-list-item">
                                            <span className="material-symbols-outlined text-muted" style={{ marginRight: '8px', fontSize: '18px' }}>arrow_right</span>
                                            Must Try (5)
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="saved-list-item">
                                            <span className="material-symbols-outlined text-muted" style={{ marginRight: '8px', fontSize: '18px' }}>arrow_right</span>
                                            Dinner Spots (8)
                                        </a>
                                    </li>
                                </ul>
                                <button className="create-list-btn">
                                    <span className="material-symbols-outlined" style={{ marginRight: '4px', fontSize: '18px' }}>add</span>
                                    Create New List
                                </button>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="main-content">
                            <section className="desktop-hero">
                                <img src={currentFeatured.image} alt={currentFeatured.name} className="hero-img" />
                                <div className="hero-gradient" />
                                <div className="hero-content">
                                    <div className="hero-flex">
                                        <div className="hero-text">
                                            <div className="hero-badges">
                                                <span className="hero-badge">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '14px', marginRight: '4px' }}>auto_awesome</span>
                                                    BEST FOR YOU
                                                </span>
                                                <span className="hero-subtitle">Based on your preferences</span>
                                            </div>
                                            <h2 className="hero-title">{currentFeatured.name}</h2>
                                            <p className="hero-desc">{currentFeatured.description}</p>
                                            <div className="hero-btns">
                                                <button className="btn-white" onClick={() => handleRestaurantPress(currentFeatured)}>View Details</button>
                                                <button className="btn-glass">
                                                    <IonIcon icon={location} style={{ fontSize: '20px' }} /> {/* Using location as placeholder for fav/heart since heart isn't imported, or use heartOutline if available. Actually provided code had favorite_border Material Icon, I'll use IonIcon heart if avail or just class material-icons if I have them loaded. The user's HTML loads Material Icons. existing imports: location, chevronDown, etc. I will use material-icons span for safety to match HTML */}
                                                    <span className="material-icons" style={{ fontSize: '20px' }}>favorite_border</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="hero-nav">
                                            <button className="btn-glass" onClick={prevSlide}>
                                                <span className="material-icons">chevron_left</span>
                                            </button>
                                            <button className="btn-glass" onClick={nextSlide}>
                                                <span className="material-icons">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="restaurants-header-row">
                                <h2 className="section-header" style={{ marginBottom: 0 }}>ALL RESTAURANTS</h2>
                                <div className="header-controls">
                                    <div className="sort-select-wrapper">
                                        <select className="sort-select">
                                            <option>Sort by: Popularity</option>
                                            <option>Sort by: Rating</option>
                                            <option>Sort by: Price (Low to High)</option>
                                        </select>
                                        <span className="material-icons sort-arrow">keyboard_arrow_down</span>
                                    </div>
                                    <button className="view-btn">
                                        <span className="material-symbols-outlined">view_list</span>
                                    </button>
                                    <button className="view-btn active">
                                        <span className="material-symbols-outlined">grid_view</span>
                                    </button>
                                </div>
                            </section>

                            <section className="restaurant-grid">
                                {nearbyRestaurants.map((restaurant) => (
                                    <article key={restaurant.id} className="grid-card" onClick={() => handleRestaurantPress(restaurant)}>
                                        <div className="card-img-container">
                                            <img src={restaurant.image} alt={restaurant.name} className="card-img" />
                                            <div className="card-rating-badge">
                                                <span className="material-icons star-icon">star</span>
                                                {restaurant.rating}
                                            </div>
                                            <button className="card-fav-btn">
                                                <span className="material-icons" style={{ fontSize: '16px' }}>favorite_border</span>
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="card-title">{restaurant.name}</h3>
                                            <p className="card-subtitle">{restaurant.cuisine}</p>
                                        </div>
                                    </article>
                                ))}
                            </section>
                        </main>

                        {/* Right Sidebar */}
                        <aside className="right-sidebar">
                            <div className="desktop-card">
                                <h3 className="section-header">
                                    <span className="material-symbols-outlined text-primary" style={{ marginRight: '8px' }}>psychology</span>
                                    Personalized Picks
                                </h3>
                                <div className="picks-list">
                                    {personalizedPicks.map((pick) => (
                                        <div key={pick.id} className="picks-item" onClick={() => handleRestaurantPress(pick as Restaurant)}>
                                            <img src={pick.image} alt={pick.name} className="picks-img" />
                                            <div className="picks-content">
                                                <h4 className="picks-title">{pick.name}</h4>
                                                <p className="picks-subtitle">{pick.cuisine}</p>
                                                <div className="picks-meta">
                                                    <span className="material-icons star-icon" style={{ fontSize: '14px', color: '#FACC15' }}>star</span>
                                                    <span style={{ marginRight: '8px' }}>{pick.rating}</span>
                                                    <span className="material-icons" style={{ fontSize: '14px', marginRight: '2px' }}>attach_money</span>
                                                    {pick.priceRange}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="view-recommendations-btn">
                                    View More Recommendations
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default HomePage

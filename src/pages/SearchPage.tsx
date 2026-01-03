import React, { useState } from 'react'
import {
    IonPage,
    IonContent,
    IonIcon,
    IonSearchbar
} from '@ionic/react'
import {
    location,
    chevronDown,
    timeOutline,
    searchOutline,
    arrowUp,
    // notifications,
    filterOutline,
    chevronBack,
    chevronForward,
    heartOutline,
    timeOutline as scheduleIcon
} from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './SearchPage.css'

// Mock data
const recentSearches = [
    { id: '1', text: "Joe's Pizza Place", type: 'restaurant' },
    { id: '2', text: 'Japanese Cuisine', type: 'category' },
    { id: '3', text: 'Burger', type: 'category' },
]

const cuisines = [
    { id: '1', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
    { id: '2', name: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200' },
    { id: '3', name: 'Asian', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200' },
    { id: '4', name: 'Mexican', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200' },
    { id: '5', name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200' },
    { id: '6', name: 'Dessert', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200' },
    { id: '7', name: 'Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200' },
    { id: '8', name: 'Sushi', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200' },
]

const trendingNearby = [
    {
        id: '1',
        name: 'Burger Bistro',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
        cuisine: 'American • Fast Food • $$',
        rating: 4.5,
        reviewCount: '1.2k reviews',
        deliveryTime: '35-40 min',
        offer: 'Free Delivery',
    },
    {
        id: '2',
        name: 'Crispy Chicken House',
        image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300',
        cuisine: 'Chicken • Fast Food • $',
        rating: 4.8,
        reviewCount: '850 reviews',
        deliveryTime: '20-30 min',
        deliveryFee: '$1.99 Delivery',
    },
    {
        id: '3',
        name: 'Pizza Paradise',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300',
        cuisine: 'Italian • Pizza • $$',
        rating: 4.3,
        reviewCount: '2.1k reviews',
        deliveryTime: '45-55 min',
        offer: '20% Off',
    },
    {
        id: '4',
        name: 'Sakura Japanese',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300',
        cuisine: 'Japanese • Sushi • $$$',
        rating: 4.7,
        reviewCount: '3.5k reviews',
        deliveryTime: '30-40 min',
        offer: 'Free Delivery',
    },
]

interface Restaurant {
    id: string
    name: string
    image: string
    cuisine: string
    rating: number
    reviewCount: string
    deliveryTime?: string
    offer?: string
    deliveryFee?: string
}

const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const history = useHistory()

    const handleRestaurantPress = (restaurant: Restaurant) => {
        history.push(`/restaurant/${restaurant.id}`, { restaurant })
    }

    const filteredRestaurants = trendingNearby.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <IonPage>
            <IonContent className="search-content" fullscreen>
                {/* ==================== MOBILE VIEW ==================== */}
                <div className="mobile-view">
                    {/* Header */}
                    <div className="search-header">
                        <span className="delivering-label">LOCATION</span>
                        <button className="location-row">
                            <IonIcon icon={location} className="location-icon" />
                            <span className="location-text">Home • 5th Avenue, NYC</span>
                            <IonIcon icon={chevronDown} className="chevron-icon" />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="search-bar-container">
                        <IonSearchbar
                            value={searchQuery}
                            onIonInput={(e) => setSearchQuery(e.detail.value || '')}
                            onIonFocus={() => setIsSearchFocused(true)}
                            placeholder="Restaurants, cuisines, dishes..."
                            className="custom-searchbar"
                            showCancelButton="focus"
                            onIonCancel={() => {
                                setIsSearchFocused(false)
                                setSearchQuery('')
                            }}
                        />
                    </div>

                    {/* Search Mode: Recent Searches or Results */}
                    {(isSearchFocused || searchQuery) ? (
                        <div className="search-results-container">
                            {!searchQuery && (
                                <>
                                    <div className="section-header">
                                        <h2 className="section-title">Recent Searches</h2>
                                        <button className="clear-button">Clear All</button>
                                    </div>
                                    <div className="recent-searches-list">
                                        {recentSearches.map((item) => (
                                            <button key={item.id} className="recent-search-item" onClick={() => setSearchQuery(item.text)}>
                                                <div className="recent-search-icon">
                                                    <IonIcon icon={item.type === 'restaurant' ? timeOutline : searchOutline} />
                                                </div>
                                                <div className="recent-search-content">
                                                    <span className="recent-search-text">{item.text}</span>
                                                    <span className="recent-search-subtext">
                                                        {item.type === 'restaurant' ? `Restaurant` : 'Category'}
                                                    </span>
                                                </div>
                                                <IonIcon icon={arrowUp} className="arrow-icon" style={{ transform: 'rotate(45deg)' }} />
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}

                            {searchQuery && (
                                <div className="trending-list" style={{ marginTop: '20px' }}>
                                    {filteredRestaurants.length > 0 ? filteredRestaurants.map((restaurant) => (
                                        <div
                                            key={restaurant.id}
                                            className="trending-card"
                                            onClick={() => handleRestaurantPress(restaurant)}
                                        >
                                            <img src={restaurant.image} alt={restaurant.name} className="trending-image" />
                                            <div className="trending-content">
                                                <h3 className="trending-name">{restaurant.name}</h3>
                                                <p className="trending-cuisine">{restaurant.cuisine}</p>
                                                <div className="rating-badge">
                                                    <span>⭐</span>
                                                    <span>{restaurant.rating}</span>
                                                </div>
                                                <span className="meta-text">{restaurant.reviewCount}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--app-text-muted)' }}>
                                            <p>No results found for "{searchQuery}"</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Browse by Cuisine */}
                            <div className="section-header">
                                <h2 className="section-title">Browse by Cuisine</h2>
                            </div>
                            <div className="cuisine-grid">
                                {cuisines.map((cuisine) => (
                                    <button key={cuisine.id} className="cuisine-item" onClick={() => {
                                        setSearchQuery(cuisine.name)
                                        setIsSearchFocused(true)
                                    }}>
                                        <div className="cuisine-image-container">
                                            <img src={cuisine.image} alt={cuisine.name} className="cuisine-image" />
                                        </div>
                                        <span className="cuisine-name">{cuisine.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Trending Nearby */}
                            <div className="section-header">
                                <h2 className="section-title">Trending Nearby</h2>
                                <button className="see-all-button">See All</button>
                            </div>
                            <div className="trending-list">
                                {trendingNearby.map((restaurant) => (
                                    <div
                                        key={restaurant.id}
                                        className="trending-card"
                                        onClick={() => handleRestaurantPress(restaurant)}
                                    >
                                        <img src={restaurant.image} alt={restaurant.name} className="trending-image" />
                                        <div className="trending-content">
                                            <h3 className="trending-name">{restaurant.name}</h3>
                                            <p className="trending-cuisine">{restaurant.cuisine}</p>
                                            <div className="rating-badge">
                                                <span>⭐</span>
                                                <span>{restaurant.rating}</span>
                                            </div>
                                            <span className="meta-text">{restaurant.reviewCount}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="layout-bottom-spacer" />
                </div>

                {/* ==================== DESKTOP VIEW ==================== */}
                <div className="desktop-view">
                    {/* Desktop Sticky Navbar */}
                    <nav className="desktop-navbar">
                        <div className="navbar-content">
                            <div className="navbar-left">
                                <div className="location-container">
                                    <span className="location-label">CURRENT LOCATION</span>
                                    <button className="location-row">
                                        <IonIcon icon={location} className="location-icon" />
                                        <span className="location-text">Home • 5th Avenue, NYC</span>
                                        <IonIcon icon={chevronDown} className="chevron-icon" />
                                    </button>
                                </div>
                                <div className="nav-tabs">
                                    <button className="nav-tab" onClick={() => history.push('/app/home')}>Home</button>
                                    <button className="nav-tab active">Explore</button>
                                    <button className="nav-tab" onClick={() => history.push('/app/favorites')}>Favorites</button>
                                </div>
                            </div>

                            <div className="navbar-search">
                                <IonIcon icon={searchOutline} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search restaurants, cuisines, dishes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="navbar-right">
                                <div className="user-profile" onClick={() => history.push('/app/profile')}>
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="User" className="user-avatar" />
                                    <div className="user-info">
                                        <span className="user-name">Alex Johnson</span>
                                        <span className="user-level">Foodie Level 3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Desktop 2-Column Layout */}
                    <div className="desktop-grid-explore">
                        {/* Left Sidebar: Filters */}
                        <aside className="left-sidebar">
                            <div className="sidebar-card sticky-sidebar">
                                <h3 className="sidebar-title">
                                    <IonIcon icon={filterOutline} />
                                    Filters
                                    <button className="reset-btn">Reset</button>
                                </h3>
                                <div className="filter-group">
                                    <h4>Cuisine</h4>
                                    <label className="filter-option"><input type="checkbox" /><span>Italian</span></label>
                                    <label className="filter-option"><input type="checkbox" /><span>Japanese</span></label>
                                    <label className="filter-option"><input type="checkbox" /><span>American</span></label>
                                    <label className="filter-option"><input type="checkbox" /><span>Mexican</span></label>
                                    <button className="see-more-link">See more</button>
                                </div>
                                <div className="filter-divider" />
                                <div className="filter-group">
                                    <h4>Price Range</h4>
                                    <label className="filter-option"><input type="radio" name="price" /><span>$ (Under $15)</span></label>
                                    <label className="filter-option"><input type="radio" name="price" /><span>$$ ($15-$30)</span></label>
                                    <label className="filter-option"><input type="radio" name="price" /><span>$$$ ($30+)</span></label>
                                </div>
                                <div className="filter-divider" />
                                <div className="filter-group">
                                    <h4>Dietary</h4>
                                    <label className="filter-option"><input type="checkbox" /><span>Vegetarian</span></label>
                                    <label className="filter-option"><input type="checkbox" /><span>Vegan</span></label>
                                    <label className="filter-option"><input type="checkbox" /><span>Gluten-Free</span></label>
                                </div>
                                <button className="apply-filters-btn">Apply Filters</button>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="main-content-explore">
                            {/* Browse by Cuisine */}
                            <section className="explore-section">
                                <div className="section-header-desktop">
                                    <h2>BROWSE BY CUISINE</h2>
                                    <div className="nav-arrows">
                                        <button><IonIcon icon={chevronBack} /></button>
                                        <button><IonIcon icon={chevronForward} /></button>
                                    </div>
                                </div>
                                <div className="cuisine-grid-desktop">
                                    {cuisines.map((cuisine) => (
                                        <button key={cuisine.id} className="cuisine-card-desktop" onClick={() => setSearchQuery(cuisine.name)}>
                                            <div className="cuisine-image-round">
                                                <img src={cuisine.image} alt={cuisine.name} />
                                            </div>
                                            <span className="cuisine-label">{cuisine.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Trending Nearby */}
                            <section className="explore-section">
                                <div className="section-header-desktop">
                                    <h2>TRENDING NEARBY</h2>
                                    <button className="see-all-link">See All</button>
                                </div>
                                <div className="trending-list-desktop">
                                    {(searchQuery ? filteredRestaurants : trendingNearby).map((restaurant) => (
                                        <div key={restaurant.id} className="trending-card-desktop" onClick={() => handleRestaurantPress(restaurant)}>
                                            <div className="trending-image-wrap">
                                                <img src={restaurant.image} alt={restaurant.name} />
                                            </div>
                                            <div className="trending-body">
                                                <div className="trending-header">
                                                    <div>
                                                        <h3>{restaurant.name}</h3>
                                                        <p className="trending-meta">{restaurant.cuisine}</p>
                                                    </div>
                                                    <button className="fav-btn">
                                                        <IonIcon icon={heartOutline} />
                                                    </button>
                                                </div>
                                                <div className="trending-rating-row">
                                                    <div className="rating-chip">
                                                        <span className="star">★</span>
                                                        <span>{restaurant.rating}</span>
                                                    </div>
                                                    <span className="reviews-count">{restaurant.reviewCount}</span>
                                                </div>
                                                <div className="trending-footer">
                                                    <span className="delivery-time">
                                                        <IonIcon icon={scheduleIcon} /> {restaurant.deliveryTime}
                                                    </span>
                                                    {restaurant.offer && (
                                                        <span className="offer-tag">{restaurant.offer}</span>
                                                    )}
                                                    {restaurant.deliveryFee && (
                                                        <span className="delivery-fee">{restaurant.deliveryFee}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default SearchPage

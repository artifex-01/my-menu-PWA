import React, { useState } from 'react'
import { IonPage, IonContent, IonIcon } from '@ionic/react'
import {
    heart,
    chevronBack,
    star,
    location,
    chevronDown,
    searchOutline,
    // notifications,
    bookmarkOutline,
    heartOutline,
    addOutline,
    restaurantOutline,
    storefrontOutline,
    timeOutline
} from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './FavoritesPage.css'

interface FavoriteItem {
    id: string
    name: string
    restaurant: string
    price: string
    image: string
    soldOut?: boolean
}

interface FavoriteRestaurant {
    id: string
    name: string
    cuisine: string
    rating: number
    image: string
    deliveryTime?: string
    priceRange?: string
}

const FavoritesPage: React.FC = () => {
    const history = useHistory()
    const [activeTab, setActiveTab] = useState<'dishes' | 'restaurants'>('dishes')
    const [searchQuery, setSearchQuery] = useState('')

    const [favoriteDishes, setFavoriteDishes] = useState<FavoriteItem[]>([
        { id: '1', name: 'Spicy Miso Ramen', restaurant: 'Ramen House', price: '$14.00', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400' },
        { id: '2', name: 'Truffle Burger', restaurant: 'Burger Joint', price: '$16.50', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
        { id: '3', name: 'Salmon Roll', restaurant: 'Tokyo Sushi Bar', price: '$12.00', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400' },
        { id: '4', name: 'Carbonara', restaurant: 'Italian Bistro', price: '$18.00', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400', soldOut: true },
        { id: '5', name: 'Spicy Beef Tacos', restaurant: 'Taco Fiesta', price: '$15.50', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400' },
    ])

    const [favoriteRestaurants, setFavoriteRestaurants] = useState<FavoriteRestaurant[]>([
        { id: '1', name: 'Burger Hub', cuisine: 'American • Fast Food', rating: 4.8, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400', deliveryTime: '15-25 min', priceRange: '$$' },
        { id: '2', name: 'The Pasta Place', cuisine: 'Italian • Casual', rating: 4.6, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', deliveryTime: '30-45 min', priceRange: '$$$' },
    ])

    const handleRemoveDish = (id: string) => {
        setFavoriteDishes(prev => prev.filter(item => item.id !== id))
    }

    const handleRemoveRestaurant = (id: string) => {
        setFavoriteRestaurants(prev => prev.filter(item => item.id !== id))
    }

    return (
        <IonPage>
            <IonContent className="favorites-content" fullscreen>
                {/* ==================== MOBILE VIEW ==================== */}
                <div className="mobile-view">
                    {/* Header */}
                    <div className="favorites-header">
                        <button className="fav-back-btn" onClick={() => history.goBack()}>
                            <IonIcon icon={chevronBack} />
                        </button>
                        <h1 className="favorites-title">Your Favorites</h1>
                        <div className="header-spacer" />
                    </div>

                    {/* Underline Tabs */}
                    <div className="fav-tabs">
                        <button
                            className={`fav-tab ${activeTab === 'dishes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dishes')}
                        >
                            Dishes
                        </button>
                        <button
                            className={`fav-tab ${activeTab === 'restaurants' ? 'active' : ''}`}
                            onClick={() => setActiveTab('restaurants')}
                        >
                            Restaurants
                        </button>
                    </div>

                    {/* Favorites List */}
                    <div className="favorites-list">
                        {activeTab === 'dishes' ? (
                            <>
                                {favoriteDishes.map(item => (
                                    <div key={item.id} className={`fav-card ${item.soldOut ? 'unavailable' : ''}`}>
                                        <div className="fav-card-image-wrap">
                                            <img src={item.image} alt={item.name} className="fav-card-image" />
                                            <button
                                                className="fav-heart-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleRemoveDish(item.id)
                                                }}
                                            >
                                                <IonIcon icon={heart} />
                                            </button>
                                            {item.soldOut && <div className="sold-out-tag">SOLD OUT</div>}
                                        </div>
                                        <div className="fav-card-info">
                                            <h3 className="fav-card-name">{item.name}</h3>
                                            <p className="fav-card-sub">{item.restaurant}</p>
                                            <span className="fav-card-price">{item.price}</span>
                                        </div>
                                        <div className="fav-card-action">
                                            {item.soldOut ? (
                                                <span className="unavailable-label">UNAVAILABLE</span>
                                            ) : (
                                                <button
                                                    className="order-btn fav-order-btn"
                                                    onClick={() => history.push('/cart', {
                                                        cart: [{
                                                            id: item.id,
                                                            name: item.name,
                                                            price: parseFloat(item.price.replace('$', '')),
                                                            quantity: 1,
                                                            image: item.image,
                                                            description: item.restaurant
                                                        }],
                                                        restaurant: { name: item.restaurant }
                                                    })}
                                                >
                                                    Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {favoriteDishes.length === 0 && (
                                    <div className="empty-fav-state">
                                        <IonIcon icon={heart} />
                                        <h3>No favorite dishes</h3>
                                        <p>Items you love will appear here.</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {favoriteRestaurants.map(restaurant => (
                                    <div
                                        key={restaurant.id}
                                        className="fav-card"
                                        onClick={() => history.push(`/restaurant/${restaurant.id}`)}
                                    >
                                        <div className="fav-card-image-wrap">
                                            <img src={restaurant.image} alt={restaurant.name} className="fav-card-image" />
                                            <button
                                                className="fav-heart-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleRemoveRestaurant(restaurant.id)
                                                }}
                                            >
                                                <IonIcon icon={heart} />
                                            </button>
                                        </div>
                                        <div className="fav-card-info">
                                            <h3 className="fav-card-name">{restaurant.name}</h3>
                                            <p className="fav-card-sub">{restaurant.cuisine}</p>
                                            <div className="fav-card-rating">
                                                <IonIcon icon={star} />
                                                <span>{restaurant.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {favoriteRestaurants.length === 0 && (
                                    <div className="empty-fav-state">
                                        <IonIcon icon={heart} />
                                        <h3>No favorite restaurants</h3>
                                        <p>Save your go-to spots here.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

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
                                    <button className="nav-tab" onClick={() => history.push('/app/explore')}>Explore</button>
                                    <button className="nav-tab active">Favorites</button>
                                </div>
                            </div>

                            <div className="navbar-search">
                                <IonIcon icon={searchOutline} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search saved items..."
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
                    <div className="desktop-favorites-container">
                        {/* Left Sidebar */}
                        <aside className="favorites-sidebar">
                            {/* My Collections Card */}
                            <div className="collections-card">
                                <h3 className="collections-title">
                                    <IonIcon icon={bookmarkOutline} />
                                    My Collections
                                </h3>
                                <ul className="collections-list">
                                    <li>
                                        <button className="collection-item active">
                                            <div className="collection-left">
                                                <IonIcon icon={heartOutline} />
                                                <span>All Favorites</span>
                                            </div>
                                            <span className="collection-count primary">{favoriteDishes.length + favoriteRestaurants.length}</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="collection-item">
                                            <div className="collection-left">
                                                <IonIcon icon={star} />
                                                <span>Must Try</span>
                                            </div>
                                            <span className="collection-count">5</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="collection-item">
                                            <div className="collection-left">
                                                <IonIcon icon={restaurantOutline} />
                                                <span>Dinner Spots</span>
                                            </div>
                                            <span className="collection-count">8</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="create-list-btn">
                                            <IonIcon icon={addOutline} />
                                            <span>Create New List</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Discover Promo Card */}
                            <div className="discover-card">
                                <div className="discover-content">
                                    <h3>Discover New Favorites</h3>
                                    <p>Based on your taste profile, we have 5 new recommendations.</p>
                                    <button className="discover-btn">Check them out</button>
                                </div>
                                <div className="discover-decoration">💡</div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="favorites-main-content">
                            {/* Header */}
                            <div className="favorites-header-desktop">
                                <div className="header-text">
                                    <h1>Your Favorites</h1>
                                    <p>Manage your saved dishes and restaurants</p>
                                </div>
                                <div className="desktop-tabs">
                                    <button
                                        className={`desktop-tab ${activeTab === 'dishes' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('dishes')}
                                    >
                                        Dishes
                                    </button>
                                    <button
                                        className={`desktop-tab ${activeTab === 'restaurants' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('restaurants')}
                                    >
                                        Restaurants
                                    </button>
                                </div>
                            </div>

                            {/* Saved Dishes Section */}
                            <section className="favorites-section">
                                <div className="section-header-flex">
                                    <h2>
                                        <IonIcon icon={restaurantOutline} />
                                        Saved Dishes
                                    </h2>
                                    <div className="sort-dropdown">
                                        <span>Sort by:</span>
                                        <select>
                                            <option>Recently Added</option>
                                            <option>Price: Low to High</option>
                                            <option>Rating</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="dishes-grid">
                                    {favoriteDishes.map(item => (
                                        <div key={item.id} className={`dish-card-desktop ${item.soldOut ? 'sold-out' : ''}`}>
                                            <div className="dish-image-wrap">
                                                <img src={item.image} alt={item.name} />
                                                <button className="fav-btn-overlay" onClick={() => handleRemoveDish(item.id)}>
                                                    <IonIcon icon={heart} />
                                                </button>
                                                {item.soldOut && (
                                                    <div className="sold-out-overlay">
                                                        <span>Sold Out</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="dish-details">
                                                <div className="dish-info">
                                                    <h3>{item.name}</h3>
                                                    <p className="dish-restaurant">{item.restaurant}</p>
                                                    <span className="dish-price">{item.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Divider */}
                            <div className="section-divider" />

                            {/* Saved Restaurants Section */}
                            <section className="favorites-section">
                                <div className="section-header-flex">
                                    <h2>
                                        <IonIcon icon={storefrontOutline} />
                                        Saved Restaurants
                                    </h2>
                                    <button className="view-all-link">View All ({favoriteRestaurants.length})</button>
                                </div>
                                <div className="restaurants-grid-desktop">
                                    {favoriteRestaurants.map(restaurant => (
                                        <div key={restaurant.id} className="restaurant-card-desktop" onClick={() => history.push(`/restaurant/${restaurant.id}`)}>
                                            <div className="restaurant-image-wrap">
                                                <img src={restaurant.image} alt={restaurant.name} />
                                                <button className="fav-btn-overlay" onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleRemoveRestaurant(restaurant.id)
                                                }}>
                                                    <IonIcon icon={heart} />
                                                </button>
                                            </div>
                                            <div className="restaurant-details">
                                                <div className="restaurant-header">
                                                    <div>
                                                        <h3>{restaurant.name}</h3>
                                                        <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                                                    </div>
                                                    <div className="rating-chip">
                                                        <span className="star-icon">★</span>
                                                        <span>{restaurant.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="restaurant-meta">
                                                    <span><IonIcon icon={timeOutline} /> {restaurant.deliveryTime}</span>
                                                    <span>{restaurant.priceRange}</span>
                                                </div>
                                                <button className="view-menu-btn">View Menu</button>
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

export default FavoritesPage

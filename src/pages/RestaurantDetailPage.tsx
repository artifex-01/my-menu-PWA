import React, { useState } from 'react'
import {
    IonPage,
    IonContent,
    IonIcon
} from '@ionic/react'
import { arrowBack, search, ellipsisHorizontal, location, star, add, remove, checkmarkCircle, cameraOutline, closeCircle } from 'ionicons/icons'
import { useHistory, useLocation } from 'react-router-dom'
import './RestaurantDetailPage.css'

interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    image: string
    isVeg: boolean
    category: string
}

interface CartItem extends MenuItem {
    quantity: number
}

interface Review {
    id: string
    name: string
    initials: string
    date: string
    rating: number
    text: string
    hasPhotos?: boolean
    photos?: string[]
}

const menuCategories = ['Popular', 'Burgers', 'Sides', 'Drinks', 'Desserts']
const reviewFilters = ['All Reviews', 'Latest', 'With Photos', 'Highest']

const menuItems: MenuItem[] = [
    {
        id: '1',
        name: 'Signature Beef Burger',
        description: 'Juicy beef patty, cheddar cheese, lettuce, tomato, and house secret sauce.',
        price: 399,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
        isVeg: false,
        category: 'Burgers',
    },
    {
        id: '2',
        name: 'Crispy French Fries',
        description: 'Golden crispy fries seasoned with sea salt and rosemary.',
        price: 149,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300',
        isVeg: true,
        category: 'Sides',
    },
    {
        id: '3',
        name: 'Fresh Berry Smoothie',
        description: 'Mixed berries, banana, yogurt, and honey.',
        price: 199,
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300',
        isVeg: true,
        category: 'Drinks',
    },
    {
        id: '4',
        name: 'Classic Cheeseburger',
        description: 'American cheese, pickles, onions, ketchup, and mustard.',
        price: 349,
        image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300',
        isVeg: false,
        category: 'Burgers',
    },
    {
        id: '5',
        name: 'Onion Rings',
        description: 'Crispy battered onion rings with spicy mayo dip.',
        price: 179,
        image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300',
        isVeg: true,
        category: 'Sides',
    },
    {
        id: '6',
        name: 'Chocolate Brownie',
        description: 'Warm fudgy brownie with vanilla ice cream.',
        price: 249,
        image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=300',
        isVeg: true,
        category: 'Desserts',
    },
    {
        id: '7',
        name: 'Iced Coffee',
        description: 'Cold brew coffee with milk and caramel syrup.',
        price: 169,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300',
        isVeg: true,
        category: 'Drinks',
    },
]

const reviews: Review[] = [
    {
        id: '1',
        name: 'Sarah Jenkins',
        initials: 'SJ',
        date: '2 days ago',
        rating: 5.0,
        text: 'Absolutely loved the Signature Beef Burger! The sauce is incredible. Definitely coming back for more. The service was also very quick and friendly.',
    },
    {
        id: '2',
        name: 'Mike Thompson',
        initials: 'MT',
        date: '1 week ago',
        rating: 4.0,
        text: 'Great food, but the wait time was a bit longer than expected during lunch hour. The fries were perfectly crispy though!',
    },
    {
        id: '3',
        name: 'Emily Roberts',
        initials: 'ER',
        date: '2 weeks ago',
        rating: 5.0,
        text: 'Best burger place in the city! The berry smoothie is a must-try.',
        hasPhotos: true,
        photos: ['https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300']
    },
    {
        id: '4',
        name: 'David Kim',
        initials: 'DK',
        date: '3 weeks ago',
        rating: 3.0,
        text: 'It was okay, but I found the burger a bit too salty for my taste. Good atmosphere though.',
    },
]

// Helper function to get avatar background colors
const avatarColors = [
    '#FFE4C4', // Bisque
    '#E6E6FA', // Lavender
    '#FFE4E1', // Misty Rose
    '#F0FFF0', // Honeydew
    '#F5DEB3', // Wheat
    '#E0FFFF', // Light Cyan
]

const getAvatarColor = (name: string) => {
    const index = name.charCodeAt(0) % avatarColors.length
    return avatarColors[index]
}

const RestaurantDetailPage: React.FC = () => {
    const history = useHistory()
    const routeLocation = useLocation<{ restaurant?: { name: string; image: string; cuisine: string; rating: number; storeType?: 'restaurant' | 'cafe' | 'store' } }>()
    const restaurant = routeLocation.state?.restaurant || {
        name: 'The Burger Joint',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        cuisine: 'American, Fast Food',
        rating: 4.8,
        storeType: 'restaurant'
    }

    const [activeTab, setActiveTab] = useState('menu')
    const [activeCategory, setActiveCategory] = useState('Popular')
    const [activeReviewFilter, setActiveReviewFilter] = useState('All Reviews')
    const [cart, setCart] = useState<CartItem[]>([])

    // Review Modal State
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [userRating, setUserRating] = useState(0)
    const [userReviewText, setUserReviewText] = useState('')
    const [attachedPhotos, setAttachedPhotos] = useState<string[]>([])
    const [showSuccessToast, setShowSuccessToast] = useState(false)

    // Filter items based on category
    const filteredItems = activeCategory === 'Popular'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory)

    const getItemQuantity = (itemId: string) => {
        const cartItem = cart.find(item => item.id === itemId)
        return cartItem?.quantity || 0
    }

    const addToCart = (item: MenuItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            }
            return [...prevCart, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (itemId: string) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === itemId)
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(cartItem =>
                    cartItem.id === itemId
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
            }
            return prevCart.filter(cartItem => cartItem.id !== itemId)
        })
    }

    const handleWriteReview = () => {
        setShowReviewModal(true)
    }

    const handleSubmitReview = () => {
        if (userRating === 0) {
            // In a real app, show toast. Here just return
            return
        }

        const newReview: Review = {
            id: Date.now().toString(),
            name: 'You',
            initials: 'YO',
            date: 'Just now',
            rating: userRating,
            text: userReviewText || 'No comment provided.',
            hasPhotos: attachedPhotos.length > 0,
            photos: attachedPhotos
        }

        // Prepend new review
        reviews.unshift(newReview)

        setShowReviewModal(false)
        setShowSuccessToast(true)
        setTimeout(() => setShowSuccessToast(false), 3000)

        // Reset form
        setUserRating(0)
        setUserReviewText('')
        setAttachedPhotos([])
    }

    const handleAddPhoto = () => {
        // In a real app, this would trigger file picker or camera
        // For demo, we add a mock image
        const mockImages = [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300'
        ]
        const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)]
        setAttachedPhotos([...attachedPhotos, randomImage])
    }

    const handleRemovePhoto = (index: number) => {
        setAttachedPhotos(attachedPhotos.filter((_, i) => i !== index))
    }

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    const handleViewCart = () => {
        history.push('/cart', { cart, restaurant })
    }

    return (
        <IonPage>
            <IonContent className="store-detail-content" fullscreen scrollY={true}>
                {/* Hero Image */}
                <div className="hero-section">
                    <img src={restaurant.image} alt={restaurant.name} className="hero-image" />
                    <div className="hero-gradient" />

                    {/* Header Buttons */}
                    <div className="header-buttons">
                        <button className="header-btn" onClick={() => history.goBack()}>
                            <IonIcon icon={arrowBack} />
                        </button>
                        <div className="header-right">
                            <button className="header-btn">
                                <IonIcon icon={search} />
                            </button>
                            <button className="header-btn">
                                <IonIcon icon={ellipsisHorizontal} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    <div className="drag-handle" />

                    {/* Store Info */}
                    <div className="store-info">
                        <div className="store-header">
                            <div className="store-details">
                                <h1 className="store-name">{restaurant.name}</h1>
                                <div className="store-location">
                                    <IonIcon icon={location} />
                                    <p>123 Culinary Ave, New York</p>
                                </div>
                            </div>
                            <div className="store-logo">
                                <img src="https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=100" alt="Logo" />
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="stats-row">
                            <div className="stat-item">
                                <span className="stat-label">Cuisine</span>
                                <span className="stat-value">{restaurant.cuisine}</span>
                            </div>
                            <div className="stat-divider" />
                            <div className="stat-item">
                                <span className="stat-label">Rating</span>
                                <div className="stat-rating">
                                    <IonIcon icon={star} className="star-icon" />
                                    <span className="rating-value">{restaurant.rating}</span>
                                    <span className="rating-count">(1.2k)</span>
                                </div>
                            </div>
                            <div className="stat-divider" />
                            <div className="stat-item">
                                <span className="stat-label">Time</span>
                                <span className="stat-value">20-30 min</span>
                            </div>
                        </div>
                    </div>


                    {/* Desktop Layout Wrapper */}
                    <div className="desktop-layout-wrapper">
                        {/* Main Content Area */}
                        <div className="main-content-area">
                            {/* Tabs */}
                            <div className="tabs-container">
                                <button
                                    className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('menu')}
                                >
                                    MENU
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('reviews')}
                                >
                                    REVIEWS
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('about')}
                                >
                                    ABOUT
                                </button>
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'menu' && (
                                <>
                                    {/* Category Pills */}
                                    <div className="category-pills">
                                        {menuCategories.map(category => (
                                            <button
                                                key={category}
                                                className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                                                onClick={() => setActiveCategory(category)}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Menu Items */}
                                    <div className="menu-items-container">
                                        <h2 className="section-title">
                                            {activeCategory === 'Popular' ? 'Popular Items' : activeCategory}
                                        </h2>

                                        <div className="menu-items-grid">
                                            {filteredItems.length > 0 ? (
                                                filteredItems.map(item => {
                                                    const quantity = getItemQuantity(item.id)
                                                    return (
                                                        <div key={item.id} className="menu-item-card">
                                                            <div className="item-image-container">
                                                                <img src={item.image} alt={item.name} />
                                                            </div>
                                                            <div className="item-content">
                                                                <div className="item-header">
                                                                    <h3 className="item-name">{item.name}</h3>
                                                                </div>
                                                                <p className="item-description">{item.description}</p>
                                                                <div className="item-footer">
                                                                    <span className="item-price">₹{item.price}</span>

                                                                    {quantity > 0 ? (
                                                                        <div className="quantity-controls">
                                                                            <button className="qty-btn" onClick={() => removeFromCart(item.id)}>
                                                                                <IonIcon icon={remove} />
                                                                            </button>
                                                                            <span className="qty-value">{quantity}</span>
                                                                            <button className="qty-btn" onClick={() => addToCart(item)}>
                                                                                <IonIcon icon={add} />
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <button className="add-btn" onClick={() => addToCart(item)}>
                                                                            <IonIcon icon={add} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <div className="empty-category">
                                                    <p>No items in this category</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="reviews-container">
                                    {/* Rating Summary */}
                                    <div className="rating-summary">
                                        <div className="rating-left">
                                            <div className="rating-big">
                                                <span className="rating-number">4.8</span>
                                                <span className="rating-max">/ 5.0</span>
                                            </div>
                                            <div className="rating-stars">
                                                <IonIcon icon={star} className="star-filled" />
                                                <IonIcon icon={star} className="star-filled" />
                                                <IonIcon icon={star} className="star-filled" />
                                                <IonIcon icon={star} className="star-filled" />
                                                <IonIcon icon={star} className="star-filled" />
                                            </div>
                                            <p className="rating-based">Based on 1,248 reviews</p>
                                        </div>
                                        <button className="write-review-btn" onClick={handleWriteReview}>
                                            <IonIcon icon={star} />
                                            <span>Write a Review</span>
                                        </button>
                                    </div>

                                    {/* Review Filters */}
                                    <div className="review-filters">
                                        {reviewFilters.map(filter => (
                                            <button
                                                key={filter}
                                                className={`review-filter-pill ${activeReviewFilter === filter ? 'active' : ''}`}
                                                onClick={() => setActiveReviewFilter(filter)}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Review Cards */}
                                    <div className="reviews-list">
                                        {reviews.map(review => (
                                            <div key={review.id} className="review-card">
                                                <div className="review-header">
                                                    <div
                                                        className="reviewer-avatar"
                                                        style={{ backgroundColor: getAvatarColor(review.name) }}
                                                    >
                                                        {review.initials}
                                                    </div>
                                                    <div className="reviewer-info">
                                                        <h4 className="reviewer-name">{review.name}</h4>
                                                        <span className="review-date">{review.date}</span>
                                                    </div>
                                                    <div className="review-rating">
                                                        <span className="review-rating-number">{review.rating.toFixed(1)}</span>
                                                        <IonIcon icon={star} className="review-star" />
                                                    </div>
                                                </div>
                                                <p className="review-text">{review.text}</p>

                                                {/* Review Photos */}
                                                {review.photos && review.photos.length > 0 && (
                                                    <div className="review-photos-grid">
                                                        {review.photos.map((photo, idx) => (
                                                            <img key={idx} src={photo} alt="Review" className="review-photo-item" />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'about' && (
                                <div className="about-container">
                                    {/* About Us */}
                                    <div className="about-section">
                                        <h2 className="about-title">About Us</h2>
                                        <p className="about-text">
                                            Welcome to The Burger Joint, where we serve the juiciest, most flavorful burgers in town.
                                            Our secret lies in using locally sourced, fresh ingredients and grilling every patty to perfection.
                                            Whether you're craving a classic cheeseburger or something more adventurous, we have something to satisfy your taste buds.
                                        </p>
                                    </div>

                                    {/* Location */}
                                    <div className="about-section">
                                        <h2 className="about-title">Location</h2>
                                        <div className="map-placeholder">
                                            <IonIcon icon={location} className="map-pin" />
                                            <button className="map-link">
                                                Open Maps
                                                <span>↗</span>
                                            </button>
                                        </div>
                                        <div className="address-row">
                                            <IonIcon icon={location} />
                                            <div className="address-text">
                                                <p className="address-main">123 Culinary Ave, New York, NY 10001</p>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Opening Hours */}
                                    <div className="about-section">
                                        <h2 className="about-title">Opening Hours</h2>
                                        <div className="hours-card">
                                            <div className="hours-row">
                                                <span className="hours-day">Monday - Friday</span>
                                                <span className="hours-time">11:00 AM - 10:00 PM</span>
                                            </div>
                                            <div className="hours-divider" />
                                            <div className="hours-row">
                                                <span className="hours-day">Saturday</span>
                                                <span className="hours-time">10:00 AM - 11:00 PM</span>
                                            </div>
                                            <div className="hours-divider" />
                                            <div className="hours-row">
                                                <span className="hours-day">Sunday</span>
                                                <span className="hours-time">10:00 AM - 10:00 PM</span>
                                            </div>
                                            <div className="open-status">
                                                <span>🕐</span>
                                                Open Now
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="about-section">
                                        <h2 className="about-title">Contact Info</h2>
                                        <div className="contact-grid">
                                            <a href="tel:+12125550123" className="contact-card">
                                                <div className="contact-icon">📞</div>
                                                <span className="contact-label">Phone</span>
                                                <span className="contact-value">+1 (212) 555-0123</span>
                                            </a>
                                            <a href="#" className="contact-card">
                                                <div className="contact-icon">🌐</div>
                                                <span className="contact-label">Website</span>
                                                <span className="contact-value">burgerjoint.com</span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="about-section">
                                        <h2 className="about-title">Features</h2>
                                        <div className="features-wrap">
                                            <span className="feature-tag">📶 Free Wi-Fi</span>
                                            <span className="feature-tag">🪑 Outdoor Seating</span>
                                            <span className="feature-tag">🅿️ Parking Available</span>
                                            <span className="feature-tag">💳 Card Payment</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Desktop Sidebar - Location & Info */}
                        <aside className="desktop-sidebar">
                            <div className="sidebar-card">
                                <h3 className="sidebar-title">Location & Info</h3>
                                <div className="sidebar-map-placeholder">
                                    <IonIcon icon={location} className="sidebar-map-pin" />
                                </div>
                                <p className="sidebar-address">123 Culinary Ave, New York, NY 10001</p>
                                <div className="sidebar-info-row">
                                    <span className="sidebar-info-icon">🕐</span>
                                    <span className="sidebar-info-text">Open today • 11:00 AM - 10:00 PM</span>
                                </div>
                                <div className="sidebar-info-row">
                                    <span className="sidebar-info-icon">📞</span>
                                    <span className="sidebar-info-text">(212) 555-0123</span>
                                </div>
                                <button className="sidebar-directions-btn">
                                    Get Directions
                                </button>
                            </div>
                        </aside>
                    </div>

                    {/* Bottom spacing */}
                    <div className="bottom-spacing" />

                    {/* Review Modal */}
                    {showReviewModal && (
                        <div className="modal-overlay">
                            <div className="rating-modal">
                                <button className="rating-close" onClick={() => setShowReviewModal(false)}>×</button>
                                <h2 className="rating-header">Write a Review</h2>

                                <h3 className="rating-question">How was your experience?</h3>
                                <div className="rating-stars">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span
                                            key={star}
                                            className={`star ${userRating >= star ? 'filled' : ''}`}
                                            onClick={() => setUserRating(star)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <p className="rating-label">
                                    {userRating === 1 ? 'Poor' : userRating === 2 ? 'Fair' : userRating === 3 ? 'Good' : userRating === 4 ? 'Great' : userRating === 5 ? 'Excellent' : 'Tap to rate'}
                                </p>

                                <p className="feedback-question">Share your thoughts</p>
                                <textarea
                                    className="feedback-note"
                                    placeholder="Tell us about the food, service, or atmosphere..."
                                    value={userReviewText}
                                    onChange={e => setUserReviewText(e.target.value)}
                                />

                                <div className="photo-upload-section">
                                    <div className="attached-photos">
                                        {attachedPhotos.map((photo, index) => (
                                            <div key={index} className="photo-preview">
                                                <img src={photo} alt="Attached" />
                                                <button className="remove-photo-btn" onClick={() => handleRemovePhoto(index)}>
                                                    <IonIcon icon={closeCircle} />
                                                </button>
                                            </div>
                                        ))}
                                        <button className="add-photo-btn" onClick={handleAddPhoto}>
                                            <IonIcon icon={cameraOutline} />
                                            <span>Add Photo</span>
                                        </button>
                                    </div>
                                </div>

                                <button className="submit-feedback-btn" onClick={handleSubmitReview}>
                                    Post Review
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Success Toast */}
                    {showSuccessToast && (
                        <div className="toast-notification">
                            <IonIcon icon={checkmarkCircle} />
                            <span>Review posted successfully!</span>
                        </div>
                    )}
                </div>

                {/* Cart Footer */}
                {cartItemCount > 0 && (
                    <div className="order-footer">
                        <button className="order-btn" onClick={handleViewCart}>
                            <div className="order-left">
                                <span className="order-count">{cartItemCount}</span>
                                <span className="order-text">View Order</span>
                            </div>
                            <span className="order-total">₹{cartTotal}</span>
                        </button>
                    </div>
                )}
            </IonContent>
        </IonPage>
    )
}

export default RestaurantDetailPage

import React, { useState, useEffect } from 'react'
import {
    IonPage,
    IonContent,
    IonIcon
} from '@ionic/react'
import { arrowBack, notificationsOutline, checkmarkCircle, timerOutline, restaurantOutline, cafe } from 'ionicons/icons'
import { useHistory, useLocation } from 'react-router-dom'
import './OrderStatusPage.css'

interface OrderItem {
    name: string
    quantity: number
    price: number
    customization?: string
}

type VenueType = 'restaurant' | 'cafe' | 'store'

interface LocationState {
    orderNumber?: string
    tableNumber?: string
    venueType?: VenueType
    venueName?: string
    items?: OrderItem[]
    total?: number
}

const OrderStatusPage: React.FC = () => {
    const history = useHistory()
    const location = useLocation<LocationState>()

    // Get order data from navigation state or use defaults
    const orderNumber = location.state?.orderNumber || '#A452'
    const tableNumber = location.state?.tableNumber || '12'
    const venueType: VenueType = location.state?.venueType || 'restaurant'
    const venueName = location.state?.venueName || 'The Gourmet Kitchen'
    const items = location.state?.items || [
        { name: 'Spicy Miso Ramen', quantity: 2, price: 798, customization: 'Extra Chashu, No Corn' },
        { name: 'Pan-Fried Gyoza', quantity: 1, price: 249 },
    ]
    const total = location.state?.total || 1047

    const [showCompletedPopup, setShowCompletedPopup] = useState(false)
    const [orderStatus, setOrderStatus] = useState<'preparing' | 'completed'>('preparing')

    const currentTime = new Date()
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    const orderTime = `${displayHours}:${minutes} ${ampm}`

    const expectedHours = (hours + 1) % 24
    const expectedAmpm = expectedHours >= 12 ? 'PM' : 'AM'
    const expectedDisplayHours = expectedHours % 12 || 12
    const expectedTime = `${expectedDisplayHours}:${minutes} ${expectedAmpm}`

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

    // Check if venue is a cafe (no table number display)
    const isCafe = venueType === 'cafe'

    // Simulate order completion after 10 seconds (for demo)
    useEffect(() => {
        const timer = setTimeout(() => {
            setOrderStatus('completed')
            setShowCompletedPopup(true)
            // Trigger haptic feedback if available
            if ('vibrate' in navigator) {
                navigator.vibrate([100, 50, 100, 50, 200])
            }
        }, 10000) // 10 second demo timer
        return () => clearTimeout(timer)
    }, [])

    const handleDismissPopup = () => {
        setShowCompletedPopup(false)
    }

    // Get venue-specific messaging
    const getStatusMessage = () => {
        if (orderStatus === 'completed') {
            return isCafe
                ? 'Your order is ready!'
                : 'Order is on the way!'
        }
        return isCafe
            ? "Your coffee is being prepared!"
            : "We're cooking it up!"
    }

    const getSubtitleMessage = () => {
        if (orderStatus === 'completed') {
            return isCafe
                ? 'Please pick up your order from the counter.'
                : 'Your delicious meal is being brought to your table.'
        }
        return isCafe
            ? 'Our baristas are crafting your perfect drink with care.'
            : 'Your order has been received and our chefs are preparing your meal with care.'
    }

    const getHeroImage = () => {
        return isCafe
            ? 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600'
            : 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'
    }

    const getPreparingText = () => {
        return isCafe ? 'Brewing your order...' : 'Making the magic happen...'
    }

    return (
        <IonPage>
            <IonContent className="order-status-content" scrollY={true}>
                {/* Header */}
                <header className="status-header">
                    <button className="header-back-btn" onClick={() => history.push('/app/home')}>
                        <IonIcon icon={arrowBack} />
                    </button>

                    {/* Order Info - Different based on venue type */}
                    <div className="header-center">
                        {isCafe ? (
                            // Cafe: Show only order number
                            <div className="cafe-order-info">
                                <span className="cafe-order-label">Order</span>
                                <h1 className="cafe-order-number">{orderNumber}</h1>
                            </div>
                        ) : (
                            // Restaurant: Show table number prominently, order number smaller
                            <div className="restaurant-order-info">
                                <h1 className="table-number">Table {tableNumber}</h1>
                                <span className="order-number-small">Order {orderNumber}</span>
                            </div>
                        )}
                    </div>

                    <button className="notification-btn">
                        <IonIcon icon={notificationsOutline} />
                    </button>
                </header>

                {/* Venue Badge */}
                <div className="venue-badge-container">
                    <span className={`venue-badge ${venueType}`}>
                        <IonIcon icon={isCafe ? cafe : restaurantOutline} />
                        <span>{venueName}</span>
                    </span>
                </div>

                {/* Hero Image */}
                <div className="cooking-hero">
                    <img
                        src={getHeroImage()}
                        alt={isCafe ? "Coffee preparation" : "Cooking in progress"}
                    />
                    <div className="time-badge">
                        <IonIcon icon={timerOutline} className="time-icon" />
                        <span>{orderStatus === 'completed' ? 'Ready!' : isCafe ? '~5 min' : '~15 min'}</span>
                    </div>
                </div>

                {/* Status Message */}
                <div className="status-message">
                    <h2 className="cooking-title">{getStatusMessage()}</h2>
                    <p className="cooking-subtitle">{getSubtitleMessage()}</p>
                </div>

                {/* Live Status */}
                <div className="live-status-section">
                    <span className="live-status-label">LIVE STATUS</span>

                    <div className="status-timeline">
                        {/* Order Received */}
                        <div className="timeline-item completed">
                            <div className="timeline-dot">
                                <IonIcon icon={checkmarkCircle} />
                            </div>
                            <div className="timeline-line"></div>
                            <div className="timeline-content">
                                <span className="timeline-title">Order Received</span>
                                <span className="timeline-time">{orderTime}</span>
                            </div>
                        </div>

                        {/* Preparing */}
                        <div className={`timeline-item ${orderStatus === 'completed' ? 'completed' : 'active'}`}>
                            <div className="timeline-dot">
                                {orderStatus === 'completed' ? (
                                    <IonIcon icon={checkmarkCircle} />
                                ) : (
                                    <>
                                        <div className="pulse-ring"></div>
                                        <div className="dot-inner"></div>
                                    </>
                                )}
                            </div>
                            <div className="timeline-line"></div>
                            <div className="timeline-content">
                                <span className="timeline-title">{isCafe ? 'Preparing' : 'Preparing'}</span>
                                <span className="timeline-subtitle">
                                    {orderStatus === 'completed' ? 'Completed' : getPreparingText()}
                                </span>
                            </div>
                        </div>

                        {/* Ready */}
                        <div className={`timeline-item ${orderStatus === 'completed' ? 'completed' : 'pending'}`}>
                            <div className="timeline-dot">
                                {orderStatus === 'completed' ? (
                                    <IonIcon icon={checkmarkCircle} />
                                ) : (
                                    <IonIcon icon={isCafe ? cafe : restaurantOutline} />
                                )}
                            </div>
                            <div className="timeline-content">
                                <span className="timeline-title">Ready for Pickup</span>
                                <span className="timeline-time">
                                    {orderStatus === 'completed' ? 'Now' : `Expected ${expectedTime}`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="order-summary-card">
                    <div className="summary-header">
                        <span className="summary-title">Order Summary</span>
                        <span className="summary-count">{totalItems} Items</span>
                    </div>

                    <div className="order-items-list">
                        {items.map((item, index) => (
                            <div key={index} className="order-item-row">
                                <div className="item-qty">{item.quantity}×</div>
                                <div className="item-details">
                                    <span className="item-name">{item.name}</span>
                                </div>
                                <span className="item-price">₹{item.price}</span>
                            </div>
                        ))}
                    </div>

                    <div className="summary-total-row">
                        <span className="total-label">Total</span>
                        <span className="total-value">₹{total}</span>
                    </div>
                </div>

                {/* Missing Something */}
                <button className="missing-btn">
                    <span className="missing-icon">?</span>
                    <span className="missing-text">Missing something?</span>
                </button>

                {/* Bottom Actions */}
                <div className="bottom-actions">
                    <button className="menu-action-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={isCafe ? cafe : restaurantOutline} />
                        <span>Menu</span>
                    </button>
                    <button className="pay-action-btn" onClick={() => history.push('/payment', { total })}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                            <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                        <span>Pay Bill</span>
                    </button>
                </div>
            </IonContent>

            {/* Order Completed Popup */}
            {showCompletedPopup && (
                <div className="completed-popup-overlay">
                    <div className={`completed-popup ${isCafe ? 'cafe-theme' : ''}`}>
                        <div className="completed-icon-circle">
                            <span>{isCafe ? '☕' : '🎉'}</span>
                        </div>
                        <h2 className="completed-title">Order Ready!</h2>

                        {/* Different display based on venue type */}
                        {isCafe ? (
                            <p className="completed-order-num">{orderNumber}</p>
                        ) : (
                            <>
                                <p className="completed-table-num">Table {tableNumber}</p>
                                <p className="completed-order-num-small">{orderNumber}</p>
                            </>
                        )}

                        <p className="completed-message">
                            {isCafe
                                ? 'Please pick up your order from the counter.'
                                : 'Your delicious meal is coming to your table!'}
                        </p>
                        <button className="completed-btn" onClick={handleDismissPopup}>
                            Got it!
                        </button>
                    </div>
                </div>
            )}
        </IonPage>
    )
}

export default OrderStatusPage

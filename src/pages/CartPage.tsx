import React, { useState } from 'react'
import {
    IonPage,
    IonContent,
    IonIcon
} from '@ionic/react'
import { add, remove, trash, arrowBack, ticketOutline } from 'ionicons/icons'
import { useHistory, useLocation } from 'react-router-dom'
import './CartPage.css'

interface CartItem {
    id: string
    name: string
    description?: string
    price: number
    quantity: number
    image: string
}

interface LocationState {
    cart?: CartItem[]
    restaurant?: { name: string; storeType?: 'restaurant' | 'cafe' | 'store' }
}

// Suggested add-ons
const suggestedItems: CartItem[] = [
    { id: 's1', name: 'Coca-Cola', price: 99, quantity: 1, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200' },
    { id: 's2', name: 'Choco Cake', price: 249, quantity: 1, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200' },
    { id: 's3', name: 'Water', price: 49, quantity: 1, image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=200' },
]

const CartPage: React.FC = () => {
    const history = useHistory()
    const location = useLocation<LocationState>()
    const initialCart = location.state?.cart || []

    const [cart, setCart] = useState<CartItem[]>(initialCart)
    const [promoCode, setPromoCode] = useState('')

    const updateQuantity = (itemId: string, change: number) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === itemId) {
                    const newQty = item.quantity + change
                    return newQty > 0 ? { ...item, quantity: newQty } : item
                }
                return item
            }).filter(item => item.quantity > 0)
        })
    }

    const removeItem = (itemId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId))
    }

    const addSuggestion = (item: CartItem) => {
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

    const subtotal = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
    const tax = Math.round(subtotal * 0.05)
    const serviceFee = 29
    const total = subtotal + tax + serviceFee

    const handleCheckout = () => {
        const orderItems = cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price * item.quantity,
            customization: item.description
        }))

        const storeType = location.state?.restaurant?.storeType || 'restaurant'
        const isCafe = storeType === 'cafe'

        history.push('/order-status', {
            orderNumber: `#${Math.floor(100 + Math.random() * 900)}`,
            tableNumber: isCafe ? undefined : '5',
            venueType: storeType,
            venueName: location.state?.restaurant?.name || 'The Burger Joint',
            items: orderItems,
            total: total
        })
    }

    if (cart.length === 0) {
        return (
            <IonPage>
                <IonContent className="cart-content">
                    <header className="cart-header">
                        <button className="back-btn" onClick={() => history.goBack()}>
                            <IonIcon icon={arrowBack} />
                        </button>
                        <h1 className="header-title">My Order</h1>
                        <div className="header-spacer" />
                    </header>
                    <div className="empty-cart">
                        <div className="empty-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Add items from a restaurant to get started</p>
                    </div>
                </IonContent>
            </IonPage>
        )
    }

    return (
        <IonPage>
            <IonContent className="cart-content" scrollY={true}>
                {/* Header */}
                <header className="cart-header">
                    <button className="back-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={arrowBack} />
                    </button>
                    <h1 className="header-title">My Order</h1>
                    <div className="header-spacer" />
                </header>

                {/* Cart Items */}
                <div className="cart-items">
                    {cart.map((item: CartItem) => (
                        <div key={item.id} className="cart-item-card">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h3 className="cart-item-name">{item.name}</h3>
                                {item.description && (
                                    <p className="cart-item-desc">{item.description}</p>
                                )}
                                <span className="cart-item-price">₹{(item.price * item.quantity).toFixed(0)}</span>
                            </div>

                            {/* Delete Button (Top Right) */}
                            <button className="delete-btn" onClick={() => removeItem(item.id)}>
                                <IonIcon icon={trash} />
                            </button>

                            {/* Qty Control (Bottom Right) */}
                            <div className="qty-control">
                                <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>
                                    <IonIcon icon={remove} />
                                </button>
                                <span className="qty-value">{item.quantity}</span>
                                <button className="qty-btn plus" onClick={() => updateQuantity(item.id, 1)}>
                                    <IonIcon icon={add} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Add More Items */}
                    <button className="add-more-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={add} />
                        <span>Add More Items</span>
                    </button>
                </div>

                {/* Complete Your Meal */}
                <div className="suggestions-section">
                    <div className="suggestions-header">
                        <h3 className="suggestions-title">Complete your meal</h3>
                        <button className="see-all-btn">See all</button>
                    </div>
                    <div className="suggestions-scroll">
                        {suggestedItems.map(item => (
                            <div key={item.id} className="suggestion-card">
                                <div className="suggestion-image-wrap">
                                    <img src={item.image} alt={item.name} />
                                    <button className="suggestion-add" onClick={() => addSuggestion(item)}>
                                        <IonIcon icon={add} />
                                    </button>
                                </div>
                                <span className="suggestion-name">{item.name}</span>
                                <span className="suggestion-price">₹{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="payment-summary">
                    <h3 className="summary-title">Payment Summary</h3>
                    <div className="summary-row">
                        <span className="summary-label">Subtotal</span>
                        <span className="summary-value">₹{subtotal.toFixed(0)}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Tax (5%)</span>
                        <span className="summary-value">₹{tax.toFixed(0)}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Service Fee</span>
                        <span className="summary-value">₹{serviceFee}</span>
                    </div>

                    {/* Promo Code */}
                    <div className="promo-row">
                        <div className="promo-input-wrap">
                            <IonIcon icon={ticketOutline} className="promo-icon" />
                            <input
                                type="text"
                                placeholder="Promo Code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="promo-input"
                            />
                        </div>
                        <button className="apply-btn">Apply</button>
                    </div>

                    {/* Total */}
                    <div className="total-row">
                        <span className="total-label">Total</span>
                        <span className="total-value">₹{total.toFixed(0)}</span>
                    </div>
                </div>

                {/* Bottom Spacing */}
                <div className="checkout-spacer" />
            </IonContent>

            {/* Fixed Place Order Button */}
            <div className="checkout-container">
                <button className="checkout-btn" onClick={handleCheckout}>
                    <span>Place Order</span>
                    <span className="checkout-total">₹{total.toFixed(0)}</span>
                </button>
            </div>
        </IonPage>
    )
}

export default CartPage

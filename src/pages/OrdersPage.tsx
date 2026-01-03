import React, { useState } from 'react'
import { IonPage, IonContent, IonIcon } from '@ionic/react'
import {
    arrowBack,
    checkmarkCircle,
    refreshOutline,
    star,
    closeCircle,
    bicycle,
    bagHandle,
    restaurant
} from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './OrdersPage.css'

interface Order {
    id: string
    restaurantName: string
    image: string
    items: string
    price: string
    date: string
    time: string
    type: 'Delivery' | 'Pickup' | 'Dine-in'
    status: 'Completed' | 'Canceled' | 'Receipt'
    orderNumber?: string
}

const recentOrders: Order[] = [
    {
        id: '1',
        restaurantName: 'Burger King',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
        items: 'Whopper Meal, Large...',
        price: '$15.50',
        date: 'Oct 24',
        time: '12:30 PM',
        type: 'Delivery',
        status: 'Completed'
    },
    {
        id: '2',
        restaurantName: 'Sushi Zen',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
        items: 'Spicy Tuna Roll, Miso...',
        price: '$42.00',
        date: 'Oct 20',
        time: '7:15 PM',
        type: 'Dine-in',
        status: 'Receipt',
        orderNumber: '#8821'
    }
]

const septOrders: Order[] = [
    {
        id: '3',
        restaurantName: 'Starbucks',
        image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400',
        items: 'Caramel Macchiato, Butt...',
        price: '$12.25',
        date: 'Sep 15',
        time: '8:45 AM',
        type: 'Pickup',
        status: 'Completed' // Mocking as completed for visual, though image implies no specific badge maybe
    },
    {
        id: '4',
        restaurantName: 'Pizza Hut',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
        items: 'Large Pepperoni Feast,...',
        price: '$28.90',
        date: 'Sep 02',
        time: '8:15 PM',
        type: 'Delivery',
        status: 'Canceled'
    }
]

const OrdersPage: React.FC = () => {
    const history = useHistory()
    const [activeTab, setActiveTab] = useState('All')

    const filters = [
        { label: 'All', icon: undefined },
        { label: 'Delivery', icon: bicycle },
        { label: 'Pickup', icon: bagHandle },
        { label: 'Dine-in', icon: restaurant }
    ]

    const renderCard = (order: Order) => (
        <div key={order.id} className="new-order-card">
            <div className="card-top">
                <div className="card-restaurant-info">
                    <img src={order.image} alt={order.restaurantName} className="card-restaurant-img" />
                    <div className="card-name-group">
                        <h3 className="card-restaurant-name">{order.restaurantName}</h3>
                        <p className="card-order-summary">{order.items}</p>
                    </div>
                </div>
                <span className="card-price">{order.price}</span>
            </div>

            <div className="card-details">
                {order.date}, {order.time} • {order.type} {order.type === 'Dine-in' && '(Scan)'}
            </div>

            <div className="card-divider" />

            <div className="card-actions">
                {/* Left Status */}
                {order.status === 'Completed' && (
                    <div className="card-status-badge completed">
                        <IonIcon icon={checkmarkCircle} />
                        <span>Completed</span>
                    </div>
                )}
                {order.status === 'Canceled' && (
                    <div className="card-status-badge canceled">
                        <IonIcon icon={closeCircle} />
                        <span>Canceled</span>
                    </div>
                )}
                {order.status === 'Receipt' && order.orderNumber && (
                    <div className="card-status-pill">
                        Receipt {order.orderNumber}
                    </div>
                )}

                {/* Right Action */}
                {order.status === 'Completed' && (
                    <button className="card-btn-reorder">
                        <IonIcon icon={refreshOutline} />
                        Reorder
                    </button>
                )}
                {order.status === 'Receipt' && (
                    <button className="card-btn-rate">
                        <IonIcon icon={star} />
                        Rate Order
                    </button>
                )}
                {order.status === 'Canceled' && (
                    <button className="card-btn-details">
                        Details
                    </button>
                )}
            </div>
        </div>
    )

    return (
        <IonPage>
            <IonContent className="orders-content" fullscreen>
                {/* Header */}
                <div className="orders-page-header">
                    <button className="orders-back-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={arrowBack} />
                    </button>
                    <h1 className="orders-page-title">Order History</h1>
                    <div className="header-spacer" />
                </div>

                {/* Filter Tabs */}
                <div className="orders-filters">
                    {filters.map(filter => (
                        <button
                            key={filter.label}
                            className={`filter-chip ${activeTab === filter.label ? 'active' : ''}`}
                            onClick={() => setActiveTab(filter.label)}
                        >
                            {filter.label === 'All' && <IonIcon icon={checkmarkCircle} style={{ fontSize: '16px' }} />}
                            {filter.icon && <IonIcon icon={filter.icon} className="filter-icon" />}
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="orders-list-container">
                    {/* Recent Section */}
                    <div className="orders-section-title">RECENT ORDERS</div>
                    {recentOrders.map(renderCard)}

                    {/* September Section */}
                    <div className="orders-section-title">SEPTEMBER 2023</div>
                    {septOrders.map(renderCard)}

                    <div className="no-more-orders">No more orders</div>
                    <div className="layout-bottom-spacer" />
                </div>

            </IonContent>
        </IonPage>
    )
}

export default OrdersPage

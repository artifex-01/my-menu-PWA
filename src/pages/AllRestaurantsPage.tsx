import React, { useState } from 'react'
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonIcon,
    IonSearchbar
} from '@ionic/react'
import { star, cafe, restaurant, storefront } from 'ionicons/icons'
import { useHistory, useLocation } from 'react-router-dom'
import './AllRestaurantsPage.css'

type StoreType = 'all' | 'restaurant' | 'cafe' | 'store'

// Extended stores list including restaurants, cafes, and stores
const allStores = [
    // Restaurants
    {
        id: '1',
        name: 'The Gourmet Kitchen',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
        cuisine: 'Italian • Pizza • Pasta',
        rating: 4.8,
        reviewCount: '1.2k',
        isVeg: false,
        storeType: 'restaurant' as StoreType,
    },
    {
        id: '2',
        name: 'Urban Spice',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
        cuisine: 'Indian • Curry • Biryani',
        rating: 4.5,
        reviewCount: '890',
        isVeg: false,
        storeType: 'restaurant' as StoreType,
    },
    {
        id: '3',
        name: 'Sakura Japanese',
        image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400',
        cuisine: 'Japanese • Sushi • Ramen',
        rating: 4.7,
        reviewCount: '1.5k',
        isVeg: false,
        storeType: 'restaurant' as StoreType,
    },
    {
        id: '4',
        name: 'Green Bowl',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        cuisine: 'Salads • Healthy • Vegan',
        rating: 4.2,
        reviewCount: '650',
        offer: '50% OFF',
        isVeg: true,
        storeType: 'restaurant' as StoreType,
    },
    {
        id: '5',
        name: 'Burger Bistro',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        cuisine: 'American • Fast Food',
        rating: 4.5,
        reviewCount: '980',
        isVeg: false,
        storeType: 'restaurant' as StoreType,
    },
    {
        id: '6',
        name: 'Pizza Paradise',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
        cuisine: 'Italian • Pizza • Beverages',
        rating: 4.0,
        reviewCount: '720',
        isVeg: false,
        storeType: 'restaurant' as StoreType,
    },
    // Cafes
    {
        id: '11',
        name: 'Brew & Bean',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
        cuisine: 'Coffee • Espresso • Pastries',
        rating: 4.7,
        reviewCount: '2.1k',
        isVeg: true,
        storeType: 'cafe' as StoreType,
    },
    {
        id: '12',
        name: 'The Coffee House',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        cuisine: 'Coffee • Tea • Sandwiches',
        rating: 4.5,
        reviewCount: '1.8k',
        isVeg: true,
        storeType: 'cafe' as StoreType,
    },
    {
        id: '13',
        name: 'Mocha Lounge',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
        cuisine: 'Coffee • Smoothies • Desserts',
        rating: 4.3,
        reviewCount: '890',
        offer: '20% OFF',
        isVeg: true,
        storeType: 'cafe' as StoreType,
    },
    {
        id: '14',
        name: 'Tea Garden',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
        cuisine: 'Tea • Bubble Tea • Snacks',
        rating: 4.6,
        reviewCount: '1.2k',
        isVeg: true,
        storeType: 'cafe' as StoreType,
    },
    {
        id: '15',
        name: 'Artisan Roasters',
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400',
        cuisine: 'Specialty Coffee • Brunch',
        rating: 4.9,
        reviewCount: '3.2k',
        isVeg: false,
        storeType: 'cafe' as StoreType,
    },
    // Stores
    {
        id: '21',
        name: 'Fresh Mart',
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
        cuisine: 'Groceries • Fresh Produce • Dairy',
        rating: 4.4,
        reviewCount: '560',
        isVeg: true,
        storeType: 'store' as StoreType,
    },
    {
        id: '22',
        name: 'Organic Valley',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
        cuisine: 'Organic • Healthy • Natural',
        rating: 4.6,
        reviewCount: '890',
        isVeg: true,
        storeType: 'store' as StoreType,
    },
    {
        id: '23',
        name: 'Quick Stop',
        image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400',
        cuisine: 'Convenience • Snacks • Drinks',
        rating: 4.1,
        reviewCount: '320',
        isVeg: false,
        storeType: 'store' as StoreType,
    },
    {
        id: '24',
        name: 'The Bakery Shop',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
        cuisine: 'Bakery • Bread • Cakes',
        rating: 4.8,
        reviewCount: '1.5k',
        offer: '10% OFF',
        isVeg: true,
        storeType: 'store' as StoreType,
    },
    // More Restaurants
    {
        id: '7',
        name: 'Taco Fiesta',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
        cuisine: 'Mexican • Tacos • Burritos',
        rating: 4.3,
        reviewCount: '540',
        isVeg: false,
        storeType: 'restaurant' as StoreType,
    },
    {
        id: '8',
        name: 'Veggie Delight',
        image: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=400',
        cuisine: 'Vegetarian • Healthy • Organic',
        rating: 4.6,
        reviewCount: '430',
        isVeg: true,
        storeType: 'restaurant' as StoreType,
    },
    {
        id: '9',
        name: 'Dragon Wok',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
        cuisine: 'Chinese • Noodles • Rice',
        rating: 4.1,
        reviewCount: '890',
        isVeg: false,
        storeType: 'restaurant' as StoreType,
    },
    {
        id: '10',
        name: 'Sweet Treats',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400',
        cuisine: 'Desserts • Ice Cream • Cakes',
        rating: 4.9,
        reviewCount: '1.8k',
        isVeg: true,
        storeType: 'restaurant' as StoreType,
    },
]

interface Store {
    id: string
    name: string
    image: string
    cuisine: string
    rating: number
    reviewCount?: string
    offer?: string
    isVeg?: boolean
    storeType: StoreType
}

const storeTypeLabels: Record<StoreType, { label: string; icon: string }> = {
    all: { label: 'All', icon: storefront },
    restaurant: { label: 'Restaurants', icon: restaurant },
    cafe: { label: 'Cafes', icon: cafe },
    store: { label: 'Stores', icon: storefront },
}

const AllRestaurantsPage: React.FC = () => {
    const history = useHistory()
    const location = useLocation<{ title?: string }>()

    const [searchQuery, setSearchQuery] = useState('')
    const [storeTypeFilter, setStoreTypeFilter] = useState<StoreType>('all')

    const pageTitle = location.state?.title || 'Explore'

    const handleStorePress = (store: Store) => {
        history.push(`/restaurant/${store.id}`, { restaurant: store })
    }

    // Filter stores
    const filteredStores = allStores
        .filter(s => {
            const matchesSearch = searchQuery === '' ||
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesType = storeTypeFilter === 'all' || s.storeType === storeTypeFilter
            return matchesSearch && matchesType
        })
        .sort((a, b) => b.rating - a.rating) // Default sort by rating

    const getStoreTypeIcon = (type: StoreType) => {
        switch (type) {
            case 'cafe': return cafe
            case 'store': return storefront
            default: return restaurant
        }
    }

    const getResultsLabel = () => {
        const count = filteredStores.length
        if (storeTypeFilter === 'all') {
            return `${count} places found`
        }
        return `${count} ${storeTypeLabels[storeTypeFilter].label.toLowerCase()} found`
    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/app/home" text="" />
                    </IonButtons>
                    <IonTitle>{pageTitle}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="all-restaurants-content" fullscreen>
                {/* Search Bar */}
                <div className="search-section">
                    <IonSearchbar
                        value={searchQuery}
                        onIonInput={(e) => setSearchQuery(e.detail.value || '')}
                        placeholder="Search restaurants, cafes, stores..."
                        className="restaurant-searchbar"
                    />
                </div>

                {/* Store Type Tabs */}
                <div className="store-type-tabs">
                    {(['all', 'restaurant', 'cafe'] as StoreType[]).map((type) => (
                        <button
                            key={type}
                            className={`store-type-tab ${storeTypeFilter === type ? 'active' : ''}`}
                            onClick={() => setStoreTypeFilter(type)}
                        >
                            <IonIcon icon={storeTypeLabels[type].icon} />
                            <span>{storeTypeLabels[type].label}</span>
                        </button>
                    ))}
                </div>



                {/* Results Count */}
                <div className="results-count">
                    <span>{getResultsLabel()}</span>
                </div>

                {/* Store List */}
                <div className="restaurant-list">
                    {filteredStores.map((store) => (
                        <article
                            key={store.id}
                            className="restaurant-card"
                            onClick={() => handleStorePress(store)}
                        >
                            <div className="card-image">
                                <img src={store.image} alt={store.name} />
                                {store.offer && (
                                    <span className="offer-badge">{store.offer}</span>
                                )}
                                <span className={`store-type-badge ${store.storeType}`}>
                                    <IonIcon icon={getStoreTypeIcon(store.storeType)} />
                                </span>
                            </div>
                            <div className="card-content">
                                <div className="card-header">
                                    <h3 className="card-title">{store.name}</h3>
                                    {store.isVeg && <div className="veg-indicator" />}
                                </div>
                                <p className="card-cuisine">{store.cuisine}</p>
                                <div className="card-meta">
                                    <div className="rating">
                                        <IonIcon icon={star} />
                                        <span>{store.rating}</span>
                                        <span className="review-count">({store.reviewCount})</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Empty State */}
                {filteredStores.length === 0 && (
                    <div className="empty-state">
                        <span className="empty-icon">
                            {storeTypeFilter === 'cafe' ? '☕' : storeTypeFilter === 'store' ? '🏪' : '🍽️'}
                        </span>
                        <h3>No {storeTypeLabels[storeTypeFilter].label.toLowerCase()} found</h3>
                        <p>Try adjusting your filters or search term</p>
                    </div>
                )}
            </IonContent>
        </IonPage>
    )
}

export default AllRestaurantsPage

import React, { useState, useRef, useEffect } from 'react'
import {
    IonPage,
    IonContent,
    IonIcon,
    IonAlert,
    IonModal
} from '@ionic/react'
import {
    pencil,
    card,
    notifications,
    globe,
    logOutOutline,
    chevronForward,
    star,
    thumbsUp,
    chatbubble,
    trophy,
    timeOutline,
    helpCircleOutline,
    shieldCheckmarkOutline,
    close,
    restaurant,
    heart,
    flame,
    ribbon,
    diamond,
    sparkles,
    moon,
    sunny,
    cameraOutline,
    personOutline,
    phonePortraitOutline,
    callOutline,
    chevronBack,
    locationOutline,
    checkmark,
    location,
    chevronDown,
    searchOutline
} from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './ProfilePage.css'

// Mock data for reviews
const recentReviews = [
    {
        id: '1',
        title: 'Delicious Pasta & Wine!',
        rating: 4.5,
        excerpt: '"Had an amazing experience at Bella Italia! The carbonara was absolutely authentic! Loved the texture of the pasta and the rich, creamy sauce. Will definitely order again for dinner.',
        date: '2 days ago',
        restaurant: 'The Pasta Place',
        restaurantImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100',
        likes: 12,
        comments: 3
    },
    {
        id: '2',
        title: 'Best Sushi in Town',
        rating: 5.0,
        excerpt: '"Sushi Heaven never disappoints. Fresh fish and great service..."',
        date: '1 week ago',
        restaurant: 'Sushi Heaven',
        restaurantImage: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=100',
        likes: 24,
        comments: 5
    }
]

// Badge data with progression
const allBadges = [
    { id: '1', name: 'First Bite', description: 'Complete your first order', icon: restaurant, earned: true, earnedDate: 'Jan 15, 2024', tier: 'bronze' },
    { id: '2', name: 'Review Rookie', description: 'Write 5 reviews', icon: star, earned: true, earnedDate: 'Feb 3, 2024', tier: 'bronze', progress: { current: 5, total: 5 } },
    { id: '3', name: 'Review Master', description: 'Write 25 reviews', icon: star, earned: false, tier: 'gold', progress: { current: 24, total: 25 } },
    { id: '4', name: 'Popular Palate', description: 'Get 100 likes on reviews', icon: heart, earned: true, earnedDate: 'Apr 5, 2024', tier: 'silver', progress: { current: 100, total: 100 } },
    { id: '5', name: 'Streak Starter', description: 'Order 7 days in a row', icon: flame, earned: true, earnedDate: 'May 20, 2024', tier: 'bronze' },
    { id: '6', name: 'Fire Streak', description: 'Order 30 days in a row', icon: flame, earned: false, tier: 'gold', progress: { current: 12, total: 30 } },
    { id: '7', name: 'Explorer', description: 'Try 10 different cuisines', icon: sparkles, earned: true, earnedDate: 'Jun 8, 2024', tier: 'silver', progress: { current: 10, total: 10 } },
    { id: '8', name: 'Globe Trotter', description: 'Try 25 different cuisines', icon: sparkles, earned: false, tier: 'platinum', progress: { current: 18, total: 25 } },
    { id: '9', name: 'Loyal Customer', description: 'Order from same place 10 times', icon: ribbon, earned: true, earnedDate: 'Jul 15, 2024', tier: 'silver' },
    { id: '10', name: 'VIP Diner', description: 'Earn 1000 points', icon: diamond, earned: false, tier: 'platinum', progress: { current: 856, total: 1000 } }
]

const ProfilePage: React.FC = () => {
    const history = useHistory()

    const [showLogoutAlert, setShowLogoutAlert] = useState(false)
    const [showBadgesModal, setShowBadgesModal] = useState(false)
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const [profileData, setProfileData] = useState({
        name: 'Alex Johnson',
        phone: '+1 (555) 123-4567',
        location: 'NYC',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'
    })
    const [editFormData, setEditFormData] = useState({ ...profileData })

    const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('dark')
    const [showThemeModal, setShowThemeModal] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [isSystemDark, setIsSystemDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = (e: MediaQueryListEvent) => setIsSystemDark(e.matches)
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    const isDark = themeMode === 'dark' || (themeMode === 'system' && isSystemDark)

    useEffect(() => {
        document.body.classList.toggle('dark', isDark)
    }, [isDark])

    const handleThemeSelect = (mode: 'light' | 'dark' | 'system') => {
        setThemeMode(mode)
        setShowThemeModal(false)
    }

    const handleLogout = () => setShowLogoutAlert(true)
    const confirmLogout = () => history.push('/login')

    const openEditProfile = () => {
        setEditFormData({ ...profileData })
        setShowEditProfileModal(true)
    }

    const saveProfile = () => {
        setProfileData({ ...editFormData })
        setShowEditProfileModal(false)
    }

    const hasChanges = () => {
        return editFormData.name !== profileData.name ||
            editFormData.phone !== profileData.phone ||
            editFormData.location !== profileData.location ||
            editFormData.avatar !== profileData.avatar
    }

    const earnedBadges = allBadges.filter(b => b.earned)
    const inProgressBadges = allBadges.filter(b => !b.earned)

    return (
        <IonPage>
            <IonContent className="profile-content" fullscreen>
                {/* ==================== MOBILE VIEW ==================== */}
                <div className="mobile-view">
                    {/* Header */}
                    <div className="profile-page-header">
                        <h1 className="page-title">Profile</h1>
                    </div>

                    {/* Profile Card with Orange Gradient */}
                    <div className="profile-card gradient tap-scale" onClick={openEditProfile}>
                        <div className="avatar-ring">
                            <div className="avatar-container">
                                <img src={profileData.avatar} alt="Profile" className="avatar-image" />
                                <div className="edit-badge glow">
                                    <IonIcon icon={pencil} />
                                </div>
                            </div>
                        </div>
                        <h2 className="profile-name">{profileData.name}</h2>
                        <p className="profile-bio">Food Critic • Level 3 • {profileData.location}</p>
                        <span className="profile-badge">Top 12% users</span>

                        <div className="profile-stats">
                            <div className="stat-item">
                                <span className="stat-value">24</span>
                                <span className="stat-label">Reviews</span>
                            </div>
                            <div className="stat-divider" />
                            <div className="stat-item">
                                <span className="stat-value">856</span>
                                <span className="stat-label">Points</span>
                            </div>
                        </div>
                    </div>

                    {/* Achievements Section */}
                    <div className="achievements-card tap-scale">
                        <h3 className="achievements-title">MY ACHIEVEMENTS</h3>
                        <div className="achievements-content">
                            <div className="achievement-stat">
                                <span className="achievement-value">856</span>
                                <span className="achievement-label">Total Points</span>
                            </div>
                            <div className="achievement-badges">
                                <IonIcon icon={star} className="badge-icon gold" />
                                <IonIcon icon={trophy} className="badge-icon gold" />
                                <IonIcon icon={star} className="badge-icon gray" />
                            </div>
                            <div className="achievement-stat">
                                <span className="achievement-label">Badges Earned</span>
                            </div>
                        </div>

                        <div className="progress-section">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '70%' }} />
                            </div>
                            <span className="progress-text">144 points to next level</span>
                        </div>
                        <p className="achievement-helper">Earn points by ordering, reviewing & rating</p>

                        <button className="view-badges-btn" onClick={() => setShowBadgesModal(true)}>
                            View All Badges
                        </button>
                    </div>

                    {/* Recent Reviews Section */}
                    <div className="section-header-row">
                        <h3 className="section-header">MY RECENT REVIEWS</h3>
                        <button className="see-all-btn" onClick={() => history.push('/my-reviews')}>See All</button>
                    </div>
                    <div className="reviews-scroll">
                        {recentReviews.map((review) => (
                            <div key={review.id} className="review-card tap-scale">
                                <div className="review-restaurant-row">
                                    <img src={review.restaurantImage} alt={review.restaurant} className="review-restaurant-img" />
                                    <div className="review-restaurant-info">
                                        <span className="review-restaurant-name">{review.restaurant}</span>
                                        <div className="review-rating large">
                                            <IonIcon icon={star} />
                                            <span>{review.rating}</span>
                                        </div>
                                    </div>
                                    <IonIcon icon={chevronForward} className="review-arrow" />
                                </div>
                                <h4 className="review-title">{review.title}</h4>
                                <p className="review-excerpt">{review.excerpt}</p>
                                <div className="review-footer">
                                    <span className="review-meta">{review.date}</span>
                                    <div className="review-actions">
                                        <span><IonIcon icon={thumbsUp} /> {review.likes}</span>
                                        <span><IonIcon icon={chatbubble} /> {review.comments}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* My Activity */}
                    <h3 className="section-header">MY ACTIVITY</h3>
                    <div className="menu-card">
                        <button className="menu-item tap-highlight order-history-link" onClick={() => history.push('/app/orders')}>
                            <div className="item-icon-circle orange">
                                <IonIcon icon={timeOutline} />
                            </div>
                            <div className="item-content">
                                <span className="item-title">Order History</span>
                                <span className="item-subtitle">View past orders</span>
                            </div>
                            <IonIcon icon={chevronForward} className="item-arrow" />
                        </button>
                        <button className="menu-item tap-highlight" onClick={() => history.push('/payment-methods')}>
                            <div className="item-icon-circle orange">
                                <IonIcon icon={card} />
                            </div>
                            <div className="item-content">
                                <span className="item-title">Payment Methods</span>
                                <span className="item-subtitle">Manage cards & history</span>
                            </div>
                            <IonIcon icon={chevronForward} className="item-arrow" />
                        </button>
                    </div>

                    {/* Account */}
                    <h3 className="section-header">ACCOUNT</h3>
                    <div className="menu-card">
                        <button className="menu-item tap-highlight" onClick={() => history.push('/notification-settings')}>
                            <div className="item-icon-circle gray">
                                <IonIcon icon={notifications} />
                            </div>
                            <div className="item-content">
                                <span className="item-title">Notifications</span>
                            </div>
                            <IonIcon icon={chevronForward} className="item-arrow" />
                        </button>
                        <div className="menu-item tap-highlight" onClick={() => setShowThemeModal(true)}>
                            <div className="item-icon-circle gray">
                                <IonIcon icon={themeMode === 'system' ? phonePortraitOutline : (themeMode === 'dark' ? moon : sunny)} />
                            </div>
                            <div className="item-content">
                                <span className="item-title">Appearance</span>
                            </div>
                            <span className="language-text" style={{ textTransform: 'capitalize' }}>{themeMode}</span>
                        </div>
                        <button className="menu-item tap-highlight">
                            <div className="item-icon-circle gray">
                                <IonIcon icon={globe} />
                            </div>
                            <div className="item-content">
                                <span className="item-title">Language</span>
                            </div>
                            <span className="language-text">English (US)</span>
                        </button>
                        <button className="menu-item tap-highlight" onClick={() => history.push('/help')}>
                            <div className="item-icon-circle gray">
                                <IonIcon icon={helpCircleOutline} />
                            </div>
                            <div className="item-content">
                                <span className="item-title">Help & Support</span>
                            </div>
                            <IonIcon icon={chevronForward} className="item-arrow" />
                        </button>
                        <button className="menu-item tap-highlight" onClick={() => history.push('/privacy')}>
                            <div className="item-icon-circle gray">
                                <IonIcon icon={shieldCheckmarkOutline} />
                            </div>
                            <div className="item-content">
                                <span className="item-title">Privacy & Security</span>
                            </div>
                            <IonIcon icon={chevronForward} className="item-arrow" />
                        </button>
                    </div>

                    {/* Logout */}
                    <div className="logout-container">
                        <button className="logout-btn" onClick={handleLogout}>
                            <IonIcon icon={logOutOutline} />
                            <span>Log Out</span>
                        </button>
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
                                    <button className="nav-tab" onClick={() => history.push('/app/favorites')}>Favorites</button>
                                </div>
                            </div>

                            <div className="navbar-search">
                                <IonIcon icon={searchOutline} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search restaurants, cuisines..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="navbar-right">

                                <div className="user-profile">
                                    <img src={profileData.avatar} alt="User" className="user-avatar" />
                                    <div className="user-info">
                                        <span className="user-name">{profileData.name}</span>
                                        <span className="user-level">Foodie Level 3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Desktop Main Content */}
                    <div className="desktop-profile-container">
                        {/* Page Header */}
                        <div className="desktop-page-header">
                            <h1>Profile</h1>
                        </div>

                        {/* Desktop 2-Column Layout */}
                        <div className="desktop-profile-grid">
                            {/* Left Sidebar: Profile Card + Achievements */}
                            <aside className="profile-sidebar">
                                {/* Profile Card */}
                                <div className="desktop-profile-card" onClick={openEditProfile}>
                                    <div className="profile-card-decoration top" />
                                    <div className="profile-card-decoration bottom" />
                                    <div className="profile-card-content">
                                        <div className="desktop-avatar-container">
                                            <div className="desktop-avatar-ring">
                                                <img src={profileData.avatar} alt="Profile" className="desktop-avatar-image" />
                                            </div>
                                            <button className="desktop-edit-btn">
                                                <IonIcon icon={pencil} />
                                            </button>
                                        </div>
                                        <h2 className="desktop-profile-name">{profileData.name}</h2>
                                        <p className="desktop-profile-bio">Food Critic • Level 3 • {profileData.location}</p>
                                        <span className="desktop-profile-badge">
                                            <IonIcon icon={trophy} /> Top 12% Users
                                        </span>
                                        <div className="desktop-profile-stats">
                                            <div className="desktop-stat">
                                                <span className="desktop-stat-value">24</span>
                                                <span className="desktop-stat-label">Reviews</span>
                                            </div>
                                            <div className="desktop-stat">
                                                <span className="desktop-stat-value">856</span>
                                                <span className="desktop-stat-label">Points</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements Card */}
                                <div className="desktop-achievements-card">
                                    <div className="achievements-header">
                                        <h3>My Achievements</h3>
                                        <IonIcon icon={trophy} className="achievements-icon" />
                                    </div>
                                    <div className="achievements-points">
                                        <span className="points-value">856</span>
                                        <span className="points-label">Total Points</span>
                                    </div>
                                    <div className="achievements-badges-row">
                                        <IonIcon icon={star} className="badge-lg gold" />
                                        <IonIcon icon={trophy} className="badge-lg gold" />
                                        <IonIcon icon={star} className="badge-lg gray" />
                                        <span className="badges-label">Badges Earned</span>
                                    </div>
                                    <div className="achievements-progress">
                                        <div className="progress-track">
                                            <div className="progress-fill-bar" style={{ width: '70%' }} />
                                        </div>
                                        <span className="progress-label">144 points to next level</span>
                                    </div>
                                    <p className="achievements-hint">Earn points by ordering, reviewing & rating</p>
                                    <button className="view-badges-btn-desktop" onClick={() => setShowBadgesModal(true)}>
                                        View All Badges
                                    </button>
                                </div>
                                <button className="sidebar-logout-btn" onClick={handleLogout}>
                                    <IonIcon icon={logOutOutline} />
                                    <span>Log Out</span>
                                </button>
                            </aside>

                            {/* Main Content */}
                            <main className="profile-main-content">
                                {/* My Activity Section */}
                                <section className="desktop-section">
                                    <h3 className="desktop-section-title">
                                        <IonIcon icon={timeOutline} /> My Activity
                                    </h3>
                                    <div className="activity-grid">
                                        <button className="activity-card" onClick={() => history.push('/app/orders')}>
                                            <div className="activity-icon orange">
                                                <IonIcon icon={timeOutline} />
                                            </div>
                                            <div className="activity-info">
                                                <h4>Order History</h4>
                                                <p>View past orders</p>
                                            </div>
                                            <IonIcon icon={chevronForward} className="activity-arrow" />
                                        </button>
                                    </div>
                                </section>

                                {/* My Recent Reviews Section */}
                                <section className="desktop-section">
                                    <div className="section-header-flex">
                                        <h3 className="desktop-section-title">
                                            <IonIcon icon={star} /> My Recent Reviews
                                        </h3>
                                        <button className="see-all-link" onClick={() => history.push('/my-reviews')}>See All</button>
                                    </div>
                                    <div className="desktop-review-card">
                                        <div className="review-card-content">
                                            <img src={recentReviews[0].restaurantImage} alt={recentReviews[0].restaurant} className="review-thumb" />
                                            <div className="review-body">
                                                <div className="review-header-row">
                                                    <div>
                                                        <h4>{recentReviews[0].restaurant}</h4>
                                                        <div className="review-rating-row">
                                                            <span className="rating-star">★</span>
                                                            <span className="rating-value">{recentReviews[0].rating}</span>
                                                            <span className="review-date">{recentReviews[0].date}</span>
                                                        </div>
                                                    </div>
                                                    <IonIcon icon={chevronForward} className="review-arrow-icon" />
                                                </div>
                                                <p className="review-text">{recentReviews[0].excerpt}</p>
                                                <div className="review-meta-row">
                                                    <span><IonIcon icon={thumbsUp} /> {recentReviews[0].likes}</span>
                                                    <span><IonIcon icon={chatbubble} /> {recentReviews[0].comments}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Account Section */}
                                <section className="desktop-section">
                                    <h3 className="desktop-section-title">
                                        <IonIcon icon={personOutline} /> Account
                                    </h3>
                                    <div className="account-list">
                                        <button className="account-item" onClick={() => history.push('/notification-settings')}>
                                            <div className="account-icon"><IonIcon icon={notifications} /></div>
                                            <span>Notifications</span>
                                            <IonIcon icon={chevronForward} className="account-arrow" />
                                        </button>
                                        <button className="account-item" onClick={() => setShowThemeModal(true)}>
                                            <div className="account-icon"><IonIcon icon={sunny} /></div>
                                            <span>Appearance</span>
                                            <div className="account-right">
                                                <span className="account-value">{themeMode === 'dark' ? 'Dark' : themeMode === 'light' ? 'Light' : 'System'}</span>
                                                <IonIcon icon={chevronForward} className="account-arrow" />
                                            </div>
                                        </button>
                                        <button className="account-item">
                                            <div className="account-icon"><IonIcon icon={globe} /></div>
                                            <span>Language</span>
                                            <div className="account-right">
                                                <span className="account-value">English (US)</span>
                                                <IonIcon icon={chevronForward} className="account-arrow" />
                                            </div>
                                        </button>
                                        <button className="account-item" onClick={() => history.push('/help')}>
                                            <div className="account-icon"><IonIcon icon={helpCircleOutline} /></div>
                                            <span>Help & Support</span>
                                            <IonIcon icon={chevronForward} className="account-arrow" />
                                        </button>
                                        <button className="account-item" onClick={() => history.push('/privacy')}>
                                            <div className="account-icon"><IonIcon icon={shieldCheckmarkOutline} /></div>
                                            <span>Privacy & Security</span>
                                            <IonIcon icon={chevronForward} className="account-arrow" />
                                        </button>
                                    </div>
                                </section>


                            </main>
                        </div>
                    </div>
                </div>

                {/* All Modals (shared between mobile and desktop) */}
                <IonAlert
                    isOpen={showLogoutAlert}
                    onDidDismiss={() => setShowLogoutAlert(false)}
                    header="Log Out"
                    message="Are you sure you want to log out?"
                    buttons={[
                        { text: 'Cancel', role: 'cancel', cssClass: 'alert-cancel' },
                        { text: 'Log Out', role: 'confirm', cssClass: 'alert-danger', handler: confirmLogout }
                    ]}
                />

                {/* Badges Modal */}
                <IonModal isOpen={showBadgesModal} onDidDismiss={() => setShowBadgesModal(false)} className="center-modal">
                    <div className="badges-modal-content">
                        <div className="badges-modal-header">
                            <h2>My Badges</h2>
                            <button className="modal-close-btn" onClick={() => setShowBadgesModal(false)}>
                                <IonIcon icon={close} />
                            </button>
                        </div>
                        <div className="badges-summary">
                            <div className="badges-summary-item">
                                <span className="badges-summary-value">{earnedBadges.length}</span>
                                <span className="badges-summary-label">Earned</span>
                            </div>
                            <div className="badges-summary-divider" />
                            <div className="badges-summary-item">
                                <span className="badges-summary-value">{inProgressBadges.length}</span>
                                <span className="badges-summary-label">In Progress</span>
                            </div>
                            <div className="badges-summary-divider" />
                            <div className="badges-summary-item">
                                <span className="badges-summary-value">{allBadges.length}</span>
                                <span className="badges-summary-label">Total</span>
                            </div>
                        </div>
                        <h3 className="badges-section-title"><IonIcon icon={trophy} /> Earned Badges</h3>
                        <div className="badges-grid">
                            {earnedBadges.map((badge) => (
                                <div key={badge.id} className={`badge-card earned ${badge.tier}`}>
                                    <div className={`badge-icon-container ${badge.tier}`}>
                                        <IonIcon icon={badge.icon} />
                                    </div>
                                    <h4 className="badge-name">{badge.name}</h4>
                                    <p className="badge-description">{badge.description}</p>
                                    <span className="badge-date">Earned {badge.earnedDate}</span>
                                    <span className={`badge-tier ${badge.tier}`}>{badge.tier}</span>
                                </div>
                            ))}
                        </div>
                        <h3 className="badges-section-title"><IonIcon icon={flame} /> In Progress</h3>
                        <div className="badges-grid">
                            {inProgressBadges.map((badge) => (
                                <div key={badge.id} className={`badge-card locked ${badge.tier}`}>
                                    <div className="badge-icon-container locked">
                                        <IonIcon icon={badge.icon} />
                                    </div>
                                    <h4 className="badge-name">{badge.name}</h4>
                                    <p className="badge-description">{badge.description}</p>
                                    {badge.progress && (
                                        <div className="badge-progress">
                                            <div className="badge-progress-bar">
                                                <div className="badge-progress-fill" style={{ width: `${(badge.progress.current / badge.progress.total) * 100}%` }} />
                                            </div>
                                            <span className="badge-progress-text">{badge.progress.current} / {badge.progress.total}</span>
                                        </div>
                                    )}
                                    <span className={`badge-tier ${badge.tier}`}>{badge.tier}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ height: '40px' }} />
                    </div>
                </IonModal>

                {/* Edit Profile Modal */}
                <IonModal isOpen={showEditProfileModal} onDidDismiss={() => setShowEditProfileModal(false)} className="full-screen-modal">
                    <div className="edit-profile-modal-content">
                        <div className="edit-profile-header">
                            <button className="header-back-btn" onClick={() => setShowEditProfileModal(false)}>
                                <IonIcon icon={chevronBack} />
                            </button>
                            <h2>Edit Profile</h2>
                            <div className="header-spacer" />
                        </div>
                        <div className="edit-avatar-section">
                            <div className="edit-avatar-wrapper">
                                <div className="edit-avatar-glow" />
                                <img src={editFormData.avatar} alt="Profile" className="edit-avatar-image" />
                                <button className="change-photo-btn" onClick={() => fileInputRef.current?.click()}>
                                    <IonIcon icon={cameraOutline} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            const reader = new FileReader()
                                            reader.onloadend = () => {
                                                setEditFormData({ ...editFormData, avatar: reader.result as string })
                                            }
                                            reader.readAsDataURL(file)
                                        }
                                    }}
                                />
                            </div>
                            <span className="change-photo-text">Tap to change photo</span>
                        </div>
                        <div className="edit-form">
                            <div className="form-card">
                                <div className="form-card-icon"><IonIcon icon={personOutline} /></div>
                                <div className="form-card-content">
                                    <label className="form-card-label">FULL NAME</label>
                                    <input
                                        type="text"
                                        className="form-card-input"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>
                            <div className="form-card">
                                <div className="form-card-icon"><IonIcon icon={callOutline} /></div>
                                <div className="form-card-content">
                                    <label className="form-card-label">PHONE NUMBER</label>
                                    <input
                                        type="tel"
                                        className="form-card-input"
                                        value={editFormData.phone}
                                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                                        placeholder="Phone number"
                                    />
                                </div>
                            </div>
                            <div className="form-card">
                                <div className="form-card-icon"><IonIcon icon={locationOutline} /></div>
                                <div className="form-card-content">
                                    <label className="form-card-label">LOCATION</label>
                                    <input
                                        type="text"
                                        className="form-card-input"
                                        value={editFormData.location}
                                        onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                                        placeholder="Enter your city"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="save-button-container">
                            <button className={`save-changes-btn ${hasChanges() ? 'active' : ''}`} onClick={saveProfile} disabled={!hasChanges()}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </IonModal>

                {/* Theme Selection Modal */}
                <IonModal isOpen={showThemeModal} onDidDismiss={() => setShowThemeModal(false)} className="center-modal theme-selection-modal">
                    <div className="theme-modal-content">
                        <div className="theme-modal-header">
                            <h2>Choose Appearance</h2>
                            <button className="modal-close-btn" onClick={() => setShowThemeModal(false)}>
                                <IonIcon icon={close} />
                            </button>
                        </div>
                        <div className="theme-options">
                            <button className={`theme-option ${themeMode === 'light' ? 'selected' : ''}`} onClick={() => handleThemeSelect('light')}>
                                <div className="theme-icon light"><IonIcon icon={sunny} /></div>
                                <span className="theme-label">Light Mode</span>
                                {themeMode === 'light' && <IonIcon icon={checkmark} className="theme-check" />}
                            </button>
                            <button className={`theme-option ${themeMode === 'dark' ? 'selected' : ''}`} onClick={() => handleThemeSelect('dark')}>
                                <div className="theme-icon dark"><IonIcon icon={moon} /></div>
                                <span className="theme-label">Dark Mode</span>
                                {themeMode === 'dark' && <IonIcon icon={checkmark} className="theme-check" />}
                            </button>
                            <button className={`theme-option ${themeMode === 'system' ? 'selected' : ''}`} onClick={() => handleThemeSelect('system')}>
                                <div className="theme-icon system"><IonIcon icon={phonePortraitOutline} /></div>
                                <span className="theme-label">System Default</span>
                                {themeMode === 'system' && <IonIcon icon={checkmark} className="theme-check" />}
                            </button>
                        </div>
                    </div>
                </IonModal>
            </IonContent >
        </IonPage >
    )
}

export default ProfilePage

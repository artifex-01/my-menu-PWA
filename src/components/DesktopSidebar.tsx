import React from 'react'
import { IonIcon } from '@ionic/react'
import { home, homeOutline, search, searchOutline, qrCode, heart, heartOutline, person, personOutline, restaurant } from 'ionicons/icons'
import { useLocation, useHistory } from 'react-router-dom'
import './DesktopSidebar.css'

interface NavItem {
    path: string
    icon: string
    iconOutline: string
    label: string
    isCenter?: boolean
}

const navItems: NavItem[] = [
    { path: '/app/home', icon: home, iconOutline: homeOutline, label: 'Home' },
    { path: '/app/explore', icon: search, iconOutline: searchOutline, label: 'Explore' },
    { path: '/qr-scan', icon: qrCode, iconOutline: qrCode, label: 'Scan QR', isCenter: true },
    { path: '/app/favorites', icon: heart, iconOutline: heartOutline, label: 'Favorites' },
    { path: '/app/profile', icon: person, iconOutline: personOutline, label: 'Profile' },
]

const DesktopSidebar: React.FC = () => {
    const location = useLocation()
    const history = useHistory()

    const isActive = (path: string) => location.pathname === path

    const handleNavClick = (path: string) => {
        history.push(path)
    }

    return (
        <aside className="desktop-sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <IonIcon icon={restaurant} className="logo-icon" />
                <span className="logo-text">My Menu</span>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''} ${item.isCenter ? 'scan-btn' : ''}`}
                        onClick={() => handleNavClick(item.path)}
                    >
                        <IonIcon icon={isActive(item.path) ? item.icon : item.iconOutline} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* User Profile */}
            <div className="sidebar-user" onClick={() => history.push('/app/profile')}>
                <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                    alt="User"
                    className="user-avatar"
                />
                <div className="user-info">
                    <span className="user-name">Alex Johnson</span>
                    <span className="user-level">Foodie Level 3</span>
                </div>
            </div>
        </aside>
    )
}

export default DesktopSidebar

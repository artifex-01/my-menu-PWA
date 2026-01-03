import React from 'react'
import { IonIcon } from '@ionic/react'
import { home, homeOutline, search, searchOutline, qrCode, heart, heartOutline, person, personOutline } from 'ionicons/icons'
import { useLocation, useHistory } from 'react-router-dom'
import './BottomNav.css'

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
    { path: '/qr-scan', icon: qrCode, iconOutline: qrCode, label: 'Scan', isCenter: true },
    { path: '/app/favorites', icon: heart, iconOutline: heartOutline, label: 'Favorites' },
    { path: '/app/profile', icon: person, iconOutline: personOutline, label: 'Profile' },
]

const BottomNav: React.FC = () => {
    const location = useLocation()
    const history = useHistory()

    const isActive = (path: string) => location.pathname === path

    const handleNavClick = (path: string) => {
        history.push(path)
    }

    return (
        <div className="bottom-nav-container">
            <nav className="bottom-nav">
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        className={`nav-item ${isActive(item.path) ? 'active' : ''} ${item.isCenter ? 'nav-center' : ''}`}
                        onClick={() => handleNavClick(item.path)}
                        aria-label={item.label}
                    >
                        {item.isCenter ? (
                            <div className="center-button">
                                <IonIcon icon={item.icon} />
                                <span className="nav-label">{item.label}</span>
                            </div>
                        ) : (
                            <>
                                <IonIcon icon={isActive(item.path) ? item.icon : item.iconOutline} />
                                <span className="nav-label">{item.label}</span>
                                <span className="nav-dot" />
                            </>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default BottomNav

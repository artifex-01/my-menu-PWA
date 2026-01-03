import React, { useState } from 'react'
import { IonPage, IonContent, IonIcon } from '@ionic/react'
import { chevronBack, information } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './ProfilePage.css'
import './NotificationSettingsPage.css'

const NotificationSettingsPage: React.FC = () => {
    const history = useHistory()

    const [settings, setSettings] = useState({
        pauseAll: false,
        orderUpdates: true,
        reservations: true,
        reviewReminders: true,
        menuAlerts: false,
        friendActivity: true,
        promos: false,
        nearby: true
    })

    const toggle = (key: string) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
    }

    const renderToggle = (key: string, title: string, subtitle?: string) => (
        <div className="notif-item" onClick={() => toggle(key)}>
            <div className="notif-info">
                <span className="notif-title">{title}</span>
                {subtitle && <span className="notif-subtitle">{subtitle}</span>}
            </div>
            <div className={`notif-toggle ${settings[key as keyof typeof settings] ? 'checked' : ''}`}>
                <div className="notif-toggle-handle" />
            </div>
        </div>
    )

    return (
        <IonPage>
            <IonContent className="notif-page-content" fullscreen>
                {/* Header */}
                <div className="profile-page-header">
                    <button className="header-back-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={chevronBack} />
                    </button>
                    <h1 className="page-title" style={{ marginLeft: '16px', fontSize: '20px' }}>Notification Settings</h1>
                    <div style={{ width: '40px' }}></div>
                </div>

                {/* Pause All */}
                <div className="notif-card pause-all-card">
                    {renderToggle('pauseAll', 'Pause All Notifications')}
                </div>

                {/* Orders & Updates */}
                <div className="notif-section-header">Orders & Updates</div>
                <div className="notif-card">
                    {renderToggle('orderUpdates', 'Order Updates', 'Real-time status on pickup/delivery')}
                    {renderToggle('reservations', 'Table Reservations', 'Reminders for upcoming bookings')}
                </div>

                {/* Discovery & Social */}
                <div className="notif-section-header">Discovery & Social</div>
                <div className="notif-card">
                    {renderToggle('reviewReminders', 'Review Reminders', "Prompts to review places you've visited")}
                    {renderToggle('menuAlerts', 'New Menu Alerts', 'Updates from your favorite spots')}
                    {renderToggle('friendActivity', 'Friend Activity', 'When friends post new reviews')}
                </div>

                {/* Deals & Promos */}
                <div className="notif-section-header">Deals & Promos</div>
                <div className="notif-card">
                    {renderToggle('promos', 'Promotional Offers', 'Discounts and happy hour alerts')}
                    {renderToggle('nearby', 'Nearby Suggestions', 'Recommendations based on location')}
                </div>

                {/* System Info */}
                <div className="system-info-box">
                    <div className="info-icon-circle">
                        <IonIcon icon={information} />
                    </div>
                    <div className="info-text">
                        Some push notifications are managed via your operating system settings. <span className="info-link">Open System Settings</span>
                    </div>
                </div>

                <div style={{ height: '40px' }} />

            </IonContent>
        </IonPage>
    )
}

export default NotificationSettingsPage

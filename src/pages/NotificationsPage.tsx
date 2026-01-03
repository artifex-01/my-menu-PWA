import React from 'react'
import { IonPage, IonContent, IonIcon } from '@ionic/react'
import {
    chevronBack,
    settingsOutline,
    checkmarkDone,
    fastFood,
    ribbon,
    pricetag,
    chatbubbleEllipses,
    shieldCheckmark
} from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './ProfilePage.css'
import './NotificationsPage.css'

interface Notification {
    id: string
    type: 'order' | 'reward' | 'offer' | 'review' | 'system'
    icon: string
    title: string
    desc: string
    time: string
    group: 'Today' | 'Yesterday' | 'Earlier'
    unread: boolean
    action?: string
    actionLink?: string
}

const NotificationsPage: React.FC = () => {
    const history = useHistory()

    const notifications: Notification[] = [
        // TODAY
        {
            id: '1', type: 'order', icon: fastFood, title: 'Order Ready', desc: 'Your order #234 at Burger Hub is ready for pickup!',
            time: '2m ago', group: 'Today', unread: true, action: 'View Order'
        },
        {
            id: '2', type: 'reward', icon: ribbon, title: 'You earned 25 points', desc: 'Great choice! You earned points for your last order at The Pasta Place.',
            time: '2h ago', group: 'Today', unread: true
        },
        {
            id: '3', type: 'offer', icon: pricetag, title: 'Late Night Deal', desc: 'Get 20% off all appetizers near you until 11 PM.',
            time: '5h ago', group: 'Today', unread: false, action: 'See Deals'
        },

        // YESTERDAY
        {
            id: '4', type: 'review', icon: chatbubbleEllipses, title: 'How was The Pasta Place?', desc: 'Rate your meal to help others and earn 10 points.',
            time: 'Yesterday', group: 'Yesterday', unread: false, action: 'Rate Now'
        },
        {
            id: '5', type: 'order', icon: fastFood, title: 'Order Delivered', desc: 'Order #221 from Pizza Paradise was delivered safely.',
            time: 'Yesterday', group: 'Yesterday', unread: false
        },

        // EARLIER
        {
            id: '6', type: 'system', icon: shieldCheckmark, title: 'New Login Detected', desc: 'We noticed a login from a new device (iPhone 14). Is this you?',
            time: 'Oct 20', group: 'Earlier', unread: false
        }
    ]

    const grouped = {
        Today: notifications.filter(n => n.group === 'Today'),
        Yesterday: notifications.filter(n => n.group === 'Yesterday'),
        Earlier: notifications.filter(n => n.group === 'Earlier')
    }

    return (
        <IonPage>
            <IonContent className="notif-page-bg" fullscreen>
                {/* Header */}
                <div className="notif-header-row">
                    <button className="header-icon-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={chevronBack} />
                    </button>
                    {/* Centered Title logic roughly, or just left aligned? Reference usually Centered or Left. I'll stick to CSS which does flex between. */}
                    <h1 className="notif-header-title" style={{ flex: 1, textAlign: 'center' }}>Notifications</h1>
                    <button className="header-icon-btn" onClick={() => history.push('/notification-settings')}>
                        <IonIcon icon={settingsOutline} />
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 24px' }}>
                    <button className="mark-read-btn">
                        <IonIcon icon={checkmarkDone} style={{ marginRight: '4px' }} />
                        Mark all as read
                    </button>
                </div>

                {Object.entries(grouped).map(([group, items]) => items.length > 0 && (
                    <div key={group}>
                        <h3 className="notif-group-header">{group}</h3>
                        {items.map(n => (
                            <div key={n.id} className={`notif-item-card type-${n.type} ${n.unread ? 'unread' : ''}`}>
                                <div className="notif-icon-box">
                                    <IonIcon icon={n.icon} />
                                </div>
                                <div className="notif-content-col">
                                    <div className="notif-header-flex">
                                        <span className="notif-title">{n.title}</span>
                                        <span className="notif-time">{n.time}</span>
                                    </div>
                                    <p className="notif-desc">{n.desc}</p>

                                    {n.action && (
                                        <div className="notif-action-container">
                                            <button className="notif-action-btn">
                                                {n.action}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

                <div style={{ height: '40px' }}></div>
            </IonContent>
        </IonPage>
    )
}

export default NotificationsPage

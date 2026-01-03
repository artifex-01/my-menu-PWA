import React, { useState } from 'react'
import { IonPage, IonContent, IonIcon } from '@ionic/react'
import {
    chevronBack,
    person,
    barChart,
    scan,
    shareSocial,
    shieldCheckmark,
    chevronDown,
    chevronUp
} from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './ProfilePage.css'
import './PrivacyPage.css'

const PrivacyPage: React.FC = () => {
    const history = useHistory()
    const [expandedId, setExpandedId] = useState<number | null>(1)

    const toggleAccordion = (id: number) => {
        setExpandedId(expandedId === id ? null : id)
    }

    const sections = [
        {
            id: 1,
            title: '1. Information We Collect',
            icon: person,
            content: 'We collect information you provide directly to us, such as when you create an account, update your profile, or write a review. This includes your name, email address, and dining preferences.'
        },
        {
            id: 2,
            title: '2. How We Use Your Data',
            icon: barChart,
            content: 'We use your data to personalize your dining experience, recommend restaurants based on your tastes, and improve our services. Your data helps us better understand what food you love.'
        },
        {
            id: 3,
            title: '3. Camera & Location',
            icon: scan,
            content: 'We request camera access to scan QR codes for menus and payments. Location services are used to show you nearby restaurants and calculate accurate delivery times.'
        },
        {
            id: 4,
            title: '4. Third-Party Sharing',
            icon: shareSocial,
            content: 'We do not sell your personal data. We may share information with restaurant partners only to facilitate your orders and reservations. All partners are bound by strict confidentiality agreements.'
        }
    ]

    return (
        <IonPage>
            <IonContent className="favorites-content" fullscreen>
                {/* Header */}
                <div className="profile-page-header">
                    <button className="header-back-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={chevronBack} />
                    </button>
                    <h1 className="page-title" style={{ marginLeft: '16px', fontSize: '20px' }}>Privacy Policy</h1>
                    <div style={{ width: '40px' }}></div>
                </div>

                <div className="privacy-last-updated">Last Updated: October 24, 2023</div>

                <p className="privacy-intro">
                    At <strong>My Menu</strong>, your privacy is our priority. This policy outlines how we collect, use, and safeguard your data while you discover great food nearby.
                </p>

                <div className="privacy-accordion">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className={`accordion-card ${expandedId === section.id ? 'expanded' : ''}`}
                            onClick={() => toggleAccordion(section.id)}
                        >
                            <div className="accordion-header">
                                <div className="accordion-icon-circle">
                                    <IonIcon icon={section.icon} />
                                </div>
                                <span className="accordion-title">{section.title}</span>
                                <IonIcon
                                    icon={expandedId === section.id ? chevronUp : chevronDown}
                                    className="accordion-toggle-icon"
                                />
                            </div>
                            {expandedId === section.id && (
                                <div className="accordion-content">
                                    {section.content}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="privacy-footer">
                    <button className="contact-officer-btn">
                        <IonIcon icon={shieldCheckmark} />
                        Contact Data Officer
                    </button>
                    <div className="privacy-email-text">
                        Questions? Email <span>privacy@mymenu.com</span>
                    </div>
                </div>

                {/* Safe area padding */}
                <div style={{ height: '40px' }} />

            </IonContent>
        </IonPage>
    )
}

export default PrivacyPage

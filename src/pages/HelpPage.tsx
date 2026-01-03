import React from 'react'
import { IonPage, IonContent, IonIcon } from '@ionic/react'
import {
    chevronBack,
    chevronForward,
    qrCodeOutline,
    personCircleOutline,
    chatboxEllipsesOutline,
    cardOutline,
    headsetOutline,
    chatbubble
} from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './HelpPage.css'

const HelpPage: React.FC = () => {
    const history = useHistory()

    const topics = [
        { id: 1, name: 'Scanning', icon: qrCodeOutline },
        { id: 2, name: 'Account', icon: personCircleOutline },
        { id: 3, name: 'Reviews', icon: chatboxEllipsesOutline },
        { id: 4, name: 'Payments', icon: cardOutline },
    ]

    const topQuestions = [
        'My camera won\'t scan the QR code',
        'How do I edit my review?',
        'The restaurant location is wrong'
    ]

    return (
        <IonPage>
            <IonContent className="help-content" fullscreen>
                {/* Header */}
                <div className="help-header">
                    <button className="help-back-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={chevronBack} />
                    </button>
                    <h1 className="help-title">Help Center</h1>
                    <div className="help-header-spacer" />
                </div>

                <div className="help-body">
                    {/* Hero Title */}
                    <h2 className="help-hero-title">How can we<br />help you?</h2>

                    {/* Common Topics */}
                    <h3 className="help-section-title">Common Topics</h3>
                    <div className="topics-grid">
                        {topics.map(topic => (
                            <button key={topic.id} className="topic-card">
                                <div className="topic-icon orange">
                                    <IonIcon icon={topic.icon} />
                                </div>
                                <span className="topic-name">{topic.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Top Questions */}
                    <h3 className="help-section-title">Top Questions</h3>
                    <div className="questions-list">
                        {topQuestions.map((question, index) => (
                            <button key={index} className="question-item">
                                <span className="question-text">{question}</span>
                                <IonIcon icon={chevronForward} className="question-arrow" />
                            </button>
                        ))}
                    </div>

                    {/* Contact Support */}
                    <div className="support-card">
                        <div className="support-icon-circle">
                            <IonIcon icon={headsetOutline} />
                        </div>
                        <h3 className="support-title">Still need help?</h3>
                        <p className="support-desc">
                            Our support team is available 24/7 to assist you with any issues.
                        </p>
                        <button className="contact-btn">
                            <IonIcon icon={chatbubble} style={{ marginRight: '8px' }} />
                            Contact Support
                        </button>
                        <button className="feedback-link">
                            Send Feedback
                        </button>
                    </div>

                    <div style={{ height: '40px' }} />
                </div>
            </IonContent>
        </IonPage>
    )
}

export default HelpPage

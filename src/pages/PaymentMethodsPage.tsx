import React from 'react'
import { IonPage, IonContent, IonIcon } from '@ionic/react'
import { chevronBack, card, add } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './ProfilePage.css' // Reuse profile styles for simplicity or create new ones

const PaymentMethodsPage: React.FC = () => {
    const history = useHistory()

    const methods = [
        { id: '1', type: 'Visa', last4: '4242', expiry: '12/24', isDefault: true },
        { id: '2', type: 'Mastercard', last4: '8888', expiry: '09/25', isDefault: false }
    ]

    return (
        <IonPage>
            <IonContent className="profile-content" fullscreen>
                <div className="profile-page-header">
                    <button className="header-back-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={chevronBack} />
                    </button>
                    <h1 className="page-title" style={{ marginLeft: '16px', fontSize: '20px' }}>Payment Methods</h1>
                    <div style={{ width: '40px' }}></div>
                </div>

                <div style={{ padding: '20px' }}>
                    {methods.map(method => (
                        <div key={method.id} className="menu-card" style={{ marginBottom: '16px', padding: '20px', display: 'flex', alignItems: 'center' }}>
                            <div className="item-icon-circle orange">
                                <IonIcon icon={card} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--app-text-primary)' }}>
                                    {method.type} •••• {method.last4}
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--app-text-secondary)', marginTop: '4px' }}>
                                    Expires {method.expiry}
                                </div>
                            </div>
                            {method.isDefault && (
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    color: 'var(--app-primary)',
                                    background: 'rgba(255,138,0,0.1)',
                                    padding: '4px 8px',
                                    borderRadius: '8px'
                                }}>
                                    DEFAULT
                                </span>
                            )}
                        </div>
                    ))}

                    <button style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: '16px',
                        border: '2px dashed var(--app-border)',
                        background: 'transparent',
                        color: 'var(--app-text-muted)',
                        fontSize: '15px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                    }}>
                        <IonIcon icon={add} style={{ fontSize: '20px' }} />
                        Add New Card
                    </button>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default PaymentMethodsPage

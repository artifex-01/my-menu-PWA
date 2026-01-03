import React, { useState, useRef, useEffect } from 'react'
import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
    IonText
} from '@ionic/react'
import { alertCircle, arrowForward, restaurant } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import './LoginPage.css'

const LoginPage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showError, setShowError] = useState(false)
    const inputRef = useRef<HTMLIonInputElement>(null)
    const history = useHistory()

    const isValidPhone = phoneNumber.length === 10

    useEffect(() => {
        // Auto focus on phone input
        const timer = setTimeout(() => {
            inputRef.current?.setFocus()
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const handlePhoneChange = (value: string | null | undefined) => {
        if (!value) {
            setPhoneNumber('')
            setShowError(false)
            return
        }

        // Remove any non-numeric characters
        const numericOnly = value.replace(/[^0-9]/g, '')
        // Limit to 10 digits
        const limitedNumber = numericOnly.slice(0, 10)
        setPhoneNumber(limitedNumber)

        // Show error only if user has started typing but hasn't completed
        if (limitedNumber.length > 0 && limitedNumber.length < 10) {
            setShowError(true)
        } else {
            setShowError(false)
        }
    }

    const handleContinueWithPhone = () => {
        if (isValidPhone) {
            history.push('/otp', { phoneNumber: `+91 ${phoneNumber}` })
        }
    }

    const handleContinueAsGuest = () => {
        history.push('/app/home')
    }

    return (
        <IonPage>
            <IonContent className="login-content" fullscreen>
                <div className="login-container fade-in">
                    {/* Logo */}
                    <div className="logo-container">
                        <div className="logo-circle">
                            <IonIcon icon={restaurant} className="logo-icon" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="login-title">Discover & Dine</h1>
                    <p className="login-subtitle">
                        Find nearby favorites, scan menus,<br />and read reviews.
                    </p>

                    {/* Phone Input */}
                    <div className="input-section">
                        <label className="input-label">MOBILE NUMBER</label>
                        <div className="phone-input-container">
                            {/* Fixed Country Code */}
                            <div className="country-code-box">
                                <span className="country-code">+91</span>
                            </div>

                            {/* Phone Number Input */}
                            <div className={`phone-input-wrapper ${showError ? 'error' : ''}`}>
                                <IonInput
                                    ref={inputRef}
                                    type="tel"
                                    inputmode="numeric"
                                    value={phoneNumber}
                                    onIonInput={(e) => handlePhoneChange(e.detail.value)}
                                    placeholder="Enter mobile number"
                                    maxlength={10}
                                    className="phone-input"
                                />
                            </div>
                        </div>

                        {/* Validation Error */}
                        {showError && (
                            <div className="error-container">
                                <IonIcon icon={alertCircle} className="error-icon" />
                                <IonText color="danger" className="error-text">
                                    Enter a valid 10-digit mobile number
                                </IonText>
                            </div>
                        )}
                    </div>

                    {/* Continue with Phone Button */}
                    <IonButton
                        expand="block"
                        className={`primary-button ${!isValidPhone ? 'disabled' : ''}`}
                        onClick={handleContinueWithPhone}
                        disabled={!isValidPhone}
                    >
                        Continue with Phone
                    </IonButton>

                    {/* Divider */}
                    <div className="divider">
                        <div className="divider-line" />
                        <span className="divider-text">Or connect with</span>
                        <div className="divider-line" />
                    </div>

                    {/* Continue with Google */}
                    <IonButton expand="block" fill="outline" className="google-button">
                        <span className="google-g">G</span>
                        Continue with Google
                    </IonButton>

                    {/* Continue as Guest */}
                    <button className="guest-button" onClick={handleContinueAsGuest}>
                        <span>Continue as Guest</span>
                        <IonIcon icon={arrowForward} />
                    </button>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage

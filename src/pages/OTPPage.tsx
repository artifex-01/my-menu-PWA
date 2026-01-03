import React, { useState, useRef, useEffect } from 'react'
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton
} from '@ionic/react'
import { useHistory, useLocation } from 'react-router-dom'
import './OTPPage.css'

const OTP_LENGTH = 4

interface LocationState {
    phoneNumber?: string
}

const OTPPage: React.FC = () => {
    const location = useLocation<LocationState>()
    const phoneNumber = location.state?.phoneNumber || '+91 9876543210'
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
    const [timer, setTimer] = useState(28)
    const [focusedIndex, setFocusedIndex] = useState(0)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const history = useHistory()

    // Timer countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev > 0 ? prev - 1 : 0)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    // Auto focus first input
    useEffect(() => {
        const timeout = setTimeout(() => {
            inputRefs.current[0]?.focus()
        }, 300)
        return () => clearTimeout(timeout)
    }, [])

    // Format timer as MM:SS
    const formatTimer = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleOtpChange = (value: string, index: number) => {
        // Only allow numeric input
        const numericValue = value.replace(/[^0-9]/g, '').slice(-1)

        const newOtp = [...otp]
        newOtp[index] = numericValue
        setOtp(newOtp)

        // Auto-focus next input
        if (numericValue && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus()
            setFocusedIndex(index + 1)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
            setFocusedIndex(index - 1)
        }
    }

    const handleFocus = (index: number) => {
        setFocusedIndex(index)
    }

    const handleVerify = () => {
        const otpValue = otp.join('')
        if (otpValue.length === OTP_LENGTH) {
            history.push('/app/home')
        }
    }

    const handleResend = () => {
        setTimer(28)
        setOtp(Array(OTP_LENGTH).fill(''))
        inputRefs.current[0]?.focus()
        setFocusedIndex(0)
    }

    const isComplete = otp.every(digit => digit !== '')

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" text="" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="otp-content" fullscreen>
                <div className="otp-container fade-in">
                    {/* Title */}
                    <h1 className="otp-title">Verify Phone</h1>

                    {/* Subtitle with Phone Number */}
                    <p className="otp-subtitle">Enter the code sent to</p>
                    <p className="otp-phone">{phoneNumber}</p>

                    {/* OTP Input Boxes */}
                    <div className="otp-input-container">
                        {otp.map((digit, index) => (
                            <div key={index} className="otp-input-wrapper">
                                <input
                                    ref={ref => inputRefs.current[index] = ref}
                                    type="tel"
                                    inputMode="numeric"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onFocus={() => handleFocus(index)}
                                    maxLength={1}
                                    className="otp-input"
                                />
                                <div className={`otp-underline ${digit ? 'filled' : ''} ${focusedIndex === index ? 'focused' : ''}`} />
                            </div>
                        ))}
                    </div>

                    {/* Resend Timer */}
                    <div className="resend-container">
                        {timer > 0 ? (
                            <p className="timer-text">
                                Resend code in <span className="timer-value">{formatTimer(timer)}</span>
                            </p>
                        ) : (
                            <button className="resend-button" onClick={handleResend}>
                                Resend Code
                            </button>
                        )}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="bottom-section">
                    <IonButton
                        expand="block"
                        className={`verify-button ${!isComplete ? 'disabled' : ''}`}
                        onClick={handleVerify}
                        disabled={!isComplete}
                    >
                        Verify
                    </IonButton>

                    <button className="change-number-button" onClick={() => history.goBack()}>
                        <span className="change-label">Wrong number?</span>
                        <span className="change-link">Change Phone Number</span>
                    </button>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default OTPPage

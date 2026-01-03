import React, { useState } from 'react'
import {
    IonPage,
    IonContent,
    IonIcon
} from '@ionic/react'
import { arrowBack, chevronForward, cardOutline, cashOutline, phonePortraitOutline, pricetagOutline, lockClosed, checkmarkCircle } from 'ionicons/icons'
import { useHistory, useLocation } from 'react-router-dom'
import './PaymentPage.css'

interface LocationState {
    total?: number
}

const PaymentPage: React.FC = () => {
    const history = useHistory()
    const location = useLocation<LocationState>()
    const orderTotal = location.state?.total || 1047

    const [selectedMethod, setSelectedMethod] = useState('upi')
    const [tipAmount, setTipAmount] = useState<number | null>(null)
    const [customTip, setCustomTip] = useState('')
    const [showPromoInput, setShowPromoInput] = useState(false)
    const [promoCode, setPromoCode] = useState('')

    const [showCardModal, setShowCardModal] = useState(false)
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvv: '',
        name: ''
    })

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Rating Modal State
    const [showRatingModal, setShowRatingModal] = useState(false)
    const [rating, setRating] = useState(0)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [feedbackNote, setFeedbackNote] = useState('')
    const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false)

    const feedbackTags = ['Delicious', 'Fast Delivery', 'Good Portion', 'Hot Food', 'Friendly Service']

    const calculateTotal = () => {
        let tip = 0
        if (tipAmount !== null) {
            tip = tipAmount
        } else if (customTip) {
            tip = parseInt(customTip) || 0
        }
        return orderTotal + tip
    }

    const finalTotal = calculateTotal()

    const handlePay = () => {
        if (selectedMethod === 'upi') {
            // Attempt to open UPI app
            // In a real app, this would use AppLauncher or similar
            const upiUrl = `upi://pay?pa=merchant@upi&pn=MyMenu&am=${finalTotal}&cu=INR`
            window.location.href = upiUrl

            // Show success modal as fallback/confirmation
            setSuccessMessage(`Payment request of ₹${finalTotal} initiated via UPI.`)
            setShowSuccessModal(true)
        }
        else if (selectedMethod === 'card') {
            setShowCardModal(true)
        }
        else if (selectedMethod === 'cash') {
            setSuccessMessage('A staff member will come to your table shortly to collect cash and provide the bill. Thank you!')
            setShowSuccessModal(true)
        }
    }

    // Input Formatters
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = v.match(/\d{4,16}/g)
        const match = matches && matches[0] || ''
        const parts = []

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
    }

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4)
        }
        return v
    }

    const processCardPayment = () => {
        // Validation Regex
        const cardNumRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
        const cvvRegex = /^\d{3}$/

        if (!cardNumRegex.test(cardDetails.number)) {
            setErrorMessage('Please enter a valid 16-digit card number.')
            setShowErrorModal(true)
            return
        }

        if (!expiryRegex.test(cardDetails.expiry)) {
            setErrorMessage('Please enter a valid expiry date (MM/YY).')
            setShowErrorModal(true)
            return
        }

        if (!cvvRegex.test(cardDetails.cvv)) {
            setErrorMessage('Please enter a valid 3-digit CVV.')
            setShowErrorModal(true)
            return
        }

        if (!cardDetails.name.trim()) {
            setErrorMessage('Please enter the cardholder name.')
            setShowErrorModal(true)
            return
        }

        // Success
        setShowCardModal(false)
        setSuccessMessage(`Payment of ₹${finalTotal} successful via Card!`)
        setShowSuccessModal(true)
    }

    const handleDownloadBill = () => {
        const billContent = `
        MY MENU - BILL RECEIPT
        ----------------------
        Date: ${new Date().toLocaleString()}
        Order Total: ₹${finalTotal}
        Payment Method: ${selectedMethod.toUpperCase()}
        Status: PAID
        ----------------------
        Thank you for dining with us!
        `
        const blob = new Blob([billContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `Bill_${Date.now()}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }



    const handleErrorDismiss = () => {
        setShowErrorModal(false)
    }

    const togglePromoInput = () => {
        setShowPromoInput(!showPromoInput)
    }

    return (
        <IonPage>
            <IonContent className="payment-content" scrollY={true}>
                {/* Header */}
                <header className="payment-header">
                    <button className="back-btn" onClick={() => history.goBack()}>
                        <IonIcon icon={arrowBack} />
                    </button>
                    <h1 className="header-title">Payment</h1>
                    <div className="header-spacer" />
                </header>

                {/* Total Bill Section */}
                <div className="bill-section">
                    <span className="bill-label">TOTAL BILL</span>
                    <h2 className="bill-amount">₹{finalTotal}</h2>
                    <div className="order-confirmed-badge">
                        <div className="check-circle">✓</div>
                        <span>Order confirmed</span>
                    </div>
                </div>

                {/* Promo Code */}
                <div className="promo-section">
                    {!showPromoInput ? (
                        <button className="promo-card" onClick={togglePromoInput}>
                            <div className="promo-left">
                                <div className="promo-icon-circle">
                                    <IonIcon icon={pricetagOutline} />
                                </div>
                                <div className="promo-info">
                                    <span className="promo-title">Apply Promo Code</span>
                                    <span className="promo-subtitle">Save on your order</span>
                                </div>
                            </div>
                            <IonIcon icon={chevronForward} className="promo-arrow" />
                        </button>
                    ) : (
                        <div className="promo-input-container">
                            <input
                                type="text"
                                placeholder="Enter promo code"
                                value={promoCode}
                                onChange={e => setPromoCode(e.target.value)}
                                className="promo-input-field"
                                autoFocus
                            />
                            <button className="promo-apply-btn" onClick={() => setShowPromoInput(false)}>
                                APPLY
                            </button>
                        </div>
                    )}
                </div>

                {/* Payment Methods */}
                <div className="methods-section">
                    <h3 className="section-title">Payment Methods</h3>
                    <p className="section-subtitle">Select how you'd like to pay</p>

                    <div className="methods-list">
                        {/* UPI */}
                        <div
                            className={`method-card ${selectedMethod === 'upi' ? 'selected' : ''}`}
                            onClick={() => setSelectedMethod('upi')}
                        >
                            <div className="method-left">
                                <div className="method-icon">
                                    <IonIcon icon={phonePortraitOutline} />
                                </div>
                                <div className="method-info">
                                    <span className="method-name">UPI</span>
                                    <span className="method-desc">Google Pay, PhonePe, Paytm</span>
                                </div>
                            </div>
                            <div className="radio-circle">
                                {selectedMethod === 'upi' && <div className="radio-inner" />}
                            </div>
                        </div>

                        {/* Card */}
                        <div
                            className={`method-card ${selectedMethod === 'card' ? 'selected' : ''}`}
                            onClick={() => {
                                setSelectedMethod('card')
                                setShowCardModal(true)
                            }}
                        >
                            <div className="method-left">
                                <div className="method-icon">
                                    <IonIcon icon={cardOutline} />
                                </div>
                                <div className="method-info">
                                    <span className="method-name">Credit / Debit Card</span>
                                    <span className="method-desc">Visa, Mastercard</span>
                                </div>
                            </div>
                            <div className="radio-circle">
                                {selectedMethod === 'card' && <div className="radio-inner" />}
                            </div>
                        </div>

                        {/* Pay with Cash */}
                        <div
                            className={`method-card ${selectedMethod === 'cash' ? 'selected' : ''}`}
                            onClick={() => setSelectedMethod('cash')}
                        >
                            <div className="method-left">
                                <div className="method-icon">
                                    <IonIcon icon={cashOutline} />
                                </div>
                                <div className="method-info">
                                    <span className="method-name">Pay with Cash</span>
                                    <span className="method-desc">Pay cash at the table</span>
                                </div>
                            </div>
                            <div className="radio-circle">
                                {selectedMethod === 'cash' && <div className="radio-inner" />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tip Section */}
                <div className="tip-section">
                    <div className="tip-header">
                        <div className="tip-icon-circle">
                            <span>☺</span>
                        </div>
                        <div className="tip-info">
                            <h3 className="tip-title">Show Some Love!</h3>
                            <p className="tip-subtitle">A little tip goes a long way for our staff.</p>
                        </div>
                    </div>

                    <div className="tip-options">
                        {[20, 30, 50].map(amount => (
                            <button
                                key={amount}
                                className={`tip-option ${tipAmount === amount ? 'selected' : ''}`}
                                onClick={() => {
                                    setTipAmount(amount === tipAmount ? null : amount)
                                    setCustomTip('')
                                }}
                            >
                                ₹{amount}
                            </button>
                        ))}
                    </div>

                    <div className="custom-tip-input">
                        <span className="currency-symbol">₹</span>
                        <input
                            type="number"
                            placeholder="Other amount"
                            value={customTip}
                            onChange={(e) => {
                                setCustomTip(e.target.value)
                                setTipAmount(null)
                            }}
                        />
                    </div>
                </div>

                {/* Security Badge */}
                <div className="security-badge">
                    <IonIcon icon={lockClosed} />
                    <span>100% SECURE PAYMENT</span>
                </div>

                {/* Bottom Spacer */}
                <div className="payment-spacer" />

            </IonContent>

            {/* Pay Button */}
            <div className="pay-container">
                <button className="pay-total-btn" onClick={handlePay}>
                    <span>
                        {selectedMethod === 'cash' ? 'Place Cash Request' : `Pay ₹${finalTotal}`}
                    </span>
                    <IonIcon icon={chevronForward} />
                </button>
            </div>

            {/* Card Modal Overlay */}
            {showCardModal && (
                <div className="modal-overlay">
                    <div className="card-modal">
                        <div className="modal-header">
                            <h3>Enter Card Details</h3>
                            <button className="close-btn" onClick={() => setShowCardModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <label>Card Number</label>
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    value={cardDetails.number}
                                    onChange={e => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                                />
                            </div>
                            <div className="input-row">
                                <div className="input-group">
                                    <label>Expiry</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        value={cardDetails.expiry}
                                        onChange={e => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        maxLength={3}
                                        value={cardDetails.cvv}
                                        onChange={e => {
                                            const v = e.target.value.replace(/[^0-9]/g, '')
                                            setCardDetails({ ...cardDetails, cvv: v })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Cardholder Name</label>
                                <input
                                    type="text"
                                    placeholder="Name on card"
                                    value={cardDetails.name}
                                    onChange={e => setCardDetails({ ...cardDetails, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <button className="modal-pay-btn" onClick={processCardPayment}>
                            Pay ₹{finalTotal}
                        </button>
                    </div>
                </div>
            )}

            {/* Success Modal Overlay */}
            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="success-modal">
                        <div className="success-icon-circle">
                            <IonIcon icon={checkmarkCircle} />
                        </div>
                        <h2 className="success-title">Success!</h2>
                        <p className="success-message">{successMessage}</p>

                        {!isFeedbackSubmitted ? (
                            <>
                                <button className="success-btn btn-secondary" onClick={handleDownloadBill}>
                                    Download Bill
                                </button>

                                <button className="success-btn btn-primary" onClick={() => { setShowSuccessModal(false); setShowRatingModal(true); }}>
                                    Give Rating
                                </button>
                            </>
                        ) : (
                            <button className="success-btn btn-primary" onClick={() => { setShowSuccessModal(false); history.push('/app/home'); }}>
                                Go to Home
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Rating Modal Overlay */}
            {showRatingModal && (
                <div className="modal-overlay">
                    <div className="rating-modal">
                        <button className="close-btn rating-close" onClick={() => { setShowRatingModal(false); history.push('/app/home'); }}>×</button>
                        <h2 className="rating-header">Rate Order</h2>

                        <h3 className="rating-question">Enjoyed your meal?</h3>
                        <p className="rating-order-id">Order #{Math.floor(Math.random() * 9000) + 1000} • Completed just now</p>

                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    className={`star ${rating >= star ? 'filled' : ''}`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <p className="rating-label">
                            {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Great' : rating === 5 ? 'Excellent' : 'Tap to rate'}
                        </p>

                        <p className="feedback-question">What went well?</p>
                        <div className="feedback-tags">
                            {feedbackTags.map(tag => (
                                <button
                                    key={tag}
                                    className={`feedback-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                    onClick={() => {
                                        if (selectedTags.includes(tag)) {
                                            setSelectedTags(selectedTags.filter(t => t !== tag))
                                        } else {
                                            setSelectedTags([...selectedTags, tag])
                                        }
                                    }}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        <textarea
                            className="feedback-note"
                            placeholder="Leave a note for the chef (Optional)"
                            value={feedbackNote}
                            onChange={e => setFeedbackNote(e.target.value)}
                        />

                        <button className="submit-feedback-btn" onClick={() => {
                            if (rating === 0) {
                                setErrorMessage('Please select a star rating to submit.')
                                setShowErrorModal(true)
                                return
                            }
                            // Simulate submission
                            console.log('Feedback submitted:', { rating, selectedTags, feedbackNote })
                            setShowRatingModal(false)
                            setSuccessMessage('Thank you for your feedback!')
                            setIsFeedbackSubmitted(true)
                            setShowSuccessModal(true)
                        }}>
                            Submit Feedback
                        </button>
                    </div>
                </div>
            )}

            {/* Error Modal Overlay */}
            {showErrorModal && (
                <div className="modal-overlay">
                    <div className="success-modal error-modal-container">
                        <div className="success-icon-circle error-icon-bg">
                            <span>!</span>
                        </div>
                        <h2 className="success-title">Invalid Format</h2>
                        <p className="success-message">{errorMessage}</p>
                        <button className="success-btn error-btn" onClick={handleErrorDismiss}>
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </IonPage>
    )
}

export default PaymentPage

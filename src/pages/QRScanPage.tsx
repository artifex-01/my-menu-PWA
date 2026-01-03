import React, { useEffect, useRef, useState } from 'react'
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonIcon,
    IonAlert,
    IonSpinner
} from '@ionic/react'
import { flashlight, flashlightOutline, imageOutline, checkmarkCircle, closeCircle } from 'ionicons/icons'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { useHistory } from 'react-router-dom'
import './QRScanPage.css'

interface ScanResult {
    success: boolean
    message: string
    restaurantId?: string
    tableNumber?: string
}

const QRScanPage: React.FC = () => {
    const history = useHistory()
    const [isScanning, setIsScanning] = useState(false)
    const [flashOn, setFlashOn] = useState(false)
    const [scanResult, setScanResult] = useState<ScanResult | null>(null)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [cameraError, setCameraError] = useState<string | null>(null)
    const [isInitializing, setIsInitializing] = useState(true)

    const scannerRef = useRef<Html5Qrcode | null>(null)
    const scannerContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        startScanner()

        return () => {
            stopScanner()
        }
    }, [])

    const startScanner = async () => {
        setIsInitializing(true)
        setCameraError(null)

        try {
            // Create scanner instance
            scannerRef.current = new Html5Qrcode('qr-reader', {
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                verbose: false
            })

            // Get available cameras
            const cameras = await Html5Qrcode.getCameras()

            if (cameras && cameras.length > 0) {
                // Prefer back camera
                const backCamera = cameras.find(c =>
                    c.label.toLowerCase().includes('back') ||
                    c.label.toLowerCase().includes('rear') ||
                    c.label.toLowerCase().includes('environment')
                )
                const cameraId = backCamera ? backCamera.id : cameras[0].id

                await scannerRef.current.start(
                    cameraId,
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1
                    },
                    onScanSuccess,
                    onScanFailure
                )

                setIsScanning(true)
                setIsInitializing(false)
            } else {
                throw new Error('No cameras found on this device')
            }
        } catch (err: any) {
            console.error('Camera error:', err)
            setIsInitializing(false)

            if (err.message?.includes('Permission denied') || err.name === 'NotAllowedError') {
                setCameraError('Camera permission denied. Please allow camera access to scan QR codes.')
            } else if (err.message?.includes('No cameras')) {
                setCameraError('No camera found on this device.')
            } else {
                setCameraError('Unable to access camera. Please check permissions and try again.')
            }
        }
    }

    const stopScanner = async () => {
        if (scannerRef.current && isScanning) {
            try {
                await scannerRef.current.stop()
                setIsScanning(false)
            } catch (err) {
                console.error('Error stopping scanner:', err)
            }
        }
    }

    const onScanSuccess = (decodedText: string, _decodedResult: any) => {
        // Parse the QR code data
        const result = parseQRCode(decodedText)
        setScanResult(result)

        // Vibrate if supported
        if ('vibrate' in navigator) {
            navigator.vibrate(200)
        }

        // Stop scanning after successful scan
        stopScanner()

        if (result.success && result.restaurantId) {
            // Navigate to restaurant with table info
            setTimeout(() => {
                history.push(`/restaurant/${result.restaurantId}`, {
                    tableNumber: result.tableNumber,
                    fromQR: true
                })
            }, 1500)
        } else {
            // Show error alert
            setAlertMessage(result.message)
            setShowAlert(true)
        }
    }

    const onScanFailure = (_error: string) => {
        // Silent failure - don't show errors for failed scans
        // This gets called frequently when no QR is in view
    }

    const parseQRCode = (data: string): ScanResult => {
        try {
            // Try to parse as JSON (expected format)
            const qrData = JSON.parse(data)

            if (qrData.restaurantId) {
                return {
                    success: true,
                    message: 'QR Code scanned successfully!',
                    restaurantId: qrData.restaurantId,
                    tableNumber: qrData.tableNumber || qrData.table
                }
            }
        } catch {
            // Not JSON, try URL parsing
            try {
                const url = new URL(data)
                const restaurantId = url.searchParams.get('restaurant') || url.pathname.split('/').pop()
                const tableNumber = url.searchParams.get('table')

                if (restaurantId) {
                    return {
                        success: true,
                        message: 'QR Code scanned successfully!',
                        restaurantId,
                        tableNumber: tableNumber || undefined
                    }
                }
            } catch {
                // Not a valid URL either
            }
        }

        // For demo: Accept any QR and navigate to a sample restaurant
        if (data && data.length > 0) {
            return {
                success: true,
                message: 'QR Code scanned! Opening menu...',
                restaurantId: '1', // Demo restaurant ID
                tableNumber: 'A1'
            }
        }

        return {
            success: false,
            message: 'Invalid QR code. Please scan a valid restaurant table QR code.'
        }
    }

    const toggleFlash = async () => {
        if (scannerRef.current && isScanning) {
            try {
                // const track = scannerRef.current.getRunningTrackSettings()
                // Check if torch is supported
                const capabilities = scannerRef.current.getRunningTrackCameraCapabilities()
                if (capabilities.torchFeature().isSupported()) {
                    await capabilities.torchFeature().apply(!flashOn)
                    setFlashOn(!flashOn)
                } else {
                    setAlertMessage('Flashlight is not supported on this device')
                    setShowAlert(true)
                }
            } catch (err) {
                console.error('Flash toggle error:', err)
                setAlertMessage('Unable to toggle flashlight')
                setShowAlert(true)
            }
        }
    }

    const handleGalleryUpload = async () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'

        input.onchange = async (e: any) => {
            const file = e.target.files?.[0]
            if (file && scannerRef.current) {
                try {
                    // Stop live scanning temporarily
                    if (isScanning) {
                        await stopScanner()
                    }

                    // Scan from file
                    const result = await scannerRef.current.scanFile(file, true)
                    onScanSuccess(result, null)
                } catch (err: any) {
                    console.error('File scan error:', err)
                    setAlertMessage('No QR code found in the selected image')
                    setShowAlert(true)
                    // Restart scanner
                    startScanner()
                }
            }
        }

        input.click()
    }

    const handleRetry = () => {
        setScanResult(null)
        startScanner()
    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/app/home" text="" />
                    </IonButtons>
                    <IonTitle>Scan QR Code</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="qr-scan-content">
                <div className="scan-container">
                    {/* Instructions */}
                    <p className="scan-instructions">
                        Point your camera at the QR code on the table to view the menu
                    </p>

                    {/* Scanner Container */}
                    <div className="scanner-wrapper">
                        <div className="scanner-frame" ref={scannerContainerRef}>
                            {/* QR Reader Container */}
                            <div id="qr-reader" className="qr-reader-container"></div>

                            {/* Scanner Overlay */}
                            <div className="scanner-overlay">
                                <div className="scanner-corners">
                                    <div className="corner top-left" />
                                    <div className="corner top-right" />
                                    <div className="corner bottom-left" />
                                    <div className="corner bottom-right" />
                                </div>
                                {isScanning && <div className="scanner-line" />}
                            </div>

                            {/* Loading State */}
                            {isInitializing && (
                                <div className="scanner-loading">
                                    <IonSpinner name="crescent" />
                                    <span>Initializing camera...</span>
                                </div>
                            )}

                            {/* Camera Error */}
                            {cameraError && (
                                <div className="scanner-error">
                                    <IonIcon icon={closeCircle} />
                                    <span>{cameraError}</span>
                                    <button className="retry-btn" onClick={startScanner}>
                                        Try Again
                                    </button>
                                </div>
                            )}

                            {/* Success State */}
                            {scanResult?.success && (
                                <div className="scan-success">
                                    <IonIcon icon={checkmarkCircle} className="success-icon" />
                                    <span>{scanResult.message}</span>
                                    {scanResult.tableNumber && (
                                        <span className="table-info">Table {scanResult.tableNumber}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="scan-actions">
                        <button
                            className={`action-button ${flashOn ? 'active' : ''}`}
                            onClick={toggleFlash}
                            disabled={!isScanning}
                        >
                            <IonIcon icon={flashOn ? flashlight : flashlightOutline} />
                            <span>Flashlight</span>
                        </button>
                        <button
                            className="action-button"
                            onClick={handleGalleryUpload}
                        >
                            <IonIcon icon={imageOutline} />
                            <span>Gallery</span>
                        </button>
                    </div>

                    {/* Help Text */}
                    <p className="help-text">
                        Make sure the QR code is within the frame and well-lit
                    </p>

                    {/* Retry Button (shown after failed scan) */}
                    {scanResult && !scanResult.success && (
                        <button className="retry-scan-btn" onClick={handleRetry}>
                            Scan Again
                        </button>
                    )}
                </div>

                {/* Alert for errors */}
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Scan Error"
                    message={alertMessage}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    )
}

export default QRScanPage

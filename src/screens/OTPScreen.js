import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';
import ScreenWrapper from '../components/ScreenWrapper';

const OTP_LENGTH = 4;

const OTPScreen = ({ navigation, route }) => {
    const phoneNumber = route?.params?.phoneNumber || '+91 9876543210';
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const [timer, setTimer] = useState(28);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const inputRefs = useRef([]);

    // Timer countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Auto focus first input
    useEffect(() => {
        const timeout = setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 300);
        return () => clearTimeout(timeout);
    }, []);

    // Format timer as MM:SS
    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (value, index) => {
        // Only allow numeric input
        const numericValue = value.replace(/[^0-9]/g, '').slice(-1);

        const newOtp = [...otp];
        newOtp[index] = numericValue;
        setOtp(newOtp);

        // Auto-focus next input
        if (numericValue && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
            setFocusedIndex(index + 1);
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setFocusedIndex(index - 1);
        }
    };

    const handleFocus = (index) => {
        setFocusedIndex(index);
    };

    const handleVerify = () => {
        const otpValue = otp.join('');
        if (otpValue.length === OTP_LENGTH) {
            navigation.navigate('Main');
        }
    };

    const handleResend = () => {
        setTimer(28);
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
        setFocusedIndex(0);
    };

    const isComplete = otp.every(digit => digit !== '');

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScreenWrapper
                scroll={true}
                backgroundColor={colors.background}
                style={styles.screenWrapper}
                contentContainerStyle={styles.scrollContent}
            >
                <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

                {/* Header with Back Button */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Main Content */}
                <View style={styles.content}>
                    {/* Title */}
                    <Text style={styles.title}>Verify Phone</Text>

                    {/* Subtitle with Phone Number */}
                    <Text style={styles.subtitle}>Enter the code sent to</Text>
                    <Text style={styles.phoneNumber}>{phoneNumber}</Text>

                    {/* OTP Input Boxes */}
                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <View key={index} style={styles.otpInputWrapper}>
                                <TextInput
                                    ref={ref => inputRefs.current[index] = ref}
                                    style={styles.otpInput}
                                    value={digit}
                                    onChangeText={(value) => handleOtpChange(value, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    onFocus={() => handleFocus(index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    selectTextOnFocus
                                    contextMenuHidden
                                />
                                <View style={[
                                    styles.otpUnderline,
                                    digit && styles.otpUnderlineFilled,
                                    focusedIndex === index && styles.otpUnderlineFocused,
                                ]} />
                            </View>
                        ))}
                    </View>

                    {/* Resend Timer */}
                    <View style={styles.resendContainer}>
                        {timer > 0 ? (
                            <Text style={styles.timerText}>
                                Resend code in{' '}
                                <Text style={styles.timerValue}>{formatTimer(timer)}</Text>
                            </Text>
                        ) : (
                            <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                                <Text style={styles.resendText}>Resend Code</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    {/* Verify Button */}
                    <TouchableOpacity
                        style={[
                            styles.verifyButton,
                            !isComplete && styles.verifyButtonDisabled
                        ]}
                        onPress={handleVerify}
                        activeOpacity={0.9}
                        disabled={!isComplete}
                    >
                        <Text style={[
                            styles.verifyButtonText,
                            !isComplete && styles.verifyButtonTextDisabled
                        ]}>
                            Verify
                        </Text>
                    </TouchableOpacity>

                    {/* Change Phone Number */}
                    <TouchableOpacity
                        style={styles.changeNumberButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.changeNumberLabel}>Wrong number? </Text>
                        <Text style={styles.changeNumberLink}>Change Phone Number</Text>
                    </TouchableOpacity>
                </View>
            </ScreenWrapper>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    screenWrapper: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.md,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.textPrimary,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    phoneNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
        textAlign: 'center',
        marginTop: spacing.xs,
        marginBottom: spacing.xxxl,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.lg,
        marginBottom: spacing.xl,
    },
    otpInputWrapper: {
        alignItems: 'center',
    },
    otpInput: {
        width: 48,
        height: 56,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '600',
        color: colors.textPrimary,
        backgroundColor: 'transparent',
    },
    otpUnderline: {
        width: 48,
        height: 3,
        backgroundColor: colors.border,
        borderRadius: 2,
        marginTop: -4,
    },
    otpUnderlineFilled: {
        backgroundColor: colors.textPrimary,
    },
    otpUnderlineFocused: {
        backgroundColor: colors.primary,
    },
    resendContainer: {
        alignItems: 'center',
        marginTop: spacing.md,
    },
    timerText: {
        ...typography.body,
        color: colors.textSecondary,
    },
    timerValue: {
        fontWeight: '600',
        color: colors.primary,
    },
    resendText: {
        ...typography.bodyMedium,
        color: colors.primary,
    },
    bottomSection: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xl,
        marginTop: 'auto', // Pushes to bottom if flex space available
    },
    verifyButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: 16,
        alignItems: 'center',
        ...shadows.md,
    },
    verifyButtonDisabled: {
        backgroundColor: colors.primary,
        opacity: 0.5,
    },
    verifyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textLight,
    },
    verifyButtonTextDisabled: {
        color: colors.textLight,
    },
    changeNumberButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.lg,
        paddingVertical: spacing.md,
    },
    changeNumberLabel: {
        ...typography.body,
        color: colors.textSecondary,
    },
    changeNumberLink: {
        ...typography.bodyMedium,
        color: colors.primary,
    },
});

export default OTPScreen;

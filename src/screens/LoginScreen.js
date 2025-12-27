import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Animated,
    Keyboard
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';
import ScreenWrapper from '../components/ScreenWrapper';

const LoginScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showError, setShowError] = useState(false);
    const inputRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const isValidPhone = phoneNumber.length === 10;

    // Fade in animation on mount
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();

        // Auto focus on phone input
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    // Handle phone number input - only allow numeric, max 10 digits
    const handlePhoneChange = (text) => {
        // Remove any non-numeric characters
        const numericOnly = text.replace(/[^0-9]/g, '');

        // Limit to 10 digits
        const limitedNumber = numericOnly.slice(0, 10);

        setPhoneNumber(limitedNumber);

        // Show error only if user has started typing but hasn't completed
        if (limitedNumber.length > 0 && limitedNumber.length < 10) {
            setShowError(true);
        } else {
            setShowError(false);
        }
    };

    const handleContinueWithPhone = () => {
        if (isValidPhone) {
            navigation.navigate('OTP', { phoneNumber: `+91 ${phoneNumber}` });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
        >
            <ScreenWrapper
                scroll={true}
                backgroundColor={colors.background}
                contentContainerStyle={styles.scrollContent}
            >
                <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <MaterialCommunityIcons
                                name="silverware-fork-knife"
                                size={48}
                                color={colors.primary}
                            />
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>Discover & Dine</Text>
                    <Text style={styles.subtitle}>
                        Find nearby favorites, scan menus,{'\n'}and read reviews.
                    </Text>

                    {/* Phone Input */}
                    <View style={styles.inputSection}>
                        <Text style={styles.inputLabel}>MOBILE NUMBER</Text>
                        <View style={styles.phoneInputContainer}>
                            {/* Fixed Country Code - Not Editable */}
                            <View style={styles.countryCodeBox}>
                                <Text style={styles.flagEmoji}>🇮🇳</Text>
                                <Text style={styles.countryCode}>+91</Text>
                            </View>

                            {/* Phone Number Input */}
                            <View style={[
                                styles.phoneInputWrapper,
                                showError && styles.phoneInputError
                            ]}>
                                <TextInput
                                    ref={inputRef}
                                    style={styles.phoneInput}
                                    value={phoneNumber}
                                    onChangeText={handlePhoneChange}
                                    placeholder="Enter mobile number"
                                    placeholderTextColor={colors.textMuted}
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    contextMenuHidden={true}
                                    selectTextOnFocus={false}
                                />
                            </View>
                        </View>

                        {/* Validation Error */}
                        {showError && (
                            <View style={styles.errorContainer}>
                                <Ionicons name="alert-circle" size={14} color={colors.error} />
                                <Text style={styles.errorText}>
                                    Enter a valid 10-digit mobile number
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Continue with Phone Button */}
                    <TouchableOpacity
                        style={[
                            styles.primaryButton,
                            !isValidPhone && styles.primaryButtonDisabled
                        ]}
                        onPress={handleContinueWithPhone}
                        activeOpacity={0.9}
                        disabled={!isValidPhone}
                    >
                        <Text style={[
                            styles.primaryButtonText,
                            !isValidPhone && styles.primaryButtonTextDisabled
                        ]}>
                            Continue with Phone
                        </Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Or connect with</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Continue with Google */}
                    <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
                        <View style={styles.googleIconContainer}>
                            <Text style={styles.googleG}>G</Text>
                        </View>
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </TouchableOpacity>

                    {/* Continue as Guest */}
                    <TouchableOpacity
                        style={styles.guestButton}
                        onPress={() => navigation.navigate('Main')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.guestButtonText}>Continue as Guest</Text>
                        <Ionicons name="arrow-forward" size={18} color={colors.primary} />
                    </TouchableOpacity>
                </Animated.View>
            </ScreenWrapper>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: spacing.xl,
    },
    content: {
        paddingHorizontal: spacing.xl,
        width: '100%',
        maxWidth: 500, // Tablet optimization
        alignSelf: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: borderRadius.xl,
        backgroundColor: colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.md,
    },
    title: {
        ...typography.h1,
        color: colors.textPrimary,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: spacing.xxxl,
    },
    inputSection: {
        marginBottom: spacing.xl,
    },
    inputLabel: {
        ...typography.small,
        color: colors.textSecondary,
        letterSpacing: 0.5,
        marginBottom: spacing.sm,
        fontWeight: '500',
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCodeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        marginRight: spacing.sm,
        height: 52,
    },
    flagEmoji: {
        fontSize: 18,
        marginRight: spacing.xs,
    },
    countryCode: {
        ...typography.body,
        color: colors.textPrimary,
        fontWeight: '500',
    },
    phoneInputWrapper: {
        flex: 1,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        height: 52,
        justifyContent: 'center',
    },
    phoneInputError: {
        borderColor: colors.error,
    },
    phoneInput: {
        ...typography.body,
        color: colors.textPrimary,
        fontSize: 16,
        letterSpacing: 0.5,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    errorText: {
        ...typography.caption,
        color: colors.error,
        marginLeft: spacing.xs,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: 16,
        alignItems: 'center',
        ...shadows.md,
    },
    primaryButtonDisabled: {
        backgroundColor: '#E5E7EB',
        shadowOpacity: 0,
        elevation: 0,
    },
    primaryButtonText: {
        ...typography.bodyMedium,
        color: colors.textLight,
        fontSize: 16,
        fontWeight: '600',
    },
    primaryButtonTextDisabled: {
        color: '#9CA3AF',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.xl,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        ...typography.caption,
        color: colors.textMuted,
        marginHorizontal: spacing.md,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.lg,
        paddingVertical: 14,
    },
    googleIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    googleG: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4285F4',
    },
    googleButtonText: {
        ...typography.bodyMedium,
        color: colors.textPrimary,
        fontSize: 15,
    },
    guestButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xl,
        paddingVertical: spacing.md,
    },
    guestButtonText: {
        ...typography.bodyMedium,
        color: colors.primary,
        marginRight: spacing.xs,
        fontSize: 15,
    },
});

export default LoginScreen;

// Global color palette for the food discovery app
export const colors = {
    // Primary colors
    primary: '#FF8A00',
    primaryDark: '#E67A00',
    primaryLight: '#FFB84D',

    // Gradient colors for QR card
    gradientStart: '#FF9B45',
    gradientEnd: '#FF7A00',

    // Background colors
    background: '#F8F6F3',
    backgroundDark: '#F5F5F5',
    card: '#FFFFFF',
    cardHover: '#FFF8F0',

    // Text colors
    textPrimary: '#1A1A2E',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    textLight: '#FFFFFF',

    // Status colors
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',

    // Rating colors
    ratingGold: '#FFB800',
    ratingBackground: '#FFF8E7',

    // Special colors
    vegGreen: '#22C55E',
    nonVegRed: '#EF4444',
    freeDelivery: '#10B981',
    discount: '#EF4444',

    // Border & Shadow
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    shadow: 'rgba(0, 0, 0, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 999,
};

export const typography = {
    h1: {
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 34,
    },
    h2: {
        fontSize: 22,
        fontWeight: '600',
        lineHeight: 28,
    },
    h3: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    body: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    bodyMedium: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    small: {
        fontSize: 10,
        fontWeight: '500',
        lineHeight: 14,
    },
};

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
};

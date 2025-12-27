import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';

const FilterPill = ({
    label,
    isActive = false,
    onPress,
    icon,
    hasToggle = false,
    toggleValue = false,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.pill,
                isActive && styles.pillActive,
                hasToggle && styles.pillWithToggle,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
            {hasToggle && (
                <View style={[styles.toggle, toggleValue && styles.toggleActive]}>
                    <View style={[styles.toggleDot, toggleValue && styles.toggleDotActive]} />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: 10,
        backgroundColor: colors.card,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.borderLight,
        marginRight: spacing.sm,
        ...shadows.sm,
    },
    pillActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    pillWithToggle: {
        paddingRight: spacing.sm,
    },
    iconContainer: {
        marginRight: spacing.xs,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.textPrimary,
    },
    labelActive: {
        color: colors.textLight,
    },
    toggle: {
        width: 36,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.border,
        marginLeft: spacing.sm,
        padding: 2,
        justifyContent: 'center',
    },
    toggleActive: {
        backgroundColor: colors.vegGreen,
    },
    toggleDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.card,
    },
    toggleDotActive: {
        transform: [{ translateX: 16 }],
    },
});

export default FilterPill;

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';

const MenuItemCard = ({
    item,
    onAdd,
    quantity = 0,
    onIncrement,
    onDecrement,
}) => {
    const { name, description, price, image, isVeg, customization } = item;

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    <Text style={styles.price}>${price.toFixed(2)}</Text>
                </View>
                {customization && (
                    <View style={styles.customizationRow}>
                        <View style={[styles.vegIndicator, { borderColor: isVeg ? colors.vegGreen : colors.nonVegRed }]}>
                            <View style={[styles.vegDot, { backgroundColor: isVeg ? colors.vegGreen : colors.nonVegRed }]} />
                        </View>
                        <Text style={styles.customization} numberOfLines={1}>{customization}</Text>
                    </View>
                )}
                {description && (
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                )}

                {quantity === 0 ? (
                    <TouchableOpacity style={styles.addButton} onPress={onAdd} activeOpacity={0.8}>
                        <Ionicons name="add" size={20} color={colors.primary} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={onDecrement}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.quantityButtonText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={onIncrement}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        ...shadows.sm,
        overflow: 'hidden',
    },
    imageContainer: {
        width: 100,
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        padding: spacing.md,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        ...typography.bodyMedium,
        color: colors.textPrimary,
        flex: 1,
        marginRight: spacing.sm,
    },
    price: {
        ...typography.bodyMedium,
        color: colors.textPrimary,
    },
    customizationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.xs,
    },
    vegIndicator: {
        width: 14,
        height: 14,
        borderWidth: 1.5,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    vegDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    customization: {
        ...typography.caption,
        color: colors.textSecondary,
        flex: 1,
    },
    description: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    addButton: {
        position: 'absolute',
        right: spacing.md,
        bottom: spacing.md,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.card,
        borderWidth: 1.5,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.sm,
    },
    quantityContainer: {
        position: 'absolute',
        right: spacing.md,
        bottom: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.sm,
        overflow: 'hidden',
    },
    quantityButton: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.backgroundDark,
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.primary,
    },
    quantityText: {
        width: 28,
        textAlign: 'center',
        ...typography.bodyMedium,
        color: colors.textPrimary,
    },
});

export default MenuItemCard;

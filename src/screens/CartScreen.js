import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';
import ScreenWrapper from '../components/ScreenWrapper';

// Mock cart data
const initialCartItems = [
    {
        id: '1',
        name: 'Classic Cheese Burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
        price: 12.50,
        quantity: 1,
        customization: 'Extra Cheese',
        isVeg: false,
    },
    {
        id: '2',
        name: 'Margherita Pizza',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200',
        price: 15.00,
        quantity: 2,
        customization: 'Medium, Thin Crust',
        isVeg: true,
    },
    {
        id: '3',
        name: 'Lemonade',
        image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200',
        price: 4.50,
        quantity: 1,
        customization: 'Iced',
        isVeg: true,
    },
];

const CartScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleIncrement = (itemId) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrement = (itemId) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const itemTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.00;
    const taxes = itemTotal * 0.075; // 7.5% tax
    const grandTotal = itemTotal + deliveryFee + taxes;

    return (
        <ScreenWrapper scroll={false} backgroundColor={colors.background}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Cart</Text>
                <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
                    <Ionicons name="ellipsis-horizontal" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 140 + insets.bottom }}
            >
                {/* Cart Items */}
                {cartItems.map((item) => (
                    <View key={item.id} style={styles.cartItem}>
                        <View style={styles.itemImageContainer}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                        </View>
                        <View style={styles.itemContent}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                            </View>
                            {item.customization && (
                                <View style={styles.customizationRow}>
                                    <View style={[styles.vegIndicator, { borderColor: item.isVeg ? colors.vegGreen : colors.nonVegRed }]}>
                                        <View style={[styles.vegDot, { backgroundColor: item.isVeg ? colors.vegGreen : colors.nonVegRed }]} />
                                    </View>
                                    <Text style={styles.customizationText}>{item.customization}</Text>
                                </View>
                            )}
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleDecrement(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.quantityButtonText}>−</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleIncrement(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Add More Items */}
                <TouchableOpacity style={styles.addMoreButton} activeOpacity={0.7}>
                    <Ionicons name="add-circle" size={20} color={colors.primary} />
                    <Text style={styles.addMoreText}>Add more items</Text>
                </TouchableOpacity>

                {/* Bill Summary */}
                <View style={styles.billSummaryCard}>
                    <Text style={styles.billSummaryTitle}>Bill Summary</Text>

                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Item Total</Text>
                        <Text style={styles.billValue}>${itemTotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Delivery Fee</Text>
                        <Text style={styles.billValue}>${deliveryFee.toFixed(2)}</Text>
                    </View>

                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Taxes</Text>
                        <Text style={styles.billValue}>${taxes.toFixed(2)}</Text>
                    </View>

                    <View style={[styles.billRow, styles.grandTotalRow]}>
                        <Text style={styles.grandTotalLabel}>Grand Total</Text>
                        <Text style={styles.grandTotalValue}>${grandTotal.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Order Button */}
            <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
                <TouchableOpacity style={styles.placeOrderButton} activeOpacity={0.9}>
                    <View style={styles.orderButtonLeft}>
                        <Text style={styles.totalLabel}>TOTAL</Text>
                        <Text style={styles.totalAmount}>${grandTotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.orderButtonRight}>
                        <Text style={styles.placeOrderText}>Place Order</Text>
                        <Ionicons name="arrow-forward" size={20} color={colors.textLight} />
                    </View>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        ...typography.h3,
        color: colors.textPrimary,
    },
    moreButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: spacing.lg,
        ...(Platform.OS === 'web' && { overflow: 'auto' }),
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        overflow: 'hidden',
        ...shadows.sm,
    },
    itemImageContainer: {
        width: 90,
        height: 90,
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    itemContent: {
        flex: 1,
        padding: spacing.md,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemName: {
        ...typography.bodyMedium,
        color: colors.textPrimary,
        flex: 1,
        marginRight: spacing.sm,
    },
    itemPrice: {
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
    customizationText: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: spacing.sm,
        backgroundColor: colors.backgroundDark,
        borderRadius: borderRadius.sm,
        overflow: 'hidden',
    },
    quantityButton: {
        width: 32,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.primary,
    },
    quantityText: {
        width: 32,
        textAlign: 'center',
        ...typography.bodyMedium,
        color: colors.textPrimary,
    },
    addMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
        borderRadius: borderRadius.md,
        backgroundColor: colors.card,
    },
    addMoreText: {
        ...typography.bodyMedium,
        color: colors.primary,
        marginLeft: spacing.sm,
    },
    billSummaryCard: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        ...shadows.sm,
    },
    billSummaryTitle: {
        ...typography.h3,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    billLabel: {
        ...typography.body,
        color: colors.textSecondary,
    },
    billValue: {
        ...typography.body,
        color: colors.textPrimary,
    },
    grandTotalRow: {
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        marginTop: spacing.sm,
        paddingTop: spacing.md,
    },
    grandTotalLabel: {
        ...typography.bodyMedium,
        color: colors.textPrimary,
    },
    grandTotalValue: {
        ...typography.h3,
        color: colors.primary,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.card,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        ...shadows.lg,
    },
    placeOrderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
    },
    orderButtonLeft: {
        alignItems: 'flex-start',
    },
    totalLabel: {
        ...typography.small,
        color: 'rgba(255, 255, 255, 0.8)',
        letterSpacing: 0.5,
    },
    totalAmount: {
        ...typography.h3,
        color: colors.textLight,
    },
    orderButtonRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeOrderText: {
        ...typography.bodyMedium,
        color: colors.textLight,
        marginRight: spacing.sm,
    },
});

export default CartScreen;

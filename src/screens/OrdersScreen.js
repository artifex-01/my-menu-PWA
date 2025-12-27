import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';
import ScreenWrapper from '../components/ScreenWrapper';

const orders = [
    {
        id: '1',
        restaurant: 'The Burger Joint',
        items: 3,
        total: 42.50,
        status: 'Delivered',
        date: 'Dec 24, 2025',
    },
    {
        id: '2',
        restaurant: 'Pizza Paradise',
        items: 2,
        total: 28.00,
        status: 'In Progress',
        date: 'Dec 25, 2025',
    },
    {
        id: '3',
        restaurant: 'Sushi Master',
        items: 4,
        total: 55.20,
        status: 'Delivered',
        date: 'Dec 20, 2025',
    },
];

const OrdersScreen = () => {
    const insets = useSafeAreaInsets();

    const renderOrder = ({ item }) => (
        <TouchableOpacity style={styles.orderCard} activeOpacity={0.8}>
            <View style={styles.orderHeader}>
                <Text style={styles.restaurantName}>{item.restaurant}</Text>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'Delivered' ? colors.success + '20' : colors.primary + '20' }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: item.status === 'Delivered' ? colors.success : colors.primary }
                    ]}>
                        {item.status}
                    </Text>
                </View>
            </View>
            <Text style={styles.orderDetails}>{item.items} items • ${item.total.toFixed(2)}</Text>
            <Text style={styles.orderDate}>{item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper scroll={false} backgroundColor={colors.background}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Orders</Text>
            </View>
            <FlatList
                data={orders}
                renderItem={renderOrder}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    padding: spacing.lg,
                    paddingBottom: 100 + insets.bottom
                }}
                showsVerticalScrollIndicator={false}
                style={styles.list}
            />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    headerTitle: {
        ...typography.h2,
        color: colors.textPrimary,
    },
    list: {
        flex: 1,
    },
    orderCard: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    restaurantName: {
        ...typography.bodyMedium,
        color: colors.textPrimary,
    },
    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    statusText: {
        ...typography.small,
        fontWeight: '600',
    },
    orderDetails: {
        ...typography.body,
        color: colors.textSecondary,
        marginTop: 4,
    },
    orderDate: {
        ...typography.caption,
        color: colors.textMuted,
        marginTop: 4,
    },
});

export default OrdersScreen;

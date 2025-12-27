import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import FilterPill from '../components/FilterPill';
import RestaurantCard from '../components/RestaurantCard';
import ScreenWrapper from '../components/ScreenWrapper';

// Mock data
const sponsoredRestaurants = [
    {
        id: '1',
        name: 'The Gourmet Kitchen',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
        cuisine: 'Italian • Pizza • Pasta',
        rating: 4.8,
        reviewCount: '1.2k',
        eta: '25-30 min',
        freeDelivery: true,
    },
    {
        id: '2',
        name: 'Urban Spice',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
        cuisine: 'Indian • Curry • Biryani',
        rating: 4.5,
        reviewCount: '890',
        eta: '35-40 min',
        freeDelivery: false,
    },
    {
        id: '3',
        name: 'Sakura Japanese',
        image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400',
        cuisine: 'Japanese • Sushi • Ramen',
        rating: 4.7,
        reviewCount: '1.5k',
        eta: '30-35 min',
        freeDelivery: true,
    },
];

const nearbyRestaurants = [
    {
        id: '1',
        name: 'Green Bowl',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        cuisine: 'Salads • Healthy • Vegan',
        rating: 4.2,
        distance: '1.2 km',
        eta: '20m',
        offer: '50% OFF UP TO $5',
        isVeg: true,
    },
    {
        id: '2',
        name: 'Burger Bistro',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        cuisine: 'American • Fast Food',
        rating: 4.5,
        distance: '0.8 km',
        eta: '15m',
        freeDelivery: true,
    },
    {
        id: '3',
        name: 'Pizza Paradise',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
        cuisine: 'Italian • Pizza • Beverages',
        rating: 4.0,
        distance: '2.5 km',
        eta: '45m',
        minOrder: 'Min order: $10',
    },
];

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [vegMode, setVegMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleRestaurantPress = (restaurant) => {
        navigation.navigate('RestaurantDetail', { restaurant });
    };

    const handleQRPress = () => {
        navigation.navigate('QRScan');
    };

    return (
        <ScreenWrapper scroll={false} backgroundColor={colors.background}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header - Fixed */}
            <View style={styles.header}>
                <View style={styles.locationContainer}>
                    <Text style={styles.locationLabel}>CURRENT LOCATION</Text>
                    <TouchableOpacity style={styles.locationRow} activeOpacity={0.7}>
                        <Ionicons name="location" size={18} color={colors.primary} />
                        <Text style={styles.locationText}>New York, NY</Text>
                        <Ionicons name="chevron-down" size={18} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
                    <View style={styles.notificationIconContainer}>
                        <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
                    </View>
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
                keyboardShouldPersistTaps="handled"
            >
                {/* Search Bar */}
                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onFilterPress={() => { }}
                />

                {/* Quick Filters */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.filtersContainer}
                    contentContainerStyle={{ paddingHorizontal: spacing.lg }}
                >
                    <FilterPill
                        label="Veg Mode"
                        icon={<Ionicons name="leaf" size={14} color={vegMode ? colors.textLight : colors.vegGreen} />}
                        hasToggle
                        toggleValue={vegMode}
                        onPress={() => setVegMode(!vegMode)}
                    />
                    <FilterPill label="Sort by" onPress={() => { }} />
                    <FilterPill label="4.0+" onPress={() => { }} />
                </ScrollView>

                {/* Scan QR Card - Premium Gradient CTA */}
                <TouchableOpacity
                    style={styles.qrCardContainer}
                    activeOpacity={0.9}
                    onPress={handleQRPress}
                >
                    <LinearGradient
                        colors={[colors.gradientStart, colors.gradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.qrCard}
                    >
                        <View style={styles.qrIconContainer}>
                            <MaterialCommunityIcons name="qrcode-scan" size={28} color={colors.textLight} />
                        </View>
                        <View style={styles.qrTextContainer}>
                            <Text style={styles.qrTitle}>Scan Table QR</Text>
                            <Text style={styles.qrSubtitle}>Order & pay from your table</Text>
                        </View>
                        <View style={styles.qrArrowContainer}>
                            <Ionicons name="arrow-forward" size={20} color={colors.primary} />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Sponsored Section */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>Sponsored</Text>
                        <View style={styles.adBadge}>
                            <Text style={styles.adBadgeText}>AD</Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: spacing.lg }}
                >
                    {sponsoredRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            variant="sponsored"
                            onPress={() => handleRestaurantPress(restaurant)}
                        />
                    ))}
                </ScrollView>

                {/* Nearby Restaurants */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.seeAllText}>See all</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: spacing.lg }}>
                    {nearbyRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            variant="list"
                            onPress={() => handleRestaurantPress(restaurant)}
                        />
                    ))}
                </View>
            </ScrollView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        paddingTop: spacing.lg,
    },
    locationContainer: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: colors.textSecondary,
        letterSpacing: 0.8,
        marginBottom: 2,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
        marginLeft: spacing.xs,
        marginRight: spacing.xs,
    },
    notificationButton: {
        position: 'relative',
    },
    notificationIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.borderLight,
        ...shadows.sm,
    },
    notificationDot: {
        position: 'absolute',
        top: 8,
        right: 10,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.error,
        borderWidth: 2,
        borderColor: colors.card,
    },
    scrollView: {
        flex: 1,
        ...(Platform.OS === 'web' && { overflow: 'auto' }),
    },
    filtersContainer: {
        marginBottom: spacing.lg,
    },
    qrCardContainer: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.xl,
        borderRadius: borderRadius.xl,
        ...shadows.md,
    },
    qrCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        paddingVertical: spacing.xl,
    },
    qrIconContainer: {
        width: 52,
        height: 52,
        borderRadius: borderRadius.md,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrTextContainer: {
        flex: 1,
        marginLeft: spacing.md,
    },
    qrTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textLight,
    },
    qrSubtitle: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: 3,
    },
    qrArrowContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.textLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
        marginTop: spacing.lg,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    adBadge: {
        backgroundColor: colors.border,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        marginLeft: spacing.sm,
    },
    adBadgeText: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary,
    },
});

export default HomeScreen;

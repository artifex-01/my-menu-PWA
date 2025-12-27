import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import ScreenWrapper from '../components/ScreenWrapper';

// Mock data
const recentSearches = [
    { id: '1', text: "Joe's Pizza Place", type: 'restaurant', distance: '0.8 mi' },
    { id: '2', text: 'Japanese Cuisine', type: 'category' },
];

const cuisines = [
    { id: '1', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100' },
    { id: '2', name: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100' },
    { id: '3', name: 'Asian', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=100' },
    { id: '4', name: 'Mexican', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100' },
    { id: '5', name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100' },
    { id: '6', name: 'Dessert', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=100' },
    { id: '7', name: 'Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100' },
    { id: '8', name: 'Sushi', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100' },
];

const trendingNearby = [
    {
        id: '1',
        name: 'Burger King',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
        cuisine: 'American • Fast Food • $$',
        rating: 4.5,
        reviewCount: '1.2k reviews',
        eta: '20m',
    },
    {
        id: '2',
        name: 'Crispy Chicken',
        image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300',
        cuisine: 'Chicken • Fast Food • $',
        rating: 4.8,
        reviewCount: '850 reviews',
        eta: '15m',
    },
];

const SearchScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');

    const handleRestaurantPress = (restaurant) => {
        navigation.navigate('RestaurantDetail', { restaurant });
    };

    return (
        <ScreenWrapper scroll={false} backgroundColor={colors.background}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header - Fixed */}
            <View style={styles.header}>
                <Text style={styles.deliveringLabel}>DELIVERING TO</Text>
                <TouchableOpacity style={styles.locationRow} activeOpacity={0.7}>
                    <Ionicons name="location" size={16} color={colors.primary} />
                    <Text style={styles.locationText}>Home • 5th Avenue, NYC</Text>
                    <Ionicons name="chevron-down" size={16} color={colors.textPrimary} />
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
                    placeholder="Restaurants, cuisines, dishes..."
                    onFilterPress={() => { }}
                    autoFocus={false}
                />

                {/* Recent Searches */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Searches</Text>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.recentSearchesList}>
                    {recentSearches.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.recentSearchItem}
                            activeOpacity={0.7}
                        >
                            <View style={styles.recentSearchIcon}>
                                <Ionicons
                                    name={item.type === 'restaurant' ? 'time-outline' : 'search-outline'}
                                    size={18}
                                    color={colors.textSecondary}
                                />
                            </View>
                            <View style={styles.recentSearchContent}>
                                <Text style={styles.recentSearchText}>{item.text}</Text>
                                <Text style={styles.recentSearchSubtext}>
                                    {item.type === 'restaurant' ? `Restaurant • ${item.distance}` : 'Category'}
                                </Text>
                            </View>
                            <Ionicons name="arrow-up-outline" size={18} color={colors.textMuted} style={{ transform: [{ rotate: '45deg' }] }} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Browse by Cuisine */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Browse by Cuisine</Text>
                </View>
                <View style={styles.cuisineGrid}>
                    {cuisines.map((cuisine) => (
                        <TouchableOpacity
                            key={cuisine.id}
                            style={styles.cuisineItem}
                            activeOpacity={0.8}
                        >
                            <View style={styles.cuisineImageContainer}>
                                <Image source={{ uri: cuisine.image }} style={styles.cuisineImage} />
                            </View>
                            <Text style={styles.cuisineName}>{cuisine.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Trending Nearby */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Trending Nearby</Text>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: spacing.lg }}>
                    {trendingNearby.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            variant="trending"
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
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        paddingTop: spacing.lg,
    },
    deliveringLabel: {
        ...typography.small,
        color: colors.textSecondary,
        letterSpacing: 0.5,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    locationText: {
        ...typography.h3,
        color: colors.textPrimary,
        marginLeft: spacing.xs,
        marginRight: spacing.xs,
    },
    scrollView: {
        flex: 1,
        ...(Platform.OS === 'web' && { overflow: 'auto' }),
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
        marginTop: spacing.lg,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.textPrimary,
    },
    clearText: {
        ...typography.bodyMedium,
        color: colors.primary,
    },
    seeAllText: {
        ...typography.bodyMedium,
        color: colors.primary,
    },
    recentSearchesList: {
        paddingHorizontal: spacing.lg,
    },
    recentSearchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    recentSearchIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.backgroundDark,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    recentSearchContent: {
        flex: 1,
    },
    recentSearchText: {
        ...typography.bodyMedium,
        color: colors.textPrimary,
    },
    recentSearchSubtext: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: 2,
    },
    cuisineGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: spacing.lg,
        justifyContent: 'space-between',
    },
    cuisineItem: {
        width: '23%',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    cuisineImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.card,
        overflow: 'hidden',
        ...shadows.sm,
    },
    cuisineImage: {
        width: '100%',
        height: '100%',
    },
    cuisineName: {
        ...typography.caption,
        color: colors.textPrimary,
        marginTop: spacing.xs,
        textAlign: 'center',
    },
});

export default SearchScreen;

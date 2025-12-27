import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
    Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';
import ScreenWrapper from '../components/ScreenWrapper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data
const categories = ['Popular', 'Burgers', 'Sides', 'Drinks'];

const menuItems = [
    {
        id: '1',
        name: 'Signature Beef Burger',
        description: 'Juicy beef patty, cheddar cheese, lettuce, tomato, and...',
        price: 14.50,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
        category: 'Popular',
        isVeg: false,
    },
    {
        id: '2',
        name: 'Crispy French Fries',
        description: 'Golden crispy fries seasoned with sea salt and rosemary.',
        price: 5.00,
        image: 'https://images.unsplash.com/photo-1630384060421-cb20aeb80aab?w=300',
        category: 'Popular',
        isVeg: true,
    },
    {
        id: '3',
        name: 'Fresh Berry Smoothie',
        description: 'Mixed berries, banana, yogurt, and honey.',
        price: 7.50,
        image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300',
        category: 'Popular',
        isVeg: true,
    },
    {
        id: '4',
        name: 'Double Cheese Burger',
        description: 'Two beef patties with double cheese and special sauce.',
        price: 18.00,
        image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300',
        category: 'Burgers',
        isVeg: false,
    },
    {
        id: '5',
        name: 'Classic Cheeseburger',
        description: 'Single patty with American cheese, pickles, and sauce.',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300',
        category: 'Burgers',
        isVeg: false,
    },
    {
        id: '6',
        name: 'Onion Rings',
        description: 'Crispy battered onion rings with dipping sauce.',
        price: 4.50,
        image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300',
        category: 'Sides',
        isVeg: true,
    },
];

// Mock reviews data
const reviewFilters = ['All Reviews', 'Latest', 'With Photos', 'Highest Rated', 'Lowest Rated'];

const mockReviews = [
    {
        id: '1',
        name: 'Sarah Jenkins',
        initials: 'SJ',
        bgColor: '#DBEAFE', // blue-100
        textColor: '#2563EB', // blue-600
        rating: 5.0,
        timeAgo: '2 days ago',
        comment: 'Absolutely loved the Signature Beef Burger! The sauce is incredible. Definitely coming back for more. The service was also very quick and friendly.',
    },
    {
        id: '2',
        name: 'Mike Thompson',
        initials: 'MT',
        bgColor: '#D1FAE5', // green-100
        textColor: '#059669', // green-600
        rating: 4.0,
        timeAgo: '1 week ago',
        comment: 'Great food, but the wait time was a bit longer than expected during lunch hour. The fries were perfectly crispy though!',
    },
    {
        id: '3',
        name: 'Emily Roberts',
        initials: 'ER',
        bgColor: '#EDE9FE', // purple-100
        textColor: '#7C3AED', // purple-600
        rating: 5.0,
        timeAgo: '2 weeks ago',
        comment: 'Best burger place in the city! The berry smoothie is a must-try.',
    },
    {
        id: '4',
        name: 'David Kim',
        initials: 'DK',
        bgColor: '#FFEDD5', // orange-100
        textColor: '#EA580C', // orange-600
        rating: 3.0,
        timeAgo: '3 weeks ago',
        comment: 'It was okay, but I found the burger a bit too salty for my taste. Good atmosphere though.',
    },
];

const RestaurantDetailScreen = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const [activeCategory, setActiveCategory] = useState('Popular');
    const [activeTab, setActiveTab] = useState('MENU');
    const [activeReviewFilter, setActiveReviewFilter] = useState('All Reviews');
    const [cart, setCart] = useState({});

    const restaurant = route?.params?.restaurant || {
        name: 'The Burger Joint',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        address: '123 Culinary Ave, New York',
        cuisine: 'American, Fast Food',
        rating: 4.8,
        reviewCount: '1,248',
        eta: '20-30 min',
    };

    const filteredItems = menuItems.filter(item =>
        activeCategory === 'Popular' || item.category === activeCategory
    );

    const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
        const item = menuItems.find(i => i.id === id);
        return sum + (item?.price || 0) * qty;
    }, 0);

    const handleAddItem = (itemId) => {
        setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const handleIncrementItem = (itemId) => {
        setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const handleDecrementItem = (itemId) => {
        setCart(prev => {
            const newQty = (prev[itemId] || 0) - 1;
            if (newQty <= 0) {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [itemId]: newQty };
        });
    };

    const renderMenuItem = (item) => (
        <View key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemImageContainer}>
                <Image source={{ uri: item.image }} style={styles.menuItemImage} />
            </View>
            <View style={styles.menuItemContent}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDescription} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={styles.menuItemFooter}>
                    <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                    {!cart[item.id] ? (
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => handleAddItem(item.id)}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="add" size={20} color={colors.primary} />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.quantityControl}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => handleDecrementItem(item.id)}
                            >
                                <Text style={styles.quantityButtonText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{cart[item.id]}</Text>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => handleIncrementItem(item.id)}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );

    const renderReviewCard = (review) => (
        <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <View style={styles.reviewHeaderLeft}>
                    <View style={[styles.reviewAvatar, { backgroundColor: review.bgColor }]}>
                        <Text style={[styles.reviewAvatarText, { color: review.textColor }]}>
                            {review.initials}
                        </Text>
                    </View>
                    <View style={styles.reviewHeaderInfo}>
                        <Text style={styles.reviewerName}>{review.name}</Text>
                        <Text style={styles.reviewTime}>{review.timeAgo}</Text>
                    </View>
                </View>
                <View style={styles.reviewRatingBadge}>
                    <Text style={styles.reviewRatingText}>{review.rating.toFixed(1)}</Text>
                    <Ionicons name="star" size={12} color={colors.primary} style={{ marginLeft: 2 }} />
                </View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
    );

    // Reviews content component
    const ReviewsContent = () => (
        <View style={styles.reviewsContainer}>
            {/* Rating Summary Card */}
            <View style={styles.ratingSummaryCard}>
                <View style={styles.ratingSummaryContent}>
                    <View style={styles.ratingLeftSection}>
                        <View style={styles.ratingBigNumber}>
                            <Text style={styles.ratingBigText}>{restaurant.rating}</Text>
                            <Text style={styles.ratingOutOf}> / 5.0</Text>
                        </View>
                        <View style={styles.starsRow}>
                            <Ionicons name="star" size={18} color={colors.primary} />
                            <Ionicons name="star" size={18} color={colors.primary} />
                            <Ionicons name="star" size={18} color={colors.primary} />
                            <Ionicons name="star" size={18} color={colors.primary} />
                            <Ionicons name="star-half" size={18} color={colors.primary} />
                        </View>
                        <Text style={styles.basedOnText}>Based on {restaurant.reviewCount} reviews</Text>
                    </View>
                    <TouchableOpacity style={styles.writeReviewButton} activeOpacity={0.9}>
                        <Ionicons name="create-outline" size={16} color="#FFFFFF" />
                        <Text style={styles.writeReviewText}>Write a Review</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Review Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.reviewFiltersContainer}
            >
                {reviewFilters.map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        style={[
                            styles.reviewFilterPill,
                            activeReviewFilter === filter && styles.reviewFilterPillActive
                        ]}
                        onPress={() => setActiveReviewFilter(filter)}
                        activeOpacity={0.8}
                    >
                        <Text style={[
                            styles.reviewFilterText,
                            activeReviewFilter === filter && styles.reviewFilterTextActive
                        ]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Review Cards */}
            <View style={styles.reviewCardsContainer}>
                {mockReviews.map(renderReviewCard)}
            </View>
        </View>
    );

    // Header component
    const ListHeader = () => (
        <>
            {/* Cover Image */}
            <View style={styles.coverContainer}>
                <Image source={{ uri: restaurant.image }} style={styles.coverImage} />
                <View style={styles.coverGradient} />
            </View>

            {/* Restaurant Info Card */}
            <View style={styles.infoCard}>
                <View style={styles.infoCardHandle} />

                {/* Logo Badge */}
                <View style={styles.logoBadge}>
                    <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={colors.primary} />
                </View>

                <View style={styles.infoHeader}>
                    <View style={styles.infoHeaderLeft}>
                        <Text style={styles.restaurantName}>{restaurant.name}</Text>
                        <View style={styles.addressRow}>
                            <Ionicons name="location" size={16} color={colors.textSecondary} />
                            <Text style={styles.addressText}>{restaurant.address}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>CUISINE</Text>
                        <Text style={styles.metaValue}>{restaurant.cuisine}</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>RATING</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={16} color={colors.primary} />
                            <Text style={styles.ratingValueBold}>{restaurant.rating}</Text>
                            <Text style={styles.reviewCountMeta}>({restaurant.reviewCount})</Text>
                        </View>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>TIME</Text>
                        <Text style={styles.metaValue}>{restaurant.eta}</Text>
                    </View>
                </View>
            </View>

            {/* Sticky Tabs */}
            <View style={styles.tabsContainer}>
                {['MENU', 'REVIEWS', 'ABOUT'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={styles.tab}
                        onPress={() => setActiveTab(tab)}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === tab && styles.tabTextActive
                        ]}>
                            {tab}
                        </Text>
                        {activeTab === tab && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );

    // Menu content with categories and items
    const MenuContent = () => (
        <>
            {/* Category Pills */}
            <View style={styles.categoriesWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContent}
                    nestedScrollEnabled={true}
                >
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryPill,
                                activeCategory === category && styles.categoryPillActive
                            ]}
                            onPress={() => setActiveCategory(category)}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.categoryText,
                                activeCategory === category && styles.categoryTextActive
                            ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Menu Section Title */}
            <View style={styles.menuHeader}>
                <Text style={styles.menuSectionTitle}>Popular Items</Text>
            </View>

            {/* Menu Items */}
            {filteredItems.map(renderMenuItem)}
        </>
    );

    // About content
    const AboutContent = () => (
        <View style={styles.aboutContainer}>
            <Text style={styles.aboutTitle}>About {restaurant.name}</Text>
            <Text style={styles.aboutText}>
                Welcome to {restaurant.name}! We serve the finest American cuisine with a focus on quality ingredients and exceptional taste. Our signature burgers are made from 100% premium beef, and our fries are hand-cut and perfectly seasoned.
            </Text>
            <View style={styles.aboutSection}>
                <Text style={styles.aboutLabel}>Address</Text>
                <Text style={styles.aboutValue}>{restaurant.address}</Text>
            </View>
            <View style={styles.aboutSection}>
                <Text style={styles.aboutLabel}>Hours</Text>
                <Text style={styles.aboutValue}>Mon-Sun: 11:00 AM - 10:00 PM</Text>
            </View>
            <View style={styles.aboutSection}>
                <Text style={styles.aboutLabel}>Contact</Text>
                <Text style={styles.aboutValue}>+1 (555) 123-4567</Text>
            </View>
        </View>
    );

    return (
        <ScreenWrapper
            scroll={false}
            safeAreaTop={false}
            backgroundColor="#F8F7F5"
        >
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Fixed Header Buttons */}
            <View style={[styles.topButtons, { paddingTop: insets.top + spacing.sm }]}>
                <TouchableOpacity
                    style={styles.topButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}
                >
                    <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.topButtonsRight}>
                    <TouchableOpacity style={styles.topButton} activeOpacity={0.8}>
                        <Ionicons name="search" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topButton, { marginLeft: spacing.sm }]} activeOpacity={0.8}>
                        <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Scrollable Content */}
            <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                    paddingBottom: cartItemCount > 0 ? 120 : 50,
                }}
                style={styles.scrollView}
            >
                <ListHeader />

                {activeTab === 'MENU' && <MenuContent />}
                {activeTab === 'REVIEWS' && <ReviewsContent />}
                {activeTab === 'ABOUT' && <AboutContent />}
            </ScrollView>

            {/* Bottom Order Bar */}
            {cartItemCount > 0 && (
                <View style={[styles.orderBar, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
                    <TouchableOpacity
                        style={styles.orderBarContent}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('Cart', { cart, menuItems })}
                    >
                        <View style={styles.orderBarLeft}>
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
                            </View>
                            <Text style={styles.viewOrderText}>View Order</Text>
                        </View>
                        <Text style={styles.orderTotal}>${cartTotal.toFixed(2)}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7F5', // background-light
    },
    scrollView: {
        flex: 1,
    },
    coverContainer: {
        height: 256,
        position: 'relative',
    },
    coverImage: {
        width: '100%',
        height: '100%',
    },
    coverGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 96,
        backgroundColor: 'transparent',
        // Simulating gradient from black/60 to transparent
    },
    topButtons: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        zIndex: 10,
    },
    topButtonsRight: {
        flexDirection: 'row',
        gap: 12,
    },
    topButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoCard: {
        backgroundColor: '#F8F7F5',
        marginTop: -24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        position: 'relative',
    },
    infoCardHandle: {
        width: 48,
        height: 4,
        backgroundColor: '#D1D5DB',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: spacing.sm,
    },
    logoBadge: {
        position: 'absolute',
        top: -40,
        right: spacing.lg,
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
        paddingRight: 80,
    },
    infoHeaderLeft: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A', // slate-900
        lineHeight: 28,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 6,
    },
    addressText: {
        fontSize: 14,
        color: '#64748B', // slate-500
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: spacing.lg,
    },
    metaItem: {
        flex: 1,
    },
    metaDivider: {
        width: 1,
        height: 32,
        backgroundColor: '#E2E8F0', // slate-200
        marginHorizontal: spacing.md,
    },
    metaLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#94A3B8', // slate-400
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    metaValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#0F172A',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingValueBold: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    reviewCountMeta: {
        fontSize: 13,
        color: '#94A3B8',
    },
    // Tabs
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#F8F7F5',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        position: 'relative',
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B', // slate-500
    },
    tabTextActive: {
        color: colors.primary,
        fontWeight: '700',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
    // Menu styles
    categoriesWrapper: {
        backgroundColor: '#F8F7F5',
        paddingVertical: spacing.md,
    },
    categoriesContent: {
        paddingHorizontal: spacing.lg,
    },
    categoryPill: {
        paddingHorizontal: spacing.lg,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginRight: spacing.sm,
    },
    categoryPillActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#0F172A',
    },
    categoryTextActive: {
        color: '#FFFFFF',
    },
    menuHeader: {
        backgroundColor: '#F8F7F5',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
    },
    menuSectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: spacing.md,
    },
    menuItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: spacing.lg,
        borderRadius: 16,
        marginBottom: spacing.md,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    menuItemImageContainer: {
        width: 90,
        height: 90,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#F5F0E8',
    },
    menuItemImage: {
        width: '100%',
        height: '100%',
    },
    menuItemContent: {
        flex: 1,
        marginLeft: spacing.md,
        justifyContent: 'space-between',
    },
    menuItemName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    menuItemDescription: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 4,
        lineHeight: 16,
    },
    menuItemFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.sm,
    },
    menuItemPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        overflow: 'hidden',
    },
    quantityButton: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    quantityText: {
        width: 24,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    // Reviews styles
    reviewsContainer: {
        flex: 1,
    },
    ratingSummaryCard: {
        backgroundColor: '#FFFFFF',
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    ratingSummaryContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingLeftSection: {
        flex: 1,
    },
    ratingBigNumber: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    ratingBigText: {
        fontSize: 48,
        fontWeight: '700',
        color: '#0F172A',
        letterSpacing: -1,
    },
    ratingOutOf: {
        fontSize: 14,
        fontWeight: '400',
        color: '#94A3B8',
    },
    starsRow: {
        flexDirection: 'row',
        marginVertical: spacing.sm,
        gap: 2,
    },
    basedOnText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#64748B',
    },
    writeReviewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        gap: 8,
    },
    writeReviewText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    reviewFiltersContainer: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        gap: 12,
    },
    reviewFilterPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginRight: 0,
    },
    reviewFilterPillActive: {
        backgroundColor: '#0F172A', // slate-900
        borderColor: '#0F172A',
    },
    reviewFilterText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#475569', // slate-600
    },
    reviewFilterTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    reviewCardsContainer: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        gap: 16,
    },
    reviewCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        marginBottom: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    reviewHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    reviewAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewAvatarText: {
        fontSize: 13,
        fontWeight: '700',
    },
    reviewHeaderInfo: {
        justifyContent: 'center',
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    reviewTime: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2,
    },
    reviewRatingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F7F5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    reviewRatingText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.primary,
    },
    reviewComment: {
        fontSize: 14,
        color: '#475569', // slate-600
        lineHeight: 22,
    },
    // About styles
    aboutContainer: {
        backgroundColor: '#FFFFFF',
        padding: spacing.lg,
    },
    aboutTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: spacing.md,
    },
    aboutText: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 22,
        marginBottom: spacing.lg,
    },
    aboutSection: {
        marginBottom: spacing.md,
    },
    aboutLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#94A3B8',
        marginBottom: 4,
    },
    aboutValue: {
        fontSize: 14,
        color: '#0F172A',
    },
    // Order bar
    orderBar: {
        position: 'absolute',
        bottom: 0,
        left: spacing.lg,
        right: spacing.lg,
        zIndex: 30,
    },
    orderBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0F172A', // slate-900
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 12,
    },
    orderBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cartBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    viewOrderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

export default RestaurantDetailScreen;

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';

const RestaurantCard = ({
    restaurant,
    variant = 'list', // 'list' | 'sponsored' | 'trending'
    onPress
}) => {
    const {
        name,
        image,
        cuisine,
        rating,
        reviewCount,
        distance,
        eta,
        offer,
        freeDelivery,
        isVeg,
        priceRange,
        minOrder,
    } = restaurant;

    if (variant === 'sponsored') {
        return (
            <TouchableOpacity style={styles.sponsoredCard} onPress={onPress} activeOpacity={0.9}>
                <View style={styles.sponsoredImageWrapper}>
                    <View style={styles.sponsoredImageContainer}>
                        <Image source={{ uri: image }} style={styles.sponsoredImage} />
                    </View>
                    {/* Rating badge in top-right corner */}
                    <View style={styles.ratingBadgeTopRight}>
                        <Text style={styles.ratingText}>{rating}</Text>
                        <Ionicons name="star" size={10} color={colors.textLight} />
                        {reviewCount && <Text style={styles.reviewCount}>({reviewCount})</Text>}
                    </View>
                </View>
                <View style={styles.sponsoredContent}>
                    <Text style={styles.sponsoredName} numberOfLines={1}>{name}</Text>
                    <Text style={styles.cuisineText} numberOfLines={1}>{cuisine}</Text>
                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
                        <Text style={styles.infoText}>{eta}</Text>
                        {freeDelivery && (
                            <>
                                <Text style={styles.dot}>•</Text>
                                <Ionicons name="bicycle" size={12} color={colors.freeDelivery} />
                                <Text style={[styles.infoText, { color: colors.freeDelivery }]}>Free</Text>
                            </>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    if (variant === 'trending') {
        return (
            <TouchableOpacity style={styles.trendingCard} onPress={onPress} activeOpacity={0.9}>
                <View style={styles.trendingImageContainer}>
                    <Image source={{ uri: image }} style={styles.trendingImage} />
                    <View style={styles.etaBadge}>
                        <Text style={styles.etaBadgeText}>{eta}</Text>
                    </View>
                </View>
                <View style={styles.trendingContent}>
                    <Text style={styles.trendingName} numberOfLines={1}>{name}</Text>
                    <Text style={styles.cuisineText} numberOfLines={1}>
                        {cuisine} {priceRange && `• ${priceRange}`}
                    </Text>
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={12} color={colors.ratingGold} />
                        <Text style={styles.ratingValue}>{rating}</Text>
                        {reviewCount && <Text style={styles.reviewCountSmall}>({reviewCount} reviews)</Text>}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    // Default list variant - redesigned to match reference
    return (
        <TouchableOpacity style={styles.listCard} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.listImageContainer}>
                <Image source={{ uri: image }} style={styles.listImage} />
                {isVeg && (
                    <View style={styles.vegBadge}>
                        <Text style={styles.vegBadgeText}>Pure Veg</Text>
                    </View>
                )}
            </View>
            <View style={styles.listContent}>
                <View style={styles.listHeader}>
                    <Text style={styles.listName} numberOfLines={1}>{name}</Text>
                    <View style={styles.ratingPill}>
                        <Text style={styles.ratingPillText}>{rating}</Text>
                        <Ionicons name="star" size={10} color={colors.textLight} />
                    </View>
                </View>
                <Text style={styles.cuisineText} numberOfLines={1}>{cuisine}</Text>
                <View style={styles.listInfoRow}>
                    <Ionicons name="navigate-outline" size={12} color={colors.textSecondary} />
                    <Text style={styles.infoText}>{distance}</Text>
                    <Ionicons name="time-outline" size={12} color={colors.textSecondary} style={{ marginLeft: 10 }} />
                    <Text style={styles.infoText}>{eta}</Text>
                </View>
                {offer && (
                    <View style={styles.offerRow}>
                        <Ionicons name="pricetag" size={12} color={colors.discount} />
                        <Text style={styles.offerText}>{offer}</Text>
                    </View>
                )}
                {freeDelivery && (
                    <View style={styles.offerRow}>
                        <Ionicons name="bicycle" size={12} color={colors.freeDelivery} />
                        <Text style={[styles.offerText, { color: colors.freeDelivery }]}>FREE DELIVERY</Text>
                    </View>
                )}
                {minOrder && (
                    <Text style={styles.minOrderText}>{minOrder}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Sponsored variant styles - Redesigned
    sponsoredCard: {
        width: 220,
        marginRight: spacing.md,
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        ...shadows.sm,
    },
    sponsoredImageWrapper: {
        position: 'relative',
        padding: spacing.sm,
        paddingBottom: 0,
    },
    sponsoredImageContainer: {
        width: '100%',
        height: 150,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
        backgroundColor: colors.card,
    },
    sponsoredImage: {
        width: '100%',
        height: '100%',
        borderRadius: borderRadius.md,
    },
    ratingBadgeTopRight: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.vegGreen,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    ratingText: {
        color: colors.textLight,
        fontSize: 12,
        fontWeight: '700',
        marginRight: 3,
    },
    reviewCount: {
        color: colors.textLight,
        fontSize: 10,
        marginLeft: 3,
        opacity: 0.9,
    },
    sponsoredContent: {
        padding: spacing.md,
    },
    sponsoredName: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 2,
    },
    cuisineText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 6,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginLeft: 4,
    },
    dot: {
        color: colors.textMuted,
        marginHorizontal: 6,
    },

    // Trending variant styles
    trendingCard: {
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        ...shadows.sm,
        overflow: 'hidden',
    },
    trendingImageContainer: {
        position: 'relative',
        width: 100,
        height: 100,
    },
    trendingImage: {
        width: '100%',
        height: '100%',
    },
    etaBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        backgroundColor: colors.primary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    etaBadgeText: {
        color: colors.textLight,
        fontSize: 10,
        fontWeight: '600',
    },
    trendingContent: {
        flex: 1,
        padding: spacing.md,
        justifyContent: 'center',
    },
    trendingName: {
        ...typography.bodyMedium,
        color: colors.textPrimary,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.xs,
    },
    ratingValue: {
        ...typography.bodyMedium,
        color: colors.textPrimary,
        marginLeft: 4,
    },
    reviewCountSmall: {
        ...typography.caption,
        color: colors.textSecondary,
        marginLeft: 4,
    },

    // List variant styles - Redesigned to match reference
    listCard: {
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        padding: spacing.md,
        ...shadows.sm,
    },
    listImageContainer: {
        position: 'relative',
        width: 80,
        height: 80,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
    },
    listImage: {
        width: '100%',
        height: '100%',
    },
    vegBadge: {
        position: 'absolute',
        top: 6,
        left: 6,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: borderRadius.sm,
        backgroundColor: colors.vegGreen,
    },
    vegBadgeText: {
        color: colors.textLight,
        fontSize: 8,
        fontWeight: '700',
    },
    listContent: {
        flex: 1,
        marginLeft: spacing.md,
        justifyContent: 'center',
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    listName: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textPrimary,
        flex: 1,
        marginRight: spacing.sm,
    },
    ratingPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.vegGreen,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    ratingPillText: {
        color: colors.textLight,
        fontSize: 11,
        fontWeight: '700',
        marginRight: 3,
    },
    listInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    offerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    offerText: {
        fontSize: 11,
        color: colors.discount,
        fontWeight: '700',
        marginLeft: 4,
    },
    minOrderText: {
        fontSize: 11,
        color: colors.textSecondary,
        marginTop: 4,
    },
});

export default RestaurantCard;

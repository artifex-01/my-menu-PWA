import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Switch,
    StatusBar,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme/colors';
import ScreenWrapper from '../components/ScreenWrapper';

const ProfileScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const stats = [
        { label: 'Reviews', value: '24' },
        { label: 'Photos', value: '56' },
        { label: 'Points', value: '1,250' },
    ];

    const activityItems = [
        { icon: 'star-outline', label: 'My Reviews', onPress: () => { } },
        { icon: 'heart-outline', label: 'Saved Restaurants', onPress: () => { } },
        { icon: 'card-outline', label: 'Payment Methods', onPress: () => { } },
    ];

    const settingsItems = [
        { icon: 'globe-outline', label: 'Language', value: 'English', onPress: () => { } },
        { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => { } },
        { icon: 'document-text-outline', label: 'Terms & Privacy', onPress: () => { } },
    ];

    return (
        <ScreenWrapper scroll={false} backgroundColor={colors.background}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
                    <Ionicons name="settings-outline" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
            >
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editAvatarButton} activeOpacity={0.8}>
                            <Ionicons name="camera" size={14} color={colors.textLight} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>John Doe</Text>
                    <Text style={styles.userBio}>Food enthusiast • NYC</Text>

                    {/* Stats */}
                    <View style={styles.statsContainer}>
                        {stats.map((stat, index) => (
                            <View key={stat.label} style={styles.statItem}>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                                {index < stats.length - 1 && <View style={styles.statDivider} />}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Activity Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Activity</Text>
                    <View style={styles.menuCard}>
                        {activityItems.map((item, index) => (
                            <TouchableOpacity
                                key={item.label}
                                style={[
                                    styles.menuItem,
                                    index < activityItems.length - 1 && styles.menuItemBorder
                                ]}
                                onPress={item.onPress}
                                activeOpacity={0.7}
                            >
                                <View style={styles.menuItemLeft}>
                                    <Ionicons name={item.icon} size={22} color={colors.textSecondary} />
                                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <View style={styles.menuCard}>
                        {/* Notifications Toggle */}
                        <View style={[styles.menuItem, styles.menuItemBorder]}>
                            <View style={styles.menuItemLeft}>
                                <Ionicons name="notifications-outline" size={22} color={colors.textSecondary} />
                                <Text style={styles.menuItemLabel}>Notifications</Text>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: colors.border, true: colors.primaryLight }}
                                thumbColor={notificationsEnabled ? colors.primary : colors.card}
                            />
                        </View>

                        {settingsItems.map((item, index) => (
                            <TouchableOpacity
                                key={item.label}
                                style={[
                                    styles.menuItem,
                                    index < settingsItems.length - 1 && styles.menuItemBorder
                                ]}
                                onPress={item.onPress}
                                activeOpacity={0.7}
                            >
                                <View style={styles.menuItemLeft}>
                                    <Ionicons name={item.icon} size={22} color={colors.textSecondary} />
                                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                                </View>
                                <View style={styles.menuItemRight}>
                                    {item.value && <Text style={styles.menuItemValue}>{item.value}</Text>}
                                    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
                    <Ionicons name="log-out-outline" size={22} color={colors.error} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                {/* App Version */}
                <Text style={styles.appVersion}>My Menu v1.0.0</Text>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    headerTitle: {
        ...typography.h2,
        color: colors.textPrimary,
    },
    settingsButton: {
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
    profileCard: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        alignItems: 'center',
        marginBottom: spacing.xl,
        ...shadows.sm,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: spacing.md,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: colors.primary,
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.card,
    },
    userName: {
        ...typography.h3,
        color: colors.textPrimary,
    },
    userBio: {
        ...typography.body,
        color: colors.textSecondary,
        marginTop: 2,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: spacing.xl,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    },
    statValue: {
        ...typography.h3,
        color: colors.textPrimary,
    },
    statLabel: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: 2,
    },
    statDivider: {
        position: 'absolute',
        right: 0,
        top: 4,
        bottom: 4,
        width: 1,
        backgroundColor: colors.border,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...typography.bodyMedium,
        color: colors.textSecondary,
        marginBottom: spacing.md,
        marginLeft: spacing.xs,
    },
    menuCard: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        ...shadows.sm,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemLabel: {
        ...typography.body,
        color: colors.textPrimary,
        marginLeft: spacing.md,
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemValue: {
        ...typography.body,
        color: colors.textSecondary,
        marginRight: spacing.xs,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.md,
        marginBottom: spacing.xl,
    },
    logoutText: {
        ...typography.bodyMedium,
        color: colors.error,
        marginLeft: spacing.sm,
    },
    appVersion: {
        ...typography.caption,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
});

export default ProfileScreen;

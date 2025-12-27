import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, shadows, borderRadius, spacing } from '../theme/colors';

const BottomTabBar = ({ state, navigation }) => {
    const insets = useSafeAreaInsets();

    const tabs = [
        { name: 'Home', icon: 'home', iconOutline: 'home-outline', route: 'Home' },
        { name: 'Explore', icon: 'compass', iconOutline: 'compass-outline', route: 'Search' },
        { name: 'QR', icon: 'qrcode-scan', isCenter: true, route: 'QRScan' },
        { name: 'Orders', icon: 'receipt', iconOutline: 'receipt-outline', route: 'Orders' },
        { name: 'Profile', icon: 'person', iconOutline: 'person-outline', route: 'Profile' },
    ];

    const handlePress = (route, isCenter) => {
        if (isCenter) {
            navigation.navigate('QRScan');
        } else {
            navigation.navigate(route);
        }
    };

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
            <View style={styles.navBar}>
                {tabs.map((tab, index) => {
                    const isFocused = state?.index === index;

                    if (tab.isCenter) {
                        return (
                            <TouchableOpacity
                                key={tab.name}
                                style={styles.centerButtonWrapper}
                                onPress={() => handlePress(tab.route, true)}
                                activeOpacity={0.85}
                            >
                                <LinearGradient
                                    colors={[colors.gradientStart, colors.gradientEnd]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.centerButton}
                                >
                                    <MaterialCommunityIcons
                                        name={tab.icon}
                                        size={26}
                                        color={colors.textLight}
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <TouchableOpacity
                            key={tab.name}
                            style={styles.tab}
                            onPress={() => handlePress(tab.route, false)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.tabContent}>
                                <Ionicons
                                    name={isFocused ? tab.icon : tab.iconOutline}
                                    size={22}
                                    color={isFocused ? colors.primary : colors.textMuted}
                                />
                                {isFocused && (
                                    <View style={styles.activeIndicator}>
                                        <Text style={styles.activeLabel}>{tab.name}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.md,
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 64,
        backgroundColor: colors.card,
        borderRadius: borderRadius.xl,
        paddingHorizontal: spacing.sm,
        marginBottom: spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    tabContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeIndicator: {
        marginTop: 4,
    },
    activeLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.primary,
    },
    centerButtonWrapper: {
        marginTop: -28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 8,
    },
});

export default BottomTabBar;

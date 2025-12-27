import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, shadows } from '../theme/colors';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();

    const tabs = [
        { name: 'Home', icon: 'home', iconOutline: 'home-outline' },
        { name: 'Explore', icon: 'search', iconOutline: 'search-outline' },
        { name: 'Orders', icon: 'receipt', iconOutline: 'receipt-outline' },
        { name: 'Profile', icon: 'person', iconOutline: 'person-outline' },
    ];

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
            <View style={styles.tabBar}>
                {tabs.map((tab, index) => {
                    // Insert center QR button after Explore (index 1)
                    const elements = [];

                    if (index === 2) {
                        // Add QR scan button in the center
                        elements.push(
                            <TouchableOpacity
                                key="qr-scan"
                                style={styles.centerButton}
                                onPress={() => navigation.navigate('QRScan')}
                                activeOpacity={0.8}
                            >
                                <View style={styles.centerButtonInner}>
                                    <MaterialCommunityIcons
                                        name="qrcode-scan"
                                        size={28}
                                        color={colors.textLight}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    }

                    const isFocused = state.index === index;

                    elements.push(
                        <TouchableOpacity
                            key={tab.name}
                            style={styles.tab}
                            onPress={() => navigation.navigate(tab.name)}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={isFocused ? tab.icon : tab.iconOutline}
                                size={24}
                                color={isFocused ? colors.primary : colors.textSecondary}
                            />
                            <Text style={[
                                styles.tabLabel,
                                { color: isFocused ? colors.primary : colors.textSecondary }
                            ]}>
                                {tab.name}
                            </Text>
                        </TouchableOpacity>
                    );

                    return elements;
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        ...shadows.md,
    },
    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 60,
        paddingHorizontal: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    tabLabel: {
        fontSize: 10,
        marginTop: 4,
        fontWeight: '500',
    },
    centerButton: {
        marginTop: -30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.lg,
    },
});

export default CustomTabBar;

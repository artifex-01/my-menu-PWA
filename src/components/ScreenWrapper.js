import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

/**
 * ScreenWrapper - A consistent wrapper for all screens with proper scrolling
 * 
 * Usage:
 * <ScreenWrapper scroll={true} bottomPadding={80}>
 *   {content}
 * </ScreenWrapper>
 */
const ScreenWrapper = ({
    children,
    scroll = true,
    bottomPadding = 0,
    style,
    contentContainerStyle,
    backgroundColor = colors.background,
    safeAreaTop = true,
    safeAreaBottom = false,
    showsVerticalScrollIndicator = false,
    bounces = true,
}) => {
    const insets = useSafeAreaInsets();

    const containerStyle = [
        styles.container,
        { backgroundColor },
        safeAreaTop && { paddingTop: insets.top },
        safeAreaBottom && { paddingBottom: insets.bottom },
        style,
    ];

    const scrollContentStyle = [
        styles.scrollContent,
        { paddingBottom: bottomPadding > 0 ? bottomPadding : insets.bottom + 20 },
        contentContainerStyle,
    ];

    if (!scroll) {
        return (
            <View style={containerStyle}>
                {children}
            </View>
        );
    }

    return (
        <View style={containerStyle}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={scrollContentStyle}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                bounces={bounces}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={false}
                overScrollMode="always"
            >
                {children}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        ...(Platform.OS === 'web' && {
            overflow: 'auto',
        }),
    },
    scrollContent: {
        flexGrow: 1,
    },
});

export default ScreenWrapper;

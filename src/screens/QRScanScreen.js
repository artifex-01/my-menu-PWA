import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography } from '../theme/colors';
import ScreenWrapper from '../components/ScreenWrapper';

const QRScanScreen = () => {
    const insets = useSafeAreaInsets();

    return (
        <ScreenWrapper scroll={false} backgroundColor="#000">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <View style={styles.content}>
                <View style={styles.scanFrame}>
                    <MaterialCommunityIcons name="qrcode-scan" size={80} color={colors.primary} />
                </View>
                <Text style={styles.title}>Scan Table QR</Text>
                <Text style={styles.subtitle}>
                    Point your camera at the QR code{'\n'}on your table to start ordering
                </Text>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    scanFrame: {
        width: 200,
        height: 200,
        borderWidth: 3,
        borderColor: colors.primary,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    title: {
        ...typography.h2,
        color: colors.textLight,
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        ...typography.body,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default QRScanScreen;

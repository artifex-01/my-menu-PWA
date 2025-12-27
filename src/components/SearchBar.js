import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../theme/colors';

const SearchBar = ({
    value,
    onChangeText,
    placeholder = 'Search for restaurants, food...',
    onFilterPress,
    autoFocus = false,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textMuted}
                    autoFocus={autoFocus}
                />
            </View>
            {onFilterPress && (
                <TouchableOpacity style={styles.filterButton} onPress={onFilterPress} activeOpacity={0.7}>
                    <Ionicons name="options-outline" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: spacing.lg,
        marginVertical: spacing.md,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: colors.borderLight,
        ...shadows.sm,
    },
    input: {
        flex: 1,
        marginLeft: spacing.sm,
        fontSize: 14,
        color: colors.textPrimary,
        paddingVertical: 0,
    },
    filterButton: {
        marginLeft: spacing.sm,
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.borderLight,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.sm,
    },
});

export default SearchBar;

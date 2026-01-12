import React from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Colors, Spacing } from '../theme';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
    textStyle,
}) => {
    const getBackgroundColor = () => {
        if (disabled) return Colors.lightBorder;
        if (variant === 'primary') return Colors.primary;
        if (variant === 'secondary') return Colors.secondary;
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return Colors.textLight;
        if (variant === 'outline') return Colors.primary;
        return '#fff';
    };

    const getBorder = () => {
        if (variant === 'outline') return { borderWidth: 1, borderColor: Colors.primary };
        return {};
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                getBorder(),
                style,
                disabled && styles.disabled,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    disabled: {
        opacity: 0.6,
    },
});

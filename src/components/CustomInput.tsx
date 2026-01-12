import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';
import { Colors, Spacing } from '../theme';

interface CustomInputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    containerStyle?: ViewStyle;
}

export const CustomInput: React.FC<CustomInputProps> = ({
    label,
    error,
    icon,
    containerStyle,
    style,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error ? styles.inputError : null]}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={Colors.textLight}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={Colors.textLight}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: 14,
        color: Colors.text,
        fontWeight: '500',
        marginBottom: Spacing.xs,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Colors.lightBorder,
        borderRadius: 12,
        paddingHorizontal: Spacing.md,
        height: 50,
    },
    input: {
        flex: 1,
        height: '100%',
        color: Colors.text,
        fontSize: 16,
    },
    icon: {
        marginRight: Spacing.sm,
    },
    inputError: {
        borderColor: Colors.danger,
    },
    errorText: {
        color: Colors.danger,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
});

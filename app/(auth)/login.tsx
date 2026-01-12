import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../src/components/CustomButton';
import { CustomInput } from '../../src/components/CustomInput';
import { useAuth } from '../../src/context/AuthContext';
import { Colors, Spacing } from '../../src/theme';

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) return; // Add better validation
        setLoading(true);
        try {
            await login(email, 'patient');
            router.replace('/(tabs)');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome Back!</Text>
                        <Text style={styles.subtitle}>Sign in to manage your appointments</Text>
                    </View>

                    <View style={styles.form}>
                        <CustomInput
                            label="Email Address"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            icon="mail-outline"
                        />
                        <CustomInput
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            icon="lock-closed-outline"
                        />

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <CustomButton
                            title="Sign In"
                            onPress={handleLogin}
                            loading={loading}
                            style={styles.signInButton}
                        />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                                <Text style={styles.linkText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: Spacing.lg,
    },
    header: {
        marginBottom: Spacing.xl,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textLight,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: Spacing.md,
    },
    forgotPasswordText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    signInButton: {
        marginBottom: Spacing.lg,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        color: Colors.textLight,
        fontSize: 14,
    },
    linkText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

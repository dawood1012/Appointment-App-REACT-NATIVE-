import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../src/components/CustomButton';
import { CustomInput } from '../../src/components/CustomInput';
import { useAuth } from '../../src/context/AuthContext';
import { Colors, Spacing } from '../../src/theme';

export default function SignupScreen() {
    const router = useRouter();
    const { signup } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) return;
        setLoading(true);
        try {
            await signup(name, email, 'patient');
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
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Join us to start booking appointments</Text>
                    </View>

                    <View style={styles.form}>
                        <CustomInput
                            label="Full Name"
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                            icon="person-outline"
                        />
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
                            placeholder="Choose a password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            icon="lock-closed-outline"
                        />

                        <CustomButton
                            title="Sign Up"
                            onPress={handleSignup}
                            loading={loading}
                            style={styles.signUpButton}
                        />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={styles.linkText}>Sign In</Text>
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
    signUpButton: {
        marginTop: Spacing.sm,
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

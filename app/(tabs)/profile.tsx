import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../src/components/CustomButton';
import { useAuth } from '../../src/context/AuthContext';
import { Colors, Spacing } from '../../src/theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{user?.name?.[0] || 'U'}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
      </View>

      <View style={styles.section}>
        <CustomButton
          title="Sign Out"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.xl,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  email: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 4,
  },
  section: {
    marginTop: Spacing.xl,
  },
  logoutBtn: {
    borderColor: Colors.danger,
  },
});

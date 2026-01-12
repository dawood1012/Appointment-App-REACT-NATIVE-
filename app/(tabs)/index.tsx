import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomInput } from '../../src/components/CustomInput';
import { DoctorCard } from '../../src/components/DoctorCard';
import { useAuth } from '../../src/context/AuthContext';
import { MOCK_DOCTORS } from '../../src/data/mockData';
import { Colors, Spacing } from '../../src/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = MOCK_DOCTORS.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.padding}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name || 'Guest'}</Text>
            <Text style={styles.subtext}>How do you feel today?</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => { }}
          >
            <Ionicons name="notifications-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <CustomInput
          placeholder="Search doctor or category..."
          icon="search-outline"
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchContainer}
        />
      </View>

      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={() => router.push({ pathname: '/doctor/[id]', params: { id: item.id } })}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Doctors</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/chat')}
      >
        <Ionicons name="chatbubbles" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  padding: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtext: {
    fontSize: 14,
    color: Colors.textLight,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchContainer: {
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl + 20, // Avoid tab bar if possible or sit above it. 
    // Since tab bar is part of layout, using simple absolute. 
    // In expo tabs, it might overlap bottom area, better to put enough margin.
    right: Spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../src/components/CustomButton';
import { useAppointments } from '../../src/context/AppointmentContext';
import { useAuth } from '../../src/context/AuthContext';
import { MOCK_DOCTORS } from '../../src/data/mockData';
import { Colors, Spacing } from '../../src/theme';

export default function DoctorDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addAppointment } = useAppointments();
    const { user } = useAuth();
    const doctor = MOCK_DOCTORS.find((d) => d.id === id);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    if (!doctor) {
        return (
            <View style={styles.center}>
                <Text>Doctor not found</Text>
            </View>
        );
    }

    const handleBook = () => {
        if (!selectedSlot) {
            Alert.alert('Please select a time slot');
            return;
        }
        Alert.alert(
            'Confirm Booking',
            `Book appointment with ${doctor.name} at ${selectedSlot}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        const newAppointment = {
                            id: Math.random().toString(),
                            doctorId: doctor.id,
                            doctorName: doctor.name,
                            date: new Date().toLocaleDateString(), // Today for demo
                            time: selectedSlot,
                            status: 'confirmed' as const,
                            patientId: user?.id || 'guest',
                        };
                        addAppointment(newAppointment);
                        Alert.alert('Success', 'Appointment Booked Successfully!');
                        router.navigate('/(tabs)/appointments');
                    }
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <Stack.Screen options={{
                headerShown: true,
                title: doctor.name,
                headerBackTitle: 'Back',
                headerTintColor: Colors.primary
            }} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileHeader}>
                    <Image source={{ uri: doctor.image }} style={styles.image} />
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{doctor.name}</Text>
                        <Text style={styles.specialization}>{doctor.specialization}</Text>
                        <View style={styles.statsRow}>
                            <View style={styles.stat}>
                                <View style={styles.ratingBadge}>
                                    <Ionicons name="star" size={12} color={Colors.warning} />
                                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                                </View>
                                <Text style={styles.statLabel}>{doctor.reviews} Reviews</Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.statValue}>{doctor.experience} yrs</Text>
                                <Text style={styles.statLabel}>Exp.</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.aboutText}>{doctor.about}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Available Slots</Text>
                    <View style={styles.slotsContainer}>
                        {doctor.availableSlots.map((slot) => (
                            <TouchableOpacity
                                key={slot}
                                style={[
                                    styles.slotBadge,
                                    selectedSlot === slot && styles.selectedSlot,
                                ]}
                                onPress={() => setSelectedSlot(slot)}
                            >
                                <Text
                                    style={[
                                        styles.slotText,
                                        selectedSlot === slot && styles.selectedSlotText,
                                    ]}
                                >
                                    {slot}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Consultation Fee</Text>
                    <Text style={styles.fee}>${doctor.consultationFee}</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title="Book Appointment"
                    onPress={handleBook}
                    disabled={!selectedSlot}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: Spacing.lg,
    },
    profileHeader: {
        flexDirection: 'row',
        marginBottom: Spacing.xl,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: Colors.lightBorder,
    },
    headerInfo: {
        flex: 1,
        marginLeft: Spacing.md,
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    specialization: {
        fontSize: 16,
        color: Colors.textLight,
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stat: {
        marginRight: Spacing.lg,
        alignItems: 'flex-start',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9E6',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 2,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.warning,
        marginLeft: 4,
    },
    statValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.text,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textLight,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    aboutText: {
        fontSize: 14,
        color: Colors.textLight,
        lineHeight: 22,
    },
    slotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    slotBadge: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.lightBorder,
        backgroundColor: Colors.card,
    },
    selectedSlot: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    slotText: {
        color: Colors.text,
        fontSize: 14,
    },
    selectedSlotText: {
        color: '#fff',
        fontWeight: '600',
    },
    fee: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    footer: {
        padding: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.lightBorder,
        backgroundColor: Colors.card,
    },
});

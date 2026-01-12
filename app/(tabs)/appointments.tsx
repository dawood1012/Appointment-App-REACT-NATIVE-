import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppointments } from '../../src/context/AppointmentContext';
import { Colors, Spacing } from '../../src/theme';

export default function AppointmentsScreen() {
    const { appointments, cancelAppointment } = useAppointments();

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.doctorName}>{item.doctorName}</Text>
                <Text style={[
                    styles.status,
                    { color: item.status === 'confirmed' ? Colors.success : item.status === 'cancelled' ? Colors.danger : Colors.warning }
                ]}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
            </View>
            <View style={styles.detailsRow}>
                <Ionicons name="calendar-outline" size={16} color={Colors.textLight} />
                <Text style={styles.detailText}>{item.date}</Text>
                <View style={styles.spacer} />
                <Ionicons name="time-outline" size={16} color={Colors.textLight} />
                <Text style={styles.detailText}>{item.time}</Text>
            </View>

            {item.status === 'confirmed' && (
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={() => cancelAppointment(item.id)}
                    >
                        <Text style={styles.cancelText}>Cancel Appointment</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Text style={styles.title}>Your Appointments</Text>
            {appointments.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No upcoming appointments</Text>
                </View>
            ) : (
                <FlatList
                    data={appointments}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        padding: Spacing.lg,
    },
    list: {
        padding: Spacing.lg,
    },
    card: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
    },
    status: {
        fontSize: 14,
        fontWeight: '600',
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    detailText: {
        marginLeft: 6,
        color: Colors.textLight,
    },
    spacer: {
        width: Spacing.md,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: Colors.textLight,
        fontSize: 16,
    },
    actions: {
        borderTopWidth: 1,
        borderTopColor: Colors.lightBorder,
        paddingTop: Spacing.sm,
        marginTop: Spacing.sm,
    },
    cancelBtn: {
        alignItems: 'center',
    },
    cancelText: {
        color: Colors.danger,
        fontWeight: '500',
    }
});

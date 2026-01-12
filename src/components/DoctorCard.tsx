import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Spacing } from '../theme';
import { Doctor } from '../types';

interface DoctorCardProps {
    doctor: Doctor;
    onPress: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.content}>
                <Image source={{ uri: doctor.image }} style={styles.image} />
                <View style={styles.info}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{doctor.name}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={14} color={Colors.warning} />
                            <Text style={styles.rating}>{doctor.rating}</Text>
                        </View>
                    </View>

                    <Text style={styles.specialization}>{doctor.specialization}</Text>
                    <Text style={styles.experience}>{doctor.experience} years exp.</Text>

                    <View style={styles.footer}>
                        <Text style={styles.fee}>${doctor.consultationFee}</Text>
                        <View style={styles.bookButton}>
                            <Text style={styles.bookButtonText}>Book</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        marginBottom: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        padding: Spacing.md,
    },
    content: {
        flexDirection: 'row',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: Colors.lightBorder,
    },
    info: {
        flex: 1,
        marginLeft: Spacing.md,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
        flex: 1,
        marginRight: Spacing.xs,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9E6',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    rating: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.warning,
        marginLeft: 2,
    },
    specialization: {
        fontSize: 14,
        color: Colors.textLight,
        marginTop: 2,
    },
    experience: {
        fontSize: 12,
        color: Colors.textLight,
        marginTop: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.sm,
    },
    fee: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    bookButton: {
        backgroundColor: '#E6F0FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    bookButtonText: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: '600',
    },
});

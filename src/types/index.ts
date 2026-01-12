export type UserRole = 'patient' | 'doctor';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    experience: number;
    rating: number;
    reviews: number;
    consultationFee: number;
    about: string;
    image: string;
    availableSlots: string[];
}

export interface Appointment {
    id: string;
    doctorId: string;
    doctorName: string;
    // In a real app, date would be Date object or ISO string.
    // For simplicity keeping as string for display
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    patientId: string;
}

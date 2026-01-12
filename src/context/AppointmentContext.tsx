import React, { createContext, useContext, useState } from 'react';
import { Appointment } from '../types';

interface AppointmentContextType {
    appointments: Appointment[];
    addAppointment: (appointment: Appointment) => void;
    cancelAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const addAppointment = (appointment: Appointment) => {
        setAppointments((prev) => [...prev, appointment]);
    };

    const cancelAppointment = (id: string) => {
        setAppointments((prev) =>
            prev.map(apt => apt.id === id ? { ...apt, status: 'cancelled' } : apt)
        );
    };

    return (
        <AppointmentContext.Provider value={{ appointments, addAppointment, cancelAppointment }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointments = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointments must be used within an AppointmentProvider');
    }
    return context;
};

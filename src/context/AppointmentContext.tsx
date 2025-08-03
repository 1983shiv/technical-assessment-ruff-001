import React, { createContext, useContext, useMemo, useState } from 'react';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface Appointment {
  doctorId: string;
  date: string;
  time: string;
}

interface AppointmentContextType {
  doctors: Doctor[];
  appointment: Appointment;
  setAppointment: (a: Appointment) => void;
  book: () => void;
  booked: boolean;
  error: string | null;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

const initialDoctors: Doctor[] = [
  { id: '1', name: 'Dr. Smith', specialty: 'Cardiology' },
  { id: '2', name: 'Dr. Lee', specialty: 'Dermatology' },
];

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors] = useState<Doctor[]>(initialDoctors);
  const [appointment, setAppointment] = useState<Appointment>({ doctorId: '', date: '', time: '' });
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState<string | null>(null);

      // const validation check before booking.
    const validateAppointment = ()  => {
        if (!appointment.doctorId || !appointment.date || !appointment.time) {
            console.log("All fields are required.")
            console.log(appointment)
            return 'All fields are required.';
        }
        return null;
    };

  // TODO: Implement book logic with validation
  const book = () => {
    const validationError = validateAppointment();
    if(validationError !== null){
        setError(validationError);
        setBooked(false)
    } else {
        setBooked(true);
        setError(null);
        // Here you would typically send the appointment data to a server
    }
    // TBD
  };

  const storeValue = useMemo(() => ({ doctors, appointment, setAppointment, book, booked, error }), [doctors, appointment, booked, error])
  return (
    <AppointmentContext.Provider value={storeValue}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error('useAppointment must be used within an AppointmentProvider');
  return ctx;
};
import React from 'react';
import { useAppointment } from '../context/AppointmentContext';

const AppointmentBooking: React.FC = () => {
  const { doctors, appointment, setAppointment, book, booked, error } = useAppointment();

  return (
    <form aria-label="Book appointment" onSubmit={e => { e.preventDefault(); book(); }}>
      <label>
        Doctor:
        <select
          value={appointment.doctorId}
          onChange={e => setAppointment({ ...appointment, doctorId: e.target.value })}
          aria-label="Select doctor"
        >
          <option value="">Select...</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</option>
          ))}
        </select>
      </label>
      <label>
        Date:
        <input
          type="date"
          value={appointment.date}
          onChange={e => setAppointment({ ...appointment, date: e.target.value })}
          aria-label="Select date"
        />
      </label>
      <label>
        Time:
        <input
          type="time"
          value={appointment.time}
          onChange={e => setAppointment({ ...appointment, time: e.target.value })}
          aria-label="Select time"
        />
      </label>
      <button type="submit" data-testid="book-btn">Book</button>
      {error && <div role="alert" style={{ color: 'red' }}>{error}</div>}
      {booked && <div data-testid="confirmation">Appointment booked!</div>}
    </form>
  );
};

export default AppointmentBooking;

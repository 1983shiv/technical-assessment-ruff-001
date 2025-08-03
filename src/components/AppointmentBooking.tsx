import React, { useEffect } from 'react';
import { useAppointment } from '../context/AppointmentContext';

const AppointmentBooking: React.FC = () => {
    const { doctors, appointment, setAppointment, book, booked, error } =
        useAppointment();

    useEffect(() => {
        console.log({appointment})
    }, [appointment])
    return (
        <div className="flex flex-col gap-2 m-2">
            <h2 className="text-xl font-bold bg-gray-800 text-white p-4 rounded-sm">
                Book your Appointment with your Docter Now!
            </h2>
            <form
                aria-label="Book appointment"
                onSubmit={(e) => {
                    e.preventDefault();
                    book();
                }}
                className="flex flex-col gap-2 m-2 w-[500px]"
            >
                <label className="flex flex-row justify-between">
                    <span className="text-left">Doctor:</span>
                    <select
                        value={appointment.doctorId}
                        onChange={(e) =>
                            setAppointment({
                                ...appointment,
                                doctorId: e.target.value,
                            })
                        }
                        aria-label="Select doctor"
                        data-testid="select-docter"
                        className="text-right text-black bg-gray-100"
                    >
                        <option value="">Select...</option>
                        {doctors.map((doc) => (
                            <option key={doc.id} value={doc.id} data-testid={`option-${doc.id}`}>
                                {doc.name} ({doc.specialty})
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-row justify-between">
                    <span className="text-left">Date:</span>
                    <input
                        type="date"
                        value={appointment.date}
                        onChange={(e) =>
                            setAppointment({
                                ...appointment,
                                date: e.target.value,
                            })
                        }
                        aria-label="Select date"
                        className="text-right"
                        data-testid="select-date"
                    />
                </label>
                <label className="flex flex-row justify-between">
                    <span className="text-left">Time:</span>
                    <input
                        type="time"
                        value={appointment.time}
                        onChange={(e) =>
                            setAppointment({
                                ...appointment,
                                time: e.target.value,
                            })
                        }
                        aria-label="Select time"
                        className="text-right"
                        data-testid="select-time"
                    />
                </label>
                <button type="submit" data-testid="book-btn">
                    Book
                </button>
                {error && (
                    <div role="alert" style={{ color: 'red' }} data-testid="alert-error">
                        {error}
                    </div>
                )}
                {booked && (
                    <div data-testid="confirmation">Appointment booked!</div>
                )}
            </form>
        </div>
    );
};

export default AppointmentBooking;

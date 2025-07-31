import React, { useEffect, useState } from 'react';

type FormData = {
    name: string;
    email: string;
    rating: number | '';
    message: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
    name: '',
    email: '',
    rating: '',
    message: '',
};

const validateEmail = (email: string) => {
    if (email.length > 0 && email.includes('@')) return true;
    return false;
};

const validateRating = (rating: number | string) => {
    if (Number(rating) >= 1 && Number(rating) <= 5) return true;
    return false;
};

const validateMessage = (msg: string) => msg.length <= 250; 

export const FeedbackForm: React.FC = () => {
    const [form, setForm] = useState<FormData>(initialForm);
    const [errors, setErrors] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        // TODO: Update form state correctly
        setForm((prev) => ({ ...prev, [name]: value }));
    };


    const validate = (): Errors => {
        const newErrors: Errors = {};

        // TODO: validate email (required + contains @)
        if (!validateEmail(form.email)) {
            newErrors.email = 'Invalid Email';
        }
        
        // TODO: validate rating (required + between 1 and 5)
        if (!validateRating(form.rating)) {
            newErrors.rating = "Invalid Rating";
        }
        // TODO: message should not exceed 250 chars
        if (!validateMessage(form.message)) {
            newErrors.message = "Message must be less than 250 characters."
        }

        return newErrors;
    };



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        const hasErrors = Object.values(validationErrors).some(Boolean);
        if (!hasErrors) {
        // if (Object.keys(validationErrors).length === 0) {
            // TODO: Simulate a successful submission (set submitted true and reset form)
            setSubmitted(true);
            setForm({ name: '', email: '', rating: '', message: '' });
            setErrors({ name: '', email: '', rating: '', message: '' });
            setTimeout(() => {
                setSubmitted(false);
            }, 1000);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            data-testid="feedback-form"
            className="flex flex-col m-1 justify-start w-[500px]"
        >
            <span>
                {submitted && (
                    <p data-testid="success-message">Feedback submitted!</p>
                )}
            </span>
            <label>
                Name:
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    data-testid="input-name"
                    className="bg-gray-100 text-black p-2 m-2"
                />
            </label>

            <label>
                Email*:
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    data-testid="input-email"
                    className="bg-gray-100 text-black p-2 m-2"
                    onBlur={() => setErrors(validate())}
                />
                {errors.email && (
                    <span data-testid="error-email">{errors.email}</span>
                )}
            </label>

            <label>
                Rating (1-5)*:
                <input
                    name="rating"
                    type="number"
                    value={form.rating}
                    onChange={handleChange}
                    data-testid="input-rating"
                    className="bg-gray-100 text-black p-2 m-2"
                    onBlur={() => setErrors(validate())}
                />
                {errors.rating && (
                    <span data-testid="error-rating">{errors.rating}</span>
                )}
            </label>

            <label>
                Message:
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    data-testid="input-message"
                    className="bg-gray-100 text-black p-2 m-2"
                    onBlur={() => validate()}
                />
                {errors.message && (
                    <span data-testid="error-message">{errors.message}</span>
                )}
            </label>

            <button type="submit" className="m-1">
                Submit
            </button>
        </form>
    );
};

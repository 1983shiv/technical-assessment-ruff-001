import React, { useState } from 'react';

type FormState = {
    email: string;
    firstName: string;
    acceptedTerms: boolean;
};

const initialState: FormState = {
    email: '',
    firstName: '',
    acceptedTerms: false,
};

const validEmail = (email: string) => {
    if (email.length > 0 && email.includes('@')) return true;
    return false;
};

export const NewsletterSignup: React.FC = () => {
    const [form, setForm] = useState<FormState>(initialState);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ email?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value, type, checked } = e.target;
        // TODO: Update form state correctly based on input type (text/checkbox)
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));     
        validate();
    };


    const validate = (): boolean => {
        let valid = true;
        const newErrors: { email?: string } = {};
        // TODO: Set `valid` to false if email is empty or doesn't contain "@"
        if (validEmail(form.email)) {
            valid = true;
            newErrors.email = '';
        } else {
            // TODO: Save the error message in `newErrors.email`
            newErrors.email =
                'Email should contain @ sign and it should not empty';
            valid = false;
        }
        setErrors((prev) => ({ ...prev, email: newErrors.email }));
        return valid;
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        if (!validate()) return;

        // TODO: Set submitted to true, reset form
        setSubmitted(true);

        setForm(initialState);
        setErrors(initialState);
        setTimeout(() => {
            setSubmitted(false);
        }, 1000);
    };

    return (
        <form
            onSubmit={handleSubmit}
            data-testid="form"
            className="flex flex-col m-1"
        >
            <input
                type="text"
                name="firstName"
                placeholder="First Name (optional)"
                value={form.firstName}
                onChange={handleChange}
                data-testid="input-first-name"
                className="bg-gray-100 p-2 m-1 text-black"
            />

            <input
                type="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                data-testid="input-email"
                className="bg-gray-100 p-2 m-1 text-black"
                onBlur={() => validate()}
            />
            {errors.email && (
                <div data-testid="error-email">{errors.email}</div>
            )}

            <label>
                <input
                    type="checkbox"
                    name="acceptedTerms"
                    checked={form.acceptedTerms}
                    onChange={handleChange}
                    data-testid="checkbox-terms"
                    className="bg-gray-100 p-2 m-1 text-black text-left"
                />
                I accept the terms and conditions *
            </label>

            <button
                type="submit"
                disabled={!form.acceptedTerms}
                data-testid="submit-button"
                className="m-1"
            >
                Subscribe
            </button>

            {submitted && (
                <p data-testid="success-message">Thanks for subscribing!</p>
            )}
        </form>
    );
};

import { useState } from 'react';

type FormData = {
    name: string;
    email: string;
    message: string;
};

type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
};

const defaultData: FormData = {
    name: '',
    email: '',
    message: '',
};

const isValidName = (name: string): boolean => {
    if (name.length > 0) return true;
    return false;
};
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidMessage = (txt?: string): boolean => {
    return !!txt && txt.length > 10;
};

export const FeedbackForm = () => {
    const [data, setData] = useState<FormData>(defaultData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const validate = (
        field: keyof FormData,
        value: string
    ): string | undefined => {
        switch (field) {
            case 'name':
                // TODO: Name should not be empty
                return isValidName(value) ? undefined : 'Name should not be empty';
                break;
            case 'email':
                // TODO: Validate email format
                return isValidEmail(value) ? undefined : 'Invalid Email' ;
                break;
            case 'message':
                // TODO: Require minimum 10 characters
                return isValidMessage(value)
                    ? undefined : 'Message at least 10 characters long';
                break;
        }
        return undefined;
    };

    const handleChange =
        (field: keyof FormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;
            setData((prev) => ({ ...prev, [field]: value }));
            setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
        };

    const isFormValid = (): boolean => {
        // TODO: Implement logic to check if all fields are valid (errors object is empty)
        return (
            isValidName(data.name) &&
            isValidEmail(data.email) &&
            isValidMessage(data.message)
        )
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: FormErrors = {};

        (Object.keys(data) as (keyof FormData)[]).forEach((key) => {
            const error = validate(key, data[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            // Submit logic here
            setSubmitted(true);
            setData({ name: '', email: '', message: '' });
            setErrors({});
            setTimeout(() => {
                setSubmitted(false);
            }, 1000);
        }
    };

    if (submitted) {
        return <p data-testid="thank-you">Thank you for your feedback!</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col m-2">
            <input
                type="text"
                placeholder="Your Name"
                value={data.name}
                onChange={handleChange('name')}
                onBlur={(e) =>
                    setErrors((prev) => ({
                        ...prev,
                        name: validate('name', e.target.value),
                    }))
                }
                data-testid="name-input"
                className="bg-gray-100 text-black p-2 rounded-sm m-2"
            />
            {errors.name && <p className="error" data-testid="name-error">{errors.name}</p>}

            <input
                type="email"
                placeholder="Your Email"
                value={data.email}
                onChange={handleChange('email')}
                onBlur={(e) =>
                    setErrors((prev) => ({
                        ...prev,
                        email: validate('email', e.target.value),
                    }))
                }
                data-testid="email-input"
                className="bg-gray-100 text-black p-2 rounded-sm m-2"
            />
            {errors.email && <p className="error" data-testid="email-error">{errors.email}</p>}

            <textarea
                placeholder="Your Message"
                value={data.message}
                onChange={handleChange('message')}
                onBlur={(e) =>
                    setErrors((prev) => ({
                        ...prev,
                        message: validate('message', e.target.value),
                    }))
                }
                data-testid="message-input"
                className="bg-gray-100 text-black p-2 rounded-sm m-2"
            />
            {errors.message && <p className="error" data-testid="message-error">{errors.message}</p>}

            <button
                type="submit"
                disabled={!isFormValid()}
                data-testid="submit-btn"
            >
                Submit
            </button>
        </form>
    );
};

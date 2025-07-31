import React, { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const initialFormState: FormData = {
  name: '',
  email: '',
  password: '',
};



const validateName = (txt: string) => {
  if(txt.length >= 2) return true
  return false;
}

const validateEmail = (email: string) => {
  if(email.includes('@') && email.includes(".")) return true
  return false
}

const validatePssword = (pswd : string) => {
  if(pswd.length >= 6) return true;
  return false;
}

export const SignupForm: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormData>>({
  name: '',
  email: '',
  password: '',
});
  const [submitted, setSubmitted] = useState(false);

  const validate = (field: keyof FormData, value: string): string | null => {
    // TODO: Implement field-specific validation logic
    switch(field){
      // name: required, min 2 chars
      case 'name': 
        return !validateName(value.trim()) ? "Name must be atleast 2 characters min." : null;
      // email: required, must contain "@" and "."
      case 'email': 
        return !validateEmail(value) ? "Invalid Email Address" : null
        // password: min 6 chars
      case 'password': 
        return !validatePssword(value) ? "Invalid Password" : null
      default: return null;
    }
  };

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;   
    
    // TODO: Update the form state with new value
    // setForm({...form, [name]: value})
    setForm(prev => ({...prev, [name]: value}))

    const error = validate(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error ?? '' }));

    // TODO: Validate the input and update the errors state accordingly
    // if(name === 'name'){
    //   const nameError = validate('name', value)
    //   setErrors({...errors, [name]: nameError ?? undefined})
    // }
    // if(name=== 'email'){
    //   const emailError = validate('email', value)
    //   setErrors({...errors, [name]: emailError ?? undefined})
    // }
    
    // if(name === 'password'){
    //   const passwordError = validate('password', value)
    //   setErrors({...errors, [name]: passwordError ?? undefined})
    // }
  };

  const isFormValid = (): boolean => {
    // TODO: Check if all required fields are valid (no errors and all filled)
    if(validateName(form.name) && validateEmail(form.email) && validatePssword(form.password)) return true
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }

    // TODO: Simulate successful form submission
    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      password: '',
    })
    setErrors({
      name: '',
      email: '',
      password: '',
    })
    setTimeout(() => {
      setSubmitted(false);
    }, 1000);

    // setSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        data-testid="input-name"
        className='bg-gray-100 p-2 text-black'
      />
      {errors.name && <p data-testid="error-name">{errors.name}</p>}

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        data-testid="input-email"
        className='bg-gray-100 p-2 text-black'
      />
      {errors.email && <p data-testid="error-email">{errors.email}</p>}

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        data-testid="input-password"
        className='bg-gray-100 p-2 text-black'
      />
      {errors.password && <p data-testid="error-password">{errors.password}</p>}

      <button
        type="submit"
        disabled={!isFormValid()}
        data-testid="submit-button"
      >
        Sign Up
      </button>

      {submitted && <p data-testid="success-msg">Signup successful!</p>}
    </form>
  );
};

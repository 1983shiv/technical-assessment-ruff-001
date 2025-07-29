import React, { useState } from 'react';

const MIN_LENGTH = 10;
const MAX_LENGTH = 200;

export const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateFeedback = (text: string): boolean => {
    // TODO: Return true only if feedback length is between MIN_LENGTH and MAX_LENGTH
    if(text.length >= MIN_LENGTH && text.length <= MAX_LENGTH) return true;
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: Update feedback state and clear any existing error
    const txt = e.target.value;
    setFeedback(txt)
    if(validateFeedback(txt) || txt.length === 0 ){
        setError("")
    } else {
        setError("Feedback should be less than 200 char and more than 10 characters")
    }    
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!validateFeedback(feedback)){
        setError('Feedback should be between 10 and 200 characters.')
        return;
    }

    setError("")

    setTimeout(() => {
        setSubmitting(false)
        setSuccess(false)
    }, 2000);
    
    setSubmitting(true)
    setSuccess(true)
    // TODO: Validate feedback, show error if invalid
    // TODO: Simulate async submission (e.g., setTimeout or Promise)
    // TODO: Disable submit during submission, show success if valid
  };

  return (
    <div className='flex flex-col justify-center w-full'>
    <form onSubmit={handleSubmit} className='flex flex-col m-1 w-full'>
      <label htmlFor="feedback" className='m-2 p-2'>Your Feedback:</label>
      <textarea
        id="feedback"
        value={feedback}
        onChange={handleChange}
        data-testid="feedback-input"
        placeholder="Enter at least 10 characters..."
        className='m-2 p-2 w-full'
      />
      {error && <div data-testid="error" style={{ color: 'red' }}>{error}</div>}
      <button
        type="submit"
        disabled={submitting}
        data-testid="submit-button"
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
      {success && <p data-testid="success-message" style={{ color: 'green' }}>Thanks for your feedback!</p>}
    </form>
    </div>
  );
};

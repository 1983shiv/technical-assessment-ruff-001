import React, { useState } from 'react';

const MIN_LENGTH = 10;
const MAX_LENGTH = 200;

export const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: Update feedback state and clear any existing error
  };

  const validateFeedback = (text: string): boolean => {
    // TODO: Return true only if feedback length is between MIN_LENGTH and MAX_LENGTH
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Validate feedback, show error if invalid
    // TODO: Simulate async submission (e.g., setTimeout or Promise)
    // TODO: Disable submit during submission, show success if valid
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="feedback">Your Feedback:</label>
      <textarea
        id="feedback"
        value={feedback}
        onChange={handleChange}
        data-testid="feedback-input"
        placeholder="Enter at least 10 characters..."
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
  );
};

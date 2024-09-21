import React, { useState } from 'react';
import { auth } from '../firebase';
import { confirmPasswordReset } from 'firebase/auth';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const handlePasswordReset = async () => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage('Password reset successful.');
    } catch (error) {
      setMessage('Error resetting password: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;

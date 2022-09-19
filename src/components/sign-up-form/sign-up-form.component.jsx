import { setDoc } from 'firebase/firestore';
import { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.util';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  return (
    <div className=''>
      <h1>Sign up with email</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Display name
          <input
            name='displayName'
            type='text'
            value={displayName}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            name='email'
            type='email'
            value={email}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            name='password'
            type='password'
            value={password}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm password
          <input
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            required
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;

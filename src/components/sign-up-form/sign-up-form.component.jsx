import { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.util';
import Button from '../button/button.component';

import FormInput from '../form-input/form-input.component';

import './sign-up-form.styles.scss';

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
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with email</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Display name'}
          name='displayName'
          type='text'
          value={displayName}
          required
          onChange={handleChange}
        />
        <FormInput
          label={'Email'}
          name='email'
          type='email'
          value={email}
          required
          onChange={handleChange}
        />
        <FormInput
          label={'Password'}
          name='password'
          type='password'
          value={password}
          required
          onChange={handleChange}
        />
        <FormInput
          label={'Confirm password'}
          name='confirmPassword'
          type='password'
          value={confirmPassword}
          required
          onChange={handleChange}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;

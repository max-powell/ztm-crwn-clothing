import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.util';

const SignIn = () => {
  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
  };
  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={signInWithGoogle}>Sign in with Google popup</button>
    </div>
  );
};

export default SignIn;

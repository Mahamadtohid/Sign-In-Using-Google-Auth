import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from './api';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navingate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {
        if (authResult['code']) {
            const result = await googleAuth(authResult['code']);
            const { email, name, image } = result.data.user;
            const token = result.data.token;

            // Save token and user info
            const obj = { email, name, image, token };
            localStorage.setItem('user-info', JSON.stringify(obj));
            localStorage.setItem('token', token);

            console.log('Token saved in localStorage:', localStorage.getItem('token'));
            console.log('User info saved in localStorage:', localStorage.getItem('user-info'));

            // Navigate to dashboard after saving the token
            navingate('/dashboard');
        }
    } catch (err) {
        console.log(err);
  }
};

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => console.log('Login Failed:', error),
    flow: 'auth-code',
  });

  return (
    <div className='login'>
      <h1>Google Login</h1>
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
}

export default GoogleLogin;

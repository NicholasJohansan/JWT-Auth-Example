import { useEffect, useState } from 'react';
import './Forms.css'
import * as api from '../api';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';

function Forms() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const submitRegister = async (e) => {
    e.preventDefault();
    const result = await api.register(regUsername, regPassword);
    setRegPassword('');
    if (typeof result === 'string') {
      alert(`Error: ${result}`);
    } else {
      alert('Registration successful!');
    }
  }

  const submitLogin = async (e) => {
    e.preventDefault();
    const result = await api.login(loginUsername, loginPassword);
    setLoginPassword('');
    if (typeof result === 'string') {
      alert(`Error: ${result}`);
    } else {
      alert("Login successful!");
      navigate('/dashboard');
      auth.setUser(result.user);
    }
  }

  return (
    <div id='forms'>
      <fieldset id='register'>
        <h3>Register</h3>
        <form id='register-form' onSubmit={submitRegister}>
          <label htmlFor="register-username">
            <span>Username:</span>
            <input type="text" name="register-username" id="register-username" value={regUsername} onChange={e => setRegUsername(e.target.value)} />
          </label>
          <label htmlFor="register-password">
            <span>Password:</span>
            <input type="password" name="register-password" id="register-password" value={regPassword} onChange={e => setRegPassword(e.target.value)} />
          </label>
          <input type="submit" value="Register" />
        </form>
      </fieldset>
      <fieldset id='login'>
        <h3>Login</h3>
        <form id='login-form' onSubmit={submitLogin}>
          <label htmlFor="login-username">
            <span>Username:</span>
            <input type="text" name="login-username" id="login-username" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
          </label>
          <label htmlFor="login-password">
            <span>Password:</span>
            <input type="password" name="login-password" id="login-password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
          </label>
          <input type="submit" value="Login" />
        </form>
      </fieldset>
    </div>
  )
}

export default Forms;
import loginGame from '../dist/images/login-game.jpg';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('username: ', username);
    console.log('password: ', password);

    const result = await fetch('/api/loginUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then( (response) => {
      console.log(response);
      return response.json();
    });
    console.log(result.loggedIn);
    console.log(typeof result.loggedIn);
  };

  return (
    <div id='login-container'>
      <section id='login-left'>
        <a className='logo login-signup-logo' href='/'>
          gameHQ
        </a>
        <h1>Login</h1>
        <p>Let's get you logged in to find your next favorite game!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <input id='username' type='text' required placeholder='Username' name='username' onChange={(e) => setUsername(e.target.value)} />
            <span>Username</span>
          </label>
          <label>
            <input id='password' type='password' required placeholder='Password' name='password' onChange={(e) => setPassword(e.target.value)} />
            <span>Password</span>
          </label>
          <input id='btn-submit' type='submit' value='Sign In' />
        </form>
        <p className='p2'>
          Don't have an account already? <a href='/login'>Sign up</a>
        </p>
      </section>
      <section id='login-right'>
        <p>Welcome back to gameHQ!</p>
        <img src={loginGame} />
      </section>
    </div>
  );
};

export default Login;

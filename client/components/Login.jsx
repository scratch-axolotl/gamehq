import { Link, useNavigate } from 'react-router-dom';
import loginGame from '../dist/images/login-game.jpg';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('username: ', username);
    console.log('password: ', password);

    const result = await fetch('/api/loginUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

    console.log('this is the result of whether we can log in or')
    console.log(result.loggedIn);
    if (result.loggedIn) navigate('/search');
    else console.log('couldnt log in');
  };

  return (
    <div id='login-container'>
      <section id='login-left'>
        <Link className='logo login-signup-logo' to='/'>
          gameHQ
        </Link>
        <h1>Login</h1>
        <p>Let's get you logged in to find your next favorite game!</p>
        <form onSubmit={(e) => handleSubmit(e)}>
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
          Don't have an account already? <Link to='/signup'>Sign up</Link>
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

import { Link, useNavigate } from 'react-router-dom';
import gameCenter from '../dist/images/gamecenter.jpg';
import { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('name: ', name);
    console.log('username: ', username);
    console.log('password: ', password);

    const result = await fetch('/api/addUser/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

    console.log(result.created);
    if (result.created) navigate('/search');
    else console.log('couldnt sign up');
  };

  return (
    <div id='signup-container'>
      <section id='signup-left'>
        <Link className='logo login-signup-logo' to='/'>
          gameHQ
        </Link>
        <p>A few clicks away from finding your next game to play!</p>
        <img src={gameCenter} alt='game-center'></img>
      </section>
      <section id='signup-right'>
        <h1>Register</h1>
        <p>Let's get you all set up so you can begin browsing through games!</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            <input id='name' type='text' required placeholder='Name' name='name' onChange={(e) => setName(e.target.value)} />
            <span>Name</span>
          </label>
          <label>
            <input id='username' type='text' required placeholder='Username' name='username' onChange={(e) => setUsername(e.target.value)} />
            <span>Username</span>
          </label>
          <label>
            <input id='password' type='password' required placeholder='Password' name='password' onChange={(e) => setPassword(e.target.value)} />
            <span>Password</span>
          </label>
          <input id='btn-submit' type='submit' value='Create Account' />
        </form>
        <p className='p2'>
          Already have an account? <Link to='/login'>Log in</Link>
        </p>
      </section>
    </div>
  );
};

export default Signup;

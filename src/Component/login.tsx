import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
const Login: FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setErrorMessage('Login successful!');
      setIsLoggedIn(true);
    } else {
      setErrorMessage('Invalid username or password');
    }
  };
  
  if (isLoggedIn) {
    navigate('/landing');
  }
  return (
    <div className={styles.rootlogin}>
      <div className={`${styles.dvlogin}`}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </div>
  );
};

export default Login;
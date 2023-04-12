import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput.jsx';
import { asyncSetAuthUser } from '../states/authUser/action.js';
import StyledGlobal from '../styles/components/StyledGlobal';
import SignCard from '../styles/components/SignCard';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    authUser = null,
  } = useSelector((states) => states);

  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  useEffect(() => {
    if (authUser !== null) {
      navigate('/');
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      asyncSetAuthUser({
        email,
        password,
        successCallback: navigate,
      }),
    );
  };

  if (authUser !== null) {
    return null;
  }

  return (
    <StyledGlobal>
      <SignCard>
        <h1>Masuk</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
          >
            Masuk
          </button>
        </form>
        <span>
          Belum punya akun?
          <Link to="/register"> Daftar</Link>
        </span>
      </SignCard>
    </StyledGlobal>
  );
}

export default Login;
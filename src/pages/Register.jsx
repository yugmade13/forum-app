import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/user/action.js';
import useInput from '../hooks/useInput.jsx';
import StyledGlobal from '../styles/components/StyledGlobal';
import SignCard from '../styles/components/SignCard';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    authUser = null,
  } = useSelector((states) => states);

  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  useEffect(() => {
    if (authUser !== null) {
      navigate('/');
    }
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(asyncRegisterUser({
      name,
      email,
      password,
      successCallback: navigate,
    }));
  };

  if (authUser !== null) {
    return null;
  }

  return (
    <StyledGlobal>
      <SignCard>
        <h1>Daftar</h1>
        <form onSubmit={handleRegister} data-testid="form">
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={handleNameChange}
          />
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
            Daftar
          </button>
        </form>
        <span>
          Sudah punya akun?
          <Link to="/login"> Masuk</Link>
        </span>
      </SignCard>
    </StyledGlobal>
  );
}

export default Register;
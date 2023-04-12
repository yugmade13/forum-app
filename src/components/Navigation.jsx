import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsChatQuoteFill } from 'react-icons/bs';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { BiLineChart, BiPlus } from 'react-icons/bi';
import { FaKiwiBird } from 'react-icons/fa';
import { asyncUnsetAuthUser } from '../states/authUser/action.js';

function Navigation() {
  const { pathname } = useLocation();

  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <>
      <nav>
        <ul>
          <Link to="/"><BsChatQuoteFill /></Link>
          <Link to="/leaderboards"><BiLineChart /></Link>
          {authUser === null
            ? <Link to="/login"><AiOutlineLogin /></Link>
            : (
              <button
                width="auto"
                type="button"
                onClick={handleLogout}
              >
                <AiOutlineLogout />
              </button>
            )}
        </ul>
        {pathname !== '/new' && !pathname.includes('/details/') && authUser ? (
          <div className="btn_new-thread">
            <Link to="/new">
              <BiPlus />
            </Link>
          </div>
        ) : null}
      </nav>
      <div className="app-bar">
        <Link to="/">
          <FaKiwiBird />
        </Link>
      </div>
    </>
  );
}

export default Navigation;
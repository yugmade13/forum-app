import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './styles/css/App.css';
import Layout from './pages/Layout.jsx';
import Home from './pages/Home';
import Leaderboards from './pages/Leaderboards.jsx';
import AddThread from './pages/AddThread.jsx';
import ThreadDetail from './pages/ThreadDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { asyncPreloadProcess } from './states/isPreload/action.js';

function App() {
  const {
    isPreload = false,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/details/:id" element={<ThreadDetail />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/new" element={<AddThread />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
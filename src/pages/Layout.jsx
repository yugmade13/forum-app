import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';
import Loading from '../components/Loading.jsx';

function Layout() {
  return (
    <div className="app-container">
      <Loading />
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
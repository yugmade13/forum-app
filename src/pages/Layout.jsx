import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';
import Loading from '../components/Loading.jsx';
import AppContainer from '../styles/components/AppContainer';

function Layout() {
  return (
    <AppContainer>
      <Loading />
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </AppContainer>
  );
}

export default Layout;
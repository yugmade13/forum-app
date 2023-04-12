import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../states';

function RenderConnected({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
}

RenderConnected.propTypes = {
  children: PropTypes.object.isRequired,
};

export default RenderConnected;
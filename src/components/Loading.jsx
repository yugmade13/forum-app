import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="app-loading">
      <LoadingBar style={{ height: '5px', background: '#4C9EEB' }} />
    </div>
  );
}

export default Loading;
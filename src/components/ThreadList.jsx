import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem.jsx';

function ThreadList({ threadList }) {
  return (
    <div className="thread-list">
      {threadList.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threadList: PropTypes.array.isRequired,
};

export default ThreadList;
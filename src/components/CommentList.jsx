import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem.jsx';

function CommentList({ comments, ref }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} ref={ref} />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  ref: PropTypes.object,
};

export default CommentList;
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { AiOutlineSend } from 'react-icons/ai';
import useInput from '../hooks/useInput.jsx';
import { asyncPopulateThreadDetail } from '../states/shared/action.js';
import { asyncAddComment } from '../states/threadDetail/action.js';

function CommentInput({ inputRef }) {
  const dispatch = useDispatch();

  const [content, handleContentChange, setContent] = useInput('');

  const handleComment = () => {
    dispatch(asyncAddComment(content));
    setContent('');

    dispatch(asyncPopulateThreadDetail());
  };

  return (
    <div className="comment-input">
      <input
        ref={inputRef}
        type="text"
        placeholder="Berikan komentar"
        value={content}
        onChange={handleContentChange}
      />
      <button
        type="button"
        onClick={handleComment}
      >
        <AiOutlineSend />
      </button>
    </div>
  );
}

CommentInput.propTypes = {
  inputRef: PropTypes.object.isRequired,
};

export default CommentInput;
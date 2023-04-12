import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsSend } from 'react-icons/bs';
import useInput from '../hooks/useInput.jsx';
import { asyncAddThread } from '../states/threads/action.js';

function AddThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    authUser = null,
  } = useSelector((states) => states);

  const [title, handleTitleChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');
  const [body, handleBodyChange] = useInput('');

  useEffect(() => {
    if (authUser === null) {
      navigate('/');
    }
  });

  const handleAddThread = (event) => {
    event.preventDefault();
    dispatch(asyncAddThread({
      title,
      category,
      body,
      successCallback: navigate,
    }));
  };

  if (authUser === null) {
    return null;
  }

  return (
    <div className="thread-new">
      <form onSubmit={handleAddThread}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={handleCategoryChange}
        />
        <textarea
          placeholder="What's Happening?"
          value={body}
          onChange={handleBodyChange}
        />
        <div className="thread-submit">
          <button
            type="submit"
            className="btn_new-thread"
          >
            <BsSend />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddThread;
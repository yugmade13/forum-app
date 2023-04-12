import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BiLike, BiDislike, BiComment } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { postedAt, filterString } from '../utils';
import {
  asyncToggleLikeThread,
  asyncToggleUnlikeThread,
  asyncToggleNeutralizeThread,
} from '../states/threads/action.js';

function ThreadItem(
  {
    id,
    title,
    body,
    category,
    createdAt,
    user,
    upVotesBy,
    downVotesBy,
    totalComments,
  },
) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    authUser = null,
  } = useSelector((states) => states);
  const userIsLike = authUser !== null ? authUser.id : '';

  const handleLike = () => {
    if (authUser === null) {
      navigate('/login');
    } else if (upVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralizeThread(id));
    } else {
      dispatch(asyncToggleLikeThread(id));
    }
  };

  const handleUnlike = () => {
    if (authUser === null) {
      navigate('/login');
    } else if (downVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralizeThread(id));
    } else {
      dispatch(asyncToggleUnlikeThread(id));
    }
  };

  return (
    <div className="thread-item">
      <ul className="category">
        <li>{category}</li>
      </ul>
      <h3>
        <Link to={`/details/${id}`}>
          {title}
          <span>{postedAt(createdAt)}</span>
        </Link>
      </h3>
      <p className="paragraph" dangerouslySetInnerHTML={{ __html: `${filterString(body)}...` }} />
      <ul className="item-action">
        <li>
          <button
            type="button"
            onClick={handleLike}
          >
            {upVotesBy.includes(userIsLike)
              ? <BiLike style={{ color: '#ef4444' }} />
              : <BiLike />}
          </button>
          <span>{upVotesBy.length}</span>
        </li>
        <li>
          <button
            type="button"
            onClick={handleUnlike}
          >
            {downVotesBy.includes(userIsLike)
              ? <BiDislike style={{ color: '#ef4444' }} />
              : <BiDislike />}
          </button>
          <span>{downVotesBy.length}</span>
        </li>
        <li>
          <Link to={`/details/${id}`}><BiComment /></Link>
          <span>{totalComments}</span>
        </li>
        <li className="owner-thread">
          <span>Dibuat oleh</span>
          <img src={user ? user.avatar : ''} alt={user ? user.name : ''} />
          <span style={{ fontWeight: '700' }}>{user ? user.name : ''}</span>
        </li>
      </ul>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default ThreadItem;
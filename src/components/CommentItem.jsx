import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiDislike, BiLike } from 'react-icons/bi';
import { postedAt } from '../utils';
import {
  asyncToggleLikeComment, asyncToggleNeutralizeComment,
  asyncToggleUnlikeComment,
} from '../states/threadDetail/action.js';

function CommentItem(
  {
    id,
    content,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
  },
) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    authUser = null,
  } = useSelector((states) => states);
  const userIsLike = authUser !== null ? authUser.id : '';

  const handleLikeComment = () => {
    if (authUser === null) {
      navigate('/login');
    } else if (upVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralizeComment(id));
    } else {
      dispatch(asyncToggleLikeComment(id));
    }
  };

  const handleUnlikeComment = () => {
    if (authUser === null) {
      navigate('/login');
    } else if (downVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralizeComment(id));
    } else {
      dispatch(asyncToggleUnlikeComment(id));
    }
  };

  return (
    <div className="comment-item">
      <header>
        <img src={owner.avatar} alt={owner.id} />
        <div>
          <h4>
            {owner.name}
            <span>{postedAt(createdAt)}</span>
          </h4>
          <span>{owner.name}</span>
        </div>
      </header>
      <div className="detail-body">
        <p className="paragraph" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <ul className="item-action">
        <li>
          <button
            type="button"
            onClick={handleLikeComment}
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
            onClick={handleUnlikeComment}
          >
            {downVotesBy.includes(userIsLike)
              ? <BiDislike style={{ color: '#ef4444' }} />
              : <BiDislike />}
          </button>
          <span>{downVotesBy.length}</span>
        </li>
      </ul>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
};

export default CommentItem;
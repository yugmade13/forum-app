import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiDislike, BiLike, BiComment } from 'react-icons/bi';
import PropTypes from 'prop-types';
import {
  asyncToggleLikeThreadDetail,
  asyncToggleUnlikeThreadDetail,
  asyncToggleNeutralizeThreadDetail,
} from '../states/threadDetail/action.js';
import { postedAt } from '../utils';

function DetailBody({ thread, handleComment }) {
  const {
    id,
    title,
    body,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
    comments,
  } = thread;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    authUser = null,
  } = useSelector((states) => states);
  const userIsLike = authUser !== null ? authUser.id : '';

  const handleLikeDetail = () => {
    if (authUser === null) {
      navigate('/login');
    } else if (upVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralizeThreadDetail(id));
    } else {
      dispatch(asyncToggleLikeThreadDetail(id));
    }
  };

  const handleUnlikeDetail = () => {
    if (authUser === null) {
      navigate('/login');
    } else if (downVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralizeThreadDetail(id));
    } else {
      dispatch(asyncToggleUnlikeThreadDetail(id));
    }
  };

  return (
    <div className="detail-thread">
      <header>
        <img src={owner.avatar} alt={owner.id} />
        <div>
          <h4>{owner.name}</h4>
          <span>{owner.name}</span>
        </div>
      </header>
      <div className="detail-body">
        <h5>{title}</h5>
        <div>
          <p className="paragraph" dangerouslySetInnerHTML={{ __html: body }} />
          <span>{postedAt(createdAt)}</span>
        </div>
      </div>
      <ul className="item-action">
        <li>
          <button
            type="button"
            onClick={handleLikeDetail}
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
            onClick={handleUnlikeDetail}
          >
            {downVotesBy.includes(userIsLike)
              ? <BiDislike style={{ color: '#ef4444' }} />
              : <BiDislike />}
          </button>
          <span>{downVotesBy.length}</span>
        </li>
        <li>
          <button
            type="button"
            onClick={handleComment}
          >
            <BiComment />
          </button>
          <span>{comments.length}</span>
        </li>
      </ul>
    </div>
  );
}

DetailBody.propTypes = {
  thread: PropTypes.object.isRequired,
  handleComment: PropTypes.func.isRequired,
};

export default DetailBody;
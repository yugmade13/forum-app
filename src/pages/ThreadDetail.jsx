import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DetailBody from '../components/DetailBody.jsx';
import CommentList from '../components/CommentList.jsx';
import CommentInput from '../components/CommentInput.jsx';
import { asyncReceiveDetailThread } from '../states/threadDetail/action.js';

function ThreadDetail() {
  const { id } = useParams();
  const {
    authUser,
    threadDetail = null,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [id, dispatch]);

  const handleComment = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    } else {
      navigate('/login');
    }
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="section-detail">
      <DetailBody thread={threadDetail} handleComment={handleComment} />
      <CommentList comments={threadDetail.comments} />
      {authUser && <CommentInput inputRef={inputRef} />}
    </section>
  );
}

export default ThreadDetail;
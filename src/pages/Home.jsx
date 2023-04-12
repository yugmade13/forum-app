import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreadList from '../components/ThreadList.jsx';
import { asyncPopulateUserAndThread } from '../states/shared/action.js';
import CategoryList from '../components/CategoryList.jsx';

function Home() {
  const dispatch = useDispatch();
  const {
    threads = [],
    users = [],
  } = useSelector((states) => states);
  const [keyword, setKeyword] = useState('All');

  useEffect(() => {
    dispatch(asyncPopulateUserAndThread());
  }, [dispatch]);

  if (threads.length <= 0) {
    return null;
  }

  const handleCategory = (key) => {
    setKeyword(key);
  };

  const threadCategory = threads
    .map(({ category }) => category)
    .filter((category, index, currentCategory) => currentCategory.indexOf(category) === index);

  const threadList = threads
    .map((thread) => ({ ...thread, user: users.find(({ id }) => id === thread.ownerId) }))
    .filter((thread) => {
      if (keyword === 'All') {
        return thread;
      }

      return thread.category === keyword;
    });

  return (
    <section>
      <CategoryList
        keyword={keyword}
        categories={threadCategory}
        handleCategory={handleCategory}
      />
      <ThreadList threadList={threadList} />
    </section>
  );
}

export default Home;
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardList from '../components/LeaderboardList.jsx';
import { asyncReceiveLeaderboards } from '../states/leaderboars/action.js';
import { sortingLeaderboards } from '../utils';

function Leaderboards() {
  const { leaderboards = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, []);

  if (leaderboards === null) {
    return null;
  }

  return (
    <section>
      <LeaderboardList leaderboards={sortingLeaderboards(leaderboards)} />
    </section>
  );
}

export default Leaderboards;
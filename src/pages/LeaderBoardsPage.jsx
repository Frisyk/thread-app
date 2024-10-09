import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeadersList from '../components/LeadersList';

export default function LeaderBoardsPage() {
  const { leaderBoards } = useSelector((state) => ({
    leaderBoards: state.leaderBoards || [],
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <LeadersList leaders={leaderBoards} />
  );
}

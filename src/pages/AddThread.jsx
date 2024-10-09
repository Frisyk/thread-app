import React from 'react';
import { useDispatch } from 'react-redux';
import AddThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

export default function AddThread() {
  const dispatch = useDispatch();

  const onAddThread = (title, desc, category = '') => {
    dispatch(asyncAddThread(title, desc, category));
  };

  return (
    <AddThreadInput addThread={onAddThread} />
  );
}

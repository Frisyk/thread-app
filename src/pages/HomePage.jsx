import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ThreadsList from '../components/ThreadsList';
import { asyncDownvoteThread, asyncUpvoteThread } from '../states/threads/action';
import AddThreadButton from '../components/AddThreadButton';

function HomePage() {
  const { threads = [], users = [], authUser } = useSelector((state) => ({
    threads: state.threads || [],
    users: state.users || [],
    authUser: state.authUser,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const upVote = (id) => {
    dispatch(asyncUpvoteThread(id));
  };

  const downVote = (id) => {
    dispatch(asyncDownvoteThread(id));
  };

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="md:w-4/5 p-2 mx-auto">
      <ThreadsList threads={threadsList} upvote={upVote} downvote={downVote} />
      <AddThreadButton />
    </section>
  );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const filteredThreads = selectedCategory === 'All'
    ? threadsList
    : threadsList.filter((thread) => thread.category === selectedCategory);

  const categories = ['All', ...new Set(threads.map((thread) => thread.category))];

  return (
    <section className="md:w-4/5 p-2 mx-auto">
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded capitalize"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ThreadsList threads={filteredThreads} upvote={upVote} downvote={downVote} />
      <AddThreadButton />
    </section>
  );
}

export default HomePage;

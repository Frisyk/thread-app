import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddThreadButton() {
  const navigate = useNavigate();
  const onAddButtonClicked = () => navigate('/add-thread');
  return (
    <button className="fixed m-5 right-0 bottom-0 px-8 py-4 rounded-xl bg-blue-800 text-blue-50" type="button" onClick={onAddButtonClicked}>+ Thread Baru</button>
  );
}

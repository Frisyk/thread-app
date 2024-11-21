import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Buttoncomp.tsx';

function AddThreadButton() {
  const navigate = useNavigate();

  const onAddButtonClicked = () => navigate('/add-thread');

  return (
    <Button
      onClick={onAddButtonClicked}
      context="+ Thread Baru"
      className="fixed m-5 right-0 bottom-0 px-8 py-4 bg-blue-800 text-blue-50 rounded-xl hover:bg-blue-600"
    />
  );
}

export default AddThreadButton;

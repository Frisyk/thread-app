import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'; 
  onClick?: () => void; 
  context: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  context,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold transition duration-200 ease-in-out ${className}`}
    >
      {context}
    </button>
  );
};

export default Button;

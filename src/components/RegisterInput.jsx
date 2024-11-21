import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Input from './ui/Inputcomp.tsx';
import Button from './ui/Buttoncomp.tsx';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="register-input space-y-4">
      <Input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Name"
      />
      <Input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
      />
      <Button
        onClick={() => register({ name, email, password })}
        context="Register"
        className="w-full bg-blue-600 text-white hover:bg-blue-500"
      />
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;

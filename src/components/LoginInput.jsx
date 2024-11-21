import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Input from './ui/Inputcomp.tsx';
import Button from './ui/Buttoncomp.tsx';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="login-input flex flex-col space-y-4 p-6 max-w-sm mx-auto bg-white">
      <Input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="email@gmail.com"
      />

      <Input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
      />

      <Button
        onClick={() => login({ email, password })}
        context="Login"
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
      />

    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;

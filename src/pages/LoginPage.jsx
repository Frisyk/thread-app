import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="login-page__hero mb-6">
        <h1 className="text-5xl font-bold text-blue-600">
          JAGONGAN.
        </h1>
      </header>

      <article className="login-page__main text-center max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          YUK
          {' '}
          <strong className="text-blue-600">LOGIN</strong>
          ,
          DULU
        </h2>

        <LoginInput login={onLogin} />

        <p className="mt-4 text-gray-600">
          Belum Punya Akun?
          {' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;

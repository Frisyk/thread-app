import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/');
  };

  return (
    <section className="register-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="register-page__hero mb-6">
        <h1 className="text-4xl font-bold text-blue-600">JAGONGAN.</h1>
      </header>

      <article className="register-page__main text-center max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Buat Akun</h2>

        <RegisterInput register={onRegister} />

        <p className="mt-4 text-gray-600">
          Sudah Punya Akun?
          {' '}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;

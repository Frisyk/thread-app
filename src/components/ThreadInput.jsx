/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import Button from './ui/Buttoncomp.tsx';

function AddThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [desc, onDescChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && desc.trim()) {
      addThread(title, desc, category);
      navigate('/');
    } else {
      alert('Semua field harus diisi!');
    }
  };

  return (
    <div className="container px-4 mt-10 mx-auto">
      <div className="mx-auto">
        <div className="max-w-md mx-auto px-8 py-6 bg-gray-100 rounded-lg md:shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tambah Thread Baru</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="judul">Judul</label>
              <input
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                placeholder="Masukkan judul thread"
                value={title}
                onChange={onTitleChange}
                type="text"
                id="judul"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="deskripsi">Deskripsi</label>
              <textarea
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                rows="4"
                value={desc}
                onChange={onDescChange}
                placeholder="Masukkan deskripsi thread"
                id="deskripsi"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="kategori">Kategori</label>
              <select
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                id="kategori"
                value={category}
                onChange={onCategoryChange}
              >
                <option value="">Pilih kategori</option>
                <option value="teknologi">Teknologi</option>
                <option value="pendidikan">Pendidikan</option>
                <option value="dicoding">Dicoding</option>
                <option value="bangkit">Bangkit</option>
              </select>
            </div>

            <Button
              type="submit"
              context="Tambahkan Thread"
              className="w-full bg-blue-800 text-blue-50 py-4 text-lg mt-5 font-bold hover:bg-blue-400"
            />

          </form>
        </div>
      </div>
    </div>
  );
}

AddThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default AddThreadInput;

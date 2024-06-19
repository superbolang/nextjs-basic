'use client';
import { useState, useEffect } from 'react';

const EditBook = ({ refreshBooks, id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [newBookTitle, setNewBookTitle] = useState('');
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const books = await res.json();
    setBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const selectedBook = books.find((book) => book.id == id);

  const handleSubmitEditBook = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch(`/api/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.get('newBookTitle'),
      }),
    });
    if (res.ok) {
      // setNewBookTitle('');
      setModalOpen(false);
      refreshBooks();
    }
  };
  return (
    <div>
      <button className='btn' onClick={() => setModalOpen(true)}>
        Edit Book
      </button>
      <dialog id='my_modal_3' className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <form method='dialog' className='modal-box' onSubmit={handleSubmitEditBook}>
          <button onClick={() => setModalOpen(false)} className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
          <h3 className='font-bold text-lg'>Book id : {id}</h3>
          <input type='text' defaultValue={selectedBook?.title} name='newBookTitle' placeholder='Enter new book title' className='input input-bordered w-full max-w-xs' required />
          <button type='submit' className='btn btn-primary'>
            Edit Book
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default EditBook;

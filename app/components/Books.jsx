'use client';
import { useState, useEffect } from 'react';
import LoadingPage from '../loading';
import AddBook from './AddBook';

import Link from 'next/link';

async function getBooks() {
  const res = fetch('http://localhost:3000/api/books');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const json = (await res).json();
  return json;
}

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [newBooklink, setNewBookLink] = useState('');
  const [newBookImage, setnewBookImage] = useState('');

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const books = await res.json();
    setBooks(books);
    setLoading(false);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  if (loading) {
    return <LoadingPage />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(query);
    setLoading(true);
    const res = await fetch(`/api/books/search?query=${query}`);
    const books = await res.json();
    setBooks(books);
    setLoading(false);
  };

  const deleteBook = async (id) => {
    const res = await fetch(`api/books/${id}`, {
      method: 'DELETE',
    });
    fetchBooks();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search Books...' value={query} onChange={(e) => setQuery(e.target.value)} className='input input-bordered w-full max-w-xs' />
        <button type='submit' className='btn btn-primary'>
          Search
        </button>
      </form>
      <AddBook refreshBooks={fetchBooks} />
      {books.map((book) => (
        <div className='card w-96 bg-base-100 shadow-xl'>
          <figure className='px-10 pt-10'>
            <img src={book.img} />
          </figure>
          <div className='card-body items-center text-center'>
            <h2 className='card-title'>{book.id}</h2>
            <p>{book.title}</p>
            <div className='card-actions'>
              <button className='btn btn-info'>
                <Link href={book.link}>See on Amazon</Link>
              </button>
              <button onClick={() => deleteBook(book.id)} className='btn btn-error'>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;

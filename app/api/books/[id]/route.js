// import books from '../data.json';
import { NextResponse } from 'next/server';

export const DELETE = async (req, { params }) => {
  const id = params.id;
  // console.log(id);
  // const index = books.findIndex((book) => book.id === id);
  // if (index !== -1) {
  //   books.splice(index, 1);
  // }
  await prisma.book.delete({ where: { id: id } });
  return new NextResponse({ 'Book deleted': id });
};

export const PATCH = async (req, { params }) => {
  const id = params.id;
  const { title } = await req.json();

  await prisma.book.update({
    where: {
      id: id,
    },
    data: {
      title: title,
    },
  });
  return new NextResponse({ 'Book updated': id });
};

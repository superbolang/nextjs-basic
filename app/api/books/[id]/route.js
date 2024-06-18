import books from '../data.json';
import { NextResponse } from 'next/server';

export const DELETE = async (request, { params }) => {
  const id = params.id;
  // console.log(id);
  // const index = books.findIndex((book) => book.id === id);
  // if (index !== -1) {
  //   books.splice(index, 1);
  // }
  await prisma.book.delete({ where: { id: id } });
  return new NextResponse({ 'Book deleted': id });
};

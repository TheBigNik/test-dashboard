import { redirect } from 'next/navigation';

export default function RootPage() {
  // This will immediately redirect the user to /products
  // when they land on the base URL (http://localhost:3000/)
  redirect('/products');
}
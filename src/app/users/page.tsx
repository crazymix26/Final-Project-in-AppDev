'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

type User = {
  id: number;
  name: string;
  username: string;
};

export default function UserList() {
  const { data, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      return res.json();
    },
    staleTime: 0, // Data is considered stale immediately
    refetchOnWindowFocus: true, // Refetch when the window regains focus
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-6">
      <h1 className="text-5xl font-extrabold text-white mb-8 text-center">User List</h1>
      <ul className="space-y-6">
        {data?.map((user) => (
          <li
            key={user.id}
            className="p-6 bg-transparent shadow-md rounded-lg hover:shadow-lg transition-shadow"
          >
            <Link
              href={`/users/${user.id}`}
              className="text-2xl font-semibold text-blue-400 hover:underline"
            >
              {user.name} <span className="text-gray-400 text-xl">(@{user.username})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

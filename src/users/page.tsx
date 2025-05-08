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
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-6">
      <h1 className="text-3xl font-extrabold text-white mb-6 text-center">User List</h1>
      <ul className="space-y-4">
        {data?.map((user) => (
          <li
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
          >
            <Link
              href={`/users/${user.id}`}
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              {user.name} <span className="text-gray-500">(@{user.username})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

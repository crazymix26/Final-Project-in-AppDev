'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function PostsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; id?: number } | null>(null);

  // Fetch posts only if the logged-in user is admin
  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      return res.json();
    },
    enabled: user?.email === 'admin@admin.com', // Only fetch posts for admin
  });

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login'); // Redirect to login page
  };

  // Show loading state while posts are being fetched
  if (postsLoading) {
    return <div>Loading...</div>;
  }

  // Restrict access to admin only
  if (user?.email !== 'admin@admin.com') {
    return (
      <div className="p-4 bg-gradient-to-b from-blue-900 to-black min-h-screen text-white text-center">
        {/* Access Denied Message */}
        <h1 className="text-5xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You do not have permission to view this page.</p>
        <br />
        <br />
        <br />
    
        {/* Login Instructions */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Login Instructions</h1>
          <p className="mb-4">
            Please use your admin or user account credentials to access this page.
          </p>
          <p className="mb-4">If you do not have access, contact the administrator.</p>
    
          {/* Login Examples (Optional Section) */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Example Accounts</h2>
            <div className="mb-4">
              <h3 className="text-xl font-bold">Admin</h3>
              <p>Email: admin@admin.com</p>
              <p>Password: admin123</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold">User</h3>
              <p>Email: Sincere@april.biz</p>
              <p>Password: Bret</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gradient-to-b from-blue-900 to-black min-h-screen">
      {/* Welcome Message */}
      <div className="mb-6 p-4 bg-blue-100 text-blue-800 rounded shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome Admin! You have full access to all posts.</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Posts */}
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="space-y-4">
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>
                <a href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
                  {post.title}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.body.substring(0, 100)}...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
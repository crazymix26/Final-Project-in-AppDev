'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function PostsPage() {
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

  // Show loading state while posts are being fetched
  if (postsLoading) {
    return <div>Loading...</div>;
  }

  // Restrict access to admin only
  if (user?.email !== 'admin@admin.com') {
    return <div>Unauthorized Access</div>;
  }

  return (
    <div className="p-4 bg-gradient-to-b from-blue-900 to-black min-h-screen "> {/* Updated background color */}
      {/* Welcome Message */}
      <div className="mb-6 p-4 bg-blue-100 text-blue-800 rounded shadow-md">
        <h1 className="text-2xl font-bold">Welcome Admin! You have full access to all posts.</h1>
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

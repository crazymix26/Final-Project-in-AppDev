'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type Post = { id: number; title: string; body: string; userId: number };
type Comment = { id: number; name: string; body: string };
type User = { id: number; name: string; email: string };

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter(); // Initialize useRouter

  const { data: post, isLoading: loadingPost } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return res.json();
    },
  });

  const { data: comments, isLoading: loadingComments } = useQuery<Comment[]>({
    queryKey: ['comments', id],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      return res.json();
    },
  });

  const { data: user, isLoading: loadingUser } = useQuery<User>({
    queryKey: ['user', post?.userId], // Include logged-in user ID
    queryFn: async () => {
      if (!post?.userId) return null;
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
      return res.json();
    },
    enabled: !!post?.userId, // Only fetch user data if userId is available
  });

  const handleLogout = () => {
    console.log('User logged out');
    // Redirect to the login page
    router.push('/login'); // Replace '/login' with the actual path to your login page
  };

  if (loadingPost || loadingComments || loadingUser) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Welcome message */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">Post Details</h1>
          {user ? (
            user.name.toLowerCase() === 'admin' ? (
              <p>Welcome back, <strong>Admin</strong>! You have full access to this page.</p>
            ) : (
              <p>Welcome back, <strong>{user.name}</strong>! Feel free to explore the post details below.</p>
            )
          ) : (
            <p>Welcome back! Feel free to explore the post details below.</p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Post details */}
      <Card className="mb-8 border border-gray-200 shadow-md">
        <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
          <CardTitle className="text-2xl font-bold">{post?.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-gray-700">{post?.body}</p>
          {user && (
            <p className="mt-4 text-sm text-gray-500">
              Posted by: <strong>{user.name}</strong> ({user.email})
            </p>
          )}
        </CardContent>
      </Card>

      {/* Comments section */}
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      {comments?.map((comment) => (
        <Card key={comment.id} className="mb-4 border border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
            <CardTitle className="text-lg font-semibold">{comment.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-600">{comment.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is admin
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const user = users.find((u: { email: string }) => u.email === email);

    if (
      (email === 'admin@admin.com' && password === 'admin123') ||
      (user && password === user.username)
    ) {
      localStorage.setItem('user', JSON.stringify(user || { email: 'admin@admin.com' }));
      if (email === 'admin@admin.com') {
        setIsAdmin(true); // Set admin flag
        router.push('/posts'); // Redirect admin to posts page
      } else if (user) {
        // Redirect user to their specific post and comments
        const userPostUrl = `/posts/${user.id}`;
        router.push(userPostUrl);
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <div className="bg-blue-950 shadow-lg rounded-lg p-8 max-w-md w-full text-white"> 
        <h1 className="text-3xl font-extrabold text-center mb-6 drop-shadow-lg">Login</h1>
        <input
          type="email"
          placeholder="User or Admin"
          className="bg-gray-700 text-white border border-gray-600 rounded p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="bg-gray-700 text-white border border-gray-600 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="flex items-center mt-2 text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white rounded p-3 w-full hover:bg-blue-600 transition"
        >
          Login
        </button>
        {isAdmin && (
          <p className="text-green-400 text-center mt-4">Welcome, Admin!</p>
        )}
        <p className="text-center mt-4 text-sm text-gray-300">
        Don&#39;t have an account?{' '}
        <a href="/register" className="text-blue-400 hover:underline">
          Register here
        </a>
      </p>
      </div>
    </div>
  );
}

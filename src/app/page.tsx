// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
      <Card className="bg-black bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-center mb-6 drop-shadow-lg">
            Welcome 👋
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg mb-10 text-gray-100">
            Dynamic-Web-Application - Explore users, posts, and more!
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/login">
              <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100">
                Register
              </Button>
            </Link>
            <Link href="/users">
              <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100">
                View Users
              </Button>
            </Link>
            <Link href="/posts">
              <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100">
                View Posts
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100">
                Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

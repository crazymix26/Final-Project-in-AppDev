// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Hero Section */}
      <section className="w-full h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-blue-900 to-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Turning bold ideas into real-world impact <span className="text-blue-400">— One Startup at a Time.</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Link href="/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
              Let&#39;s Get Started →
            </Button>
          </Link>
        </div>
      
      </section>
    </main>
  );
}

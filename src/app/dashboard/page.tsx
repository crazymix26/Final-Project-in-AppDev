'use client';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const { data: users } = useQuery({ queryKey: ['users'], queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json() });
  const { data: posts } = useQuery({ queryKey: ['posts'], queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json() });
  const { data: comments } = useQuery({ queryKey: ['comments'], queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/comments')).json() });

  if (!users || !posts || !comments) return <div className="flex items-center justify-center min-h-screen text-gray-700">Loading...</div>;

  const chartData: { series: number[]; options: ApexOptions } = {
    series: [users.length, posts.length, comments.length],
    options: {
      labels: ['Users', 'Posts', 'Comments'],
      chart: { type: 'donut' as const },
      legend: { position: 'bottom' },
      colors: ['#6366F1', '#34D399', '#F87171'],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 drop-shadow-lg">Dashboard</h1>
      <Card className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className=" text-white text-2xl font-bold text-center mb-4">Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Chart options={chartData.options} series={chartData.series} type="donut" width="400" />
        </CardContent>
      </Card>
    </div>
  );
}

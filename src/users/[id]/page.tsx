'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

mapboxgl.accessToken = 'pk.eyJ1IjoicmV5bmVpbCIsImEiOiJjbWE1Y3lpYmgwZWVrMnFzNmNmdXk0M3dqIn0.Y4DPvL7y_XyoNofkHL2rkQ';

type User = {
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
};

export default function UserProfile() {
  const { id } = useParams();
  const mapContainer = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!res.ok) throw new Error('Failed to fetch user data');
      return res.json();
    },
  });

  useEffect(() => {
    if (data && mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [parseFloat(data.address.geo.lng), parseFloat(data.address.geo.lat)],
        zoom: 9,
      });

      new mapboxgl.Marker()
        .setLngLat([parseFloat(data.address.geo.lng), parseFloat(data.address.geo.lat)])
        .addTo(map);
    }
  }, [data]);

  if (isLoading) return <p className="text-center p-10">Loading user data...</p>;

  if (isError) return <p className="text-center p-10 text-red-500">Failed to load user data.</p>;

  return (
   <Card className="max-w-md mx-auto">
  <CardHeader>
    <CardTitle>{data?.name}</CardTitle>
    <p className="text-sm text-muted-foreground">@{data?.username}</p>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <p>
        Email: <Button variant="link" asChild>
          <a href={`mailto:${data?.email}`}>{data?.email}</a>
        </Button>
      </p>
      <p>Phone: {data?.phone}</p>
      <div>
        <h3 className="text-lg font-semibold">Address:</h3>
        <p>{data?.address.street}, {data?.address.suite}</p>
        <p>{data?.address.city}, {data?.address.zipcode}</p>
      </div>
    </div>
  </CardContent>
  <div className="h-48 relative overflow-hidden rounded-md">
    <div ref={mapContainer} className="absolute inset-0" />
  </div>
</Card>
  );
}


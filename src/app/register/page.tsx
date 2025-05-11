"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef, useEffect, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Enter a valid phone number."),
  address: z.string().min(3, "Address is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const geocoderContainerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadMapboxAutocomplete = async () => {
      try {
        const mapboxgl = await import("mapbox-gl");
        const MapboxGeocoder = (await import("@mapbox/mapbox-gl-geocoder")).default;

        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        if (!accessToken) {
          console.error("Mapbox access token is missing. Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in your .env file.");
          setStatusMessage("Error: Mapbox access token is missing.");
          return;
        }

        mapboxgl.default.accessToken = accessToken;

        const map = new mapboxgl.default.Map({
          container: mapContainerRef.current!,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [120.9842, 14.5995], // Updated to Manila coordinates
          zoom: 6, // Adjusted zoom level for better view of Manila
        });

        const navControl = new mapboxgl.default.NavigationControl();
        map.addControl(navControl, "top-right");

        const marker = new mapboxgl.default.Marker();

        const geocoder = new MapboxGeocoder({
          accessToken,
          mapboxgl: mapboxgl,
          placeholder: "Search your address",
          types: "address",
          countries: "ph",
          marker: false,
        });

        if (geocoderContainerRef.current) {
          geocoderContainerRef.current.innerHTML = "";
          geocoder.addTo(geocoderContainerRef.current);
        }

        geocoder.on("result", (e) => {
          const { place_name, geometry } = e.result;
          setValue("address", place_name || "Unknown address");

          if (geometry?.coordinates) {
            const [lng, lat] = geometry.coordinates;
            map.flyTo({ center: [lng, lat], zoom: 14 });
            marker.setLngLat([lng, lat]).addTo(map);
          }
        });
      } catch (error) {
        console.error("Error loading Mapbox:", error);
        setStatusMessage("Error: Unable to load Mapbox.");
      }
    };

    loadMapboxAutocomplete();
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data); // Debugging
    try {
      const response = await fetch("/api/register/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Unknown error");
        }
        setStatusMessage("Registration successful!");
      } else {
        throw new Error("Server returned an unexpected response");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setStatusMessage(`Error: ${error instanceof Error ? error.message : "An unknown error occurred"}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-black text-white p-6 min-h-screen">
      <div className="max-w-xl mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-6">User Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" aria-label="First Name" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" aria-label="Last Name" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" aria-label="Email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" aria-label="Phone Number" {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label>Address</Label>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
            <div ref={mapContainerRef} className="h-64 rounded-md border mt-4" />
          </div>

          <div ref={geocoderContainerRef} className="geocoder-container" />

          <Button type="submit">Register</Button>
        </form>

        {statusMessage && (
          <div
            className="mt-4 p-3 rounded-md"
            style={{
              backgroundColor: statusMessage.startsWith("Error") ? "#fee2e2" : "#d1e7dd",
            }}
          >
            <p
              className="text-sm"
              style={{
                color: statusMessage.startsWith("Error") ? "#b91c1c" : "#0f5132",
              }}
            >
              {statusMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

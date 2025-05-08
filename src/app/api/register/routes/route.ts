import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { firstName, lastName, email, phone, address } = data;

  console.log("Received data:", data);

  // List of valid users
  const validUsers = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "09999999999",
      addressIncludes: "makati",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "08888888888",
      addressIncludes: "quezon",
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phone: "07777777777",
      addressIncludes: "marikina",
    },
  ];

  // Check if the user matches any valid user
  const isValidUser = validUsers.some(
    (user) =>
      user.firstName === firstName &&
      user.lastName === lastName &&
      user.email === email &&
      user.phone === phone &&
      address.toLowerCase().includes(user.addressIncludes)
  );

  if (isValidUser) {
    return NextResponse.json({ message: "User registered successfully" }, { status: 200 });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
}

import { Stack } from "@mui/material";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack className="h-screen py-12 2xl:p-16 bg-white text-black">
      <nav className="font-semibold text-base pb-8 self-center">
        <Link href="/" className="text-blue-700 flex items-center space-x-5">
          <AiFillHome className="text-2xl font-bold" />
          <p>Go Back Home</p>
        </Link>
      </nav>
      <Stack className="items-center justify-center">{children}</Stack>
    </Stack>
  );
}

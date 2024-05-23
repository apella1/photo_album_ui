"use client";

import AuthenticatedHome from "@/components/AuthenticatedHome";
import CustomButton from "@/components/ui/CustomButton";
import Link from "next/link";
import { useState } from "react";
import { FaPhotoFilm } from "react-icons/fa6";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <>
      {!isAuthenticated ? (
        <main className="px-8 md:px-16 xl:px-28 2xl:px-44 py-8 lg:h-screen flex flex-col space-y-6 bg-blue-500 text-white">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaPhotoFilm className="text-5xl" />
              <div className="font-bold text-xl">
                <h2 className="">Photo Labs</h2>
                <p className="text-base">Pictures worth 1024 words!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={"/auth/login"}
                className="text-lg hover:underline hover:underline-offset-4"
              >
                Log in
              </Link>
              <Link
                href={"/auth/login"}
                className="text-lg hover:underline hover:underline-offset-4"
              >
                Sign Up
              </Link>
            </div>
          </nav>
          <section className="self-center flex flex-col items-center justify-center space-y-8 h-full">
            <h1 className="text-5xl font-bold flex flex-col space-y-4 justify-center items-center">
              <p>View Your Photos & More</p>
              <p>In One Place</p>
            </h1>
            <p className="text-lg font-medium">
              Get an overview of all the users using the application and get
              inspired by their photos. All you need is an account.
            </p>
            <Link href={"/auth/login"}>
              <CustomButton
                className="px-16 rounded-3xl animate-pulse"
                button={{
                  title: "Get Started",
                  bgColor: "bg-pink-600",
                  textColor: "text-white",
                  type: "button",
                  rounded: true,
                }}
              />
            </Link>
          </section>
        </main>
      ) : (
        <AuthenticatedHome />
      )}
    </>
  );
}

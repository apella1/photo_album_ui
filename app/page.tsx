"use client";

import AuthenticatedHome from "@/components/AuthenticatedHome";
import CustomButton from "@/components/ui/CustomButton";
import { useAuthentication } from "@/hooks/useAuthentication";
import Link from "next/link";
import { FaPhotoFilm } from "react-icons/fa6";

export default function Home() {
  const { isAuthenticated } = useAuthentication();
  return (
    <>
      {!isAuthenticated ? (
        <main className="x-section-padding py-8 h-screen flex flex-col space-y-6 bg-[#00000f]  text-white">
          <nav className="flex items-center justify-between">
            <Link href={"/"} className="flex items-center space-x-3">
              <FaPhotoFilm className="text-5xl" />
              <div className="hidden md:block font-bold text-xl">
                <h2 className="">Photo Labs</h2>
                <p className="text-base">Pictures worth 1024 words!</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href={"/auth/login"}
                className="text-lg hover:underline hover:underline-offset-4"
              >
                Log in
              </Link>
              <Link
                href={"/auth/sign-up"}
                className="text-lg hover:underline hover:underline-offset-4"
              >
                Sign Up
              </Link>
            </div>
          </nav>
          <section className="self-center flex flex-col items-center justify-center space-y-8 h-full">
            <h1 className="text-5xl font-bold flex flex-col space-y-4 justify-center items-center text-center">
              <p>View Your Photos & More</p>
              <p>In One Place</p>
            </h1>
            <p className="text-lg font-medium text-center lg:px-44 xl:px-60">
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

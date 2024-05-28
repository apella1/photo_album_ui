"use client";

import AuthenticatedUserMenu from "@/components/AuthenticatedUserMenu";
import { useAuthentication } from "@/hooks/useAuthentication";
import Link from "next/link";
import { FaPhotoFilm } from "react-icons/fa6";

export default function UserProfile() {
  const { user } = useAuthentication();

  return (
    <section className="x-section-padding py-8 flex flex-col space-y-16">
      <nav className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center space-x-3">
          <FaPhotoFilm className="text-5xl" />
          <div className="font-bold text-xl">
            <h2 className="">Photo Labs</h2>
            <p className="text-base">Pictures worth 1024 words!</p>
          </div>
        </Link>
        <AuthenticatedUserMenu />
      </nav>
      <section className="flex flex-col space-y-6">
        <h2 className="main-title">My Profile</h2>
        <section>
          <h1>
            <span className="font-bold">Name:</span> {user?.first_name}{" "}
            {user?.last_name}
          </h1>
          <p>
            <span className="font-bold">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-bold">Username:</span> {user?.username}
          </p>
        </section>
      </section>
      <section>
        <h2 className="main-title">Albums</h2>
      </section>
    </section>
  );
}

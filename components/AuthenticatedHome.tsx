"use client";

import Link from "next/link";
import { FaPhotoFilm } from "react-icons/fa6";
import AuthenticatedUserMenu from "./AuthenticatedUserMenu";

export default function AuthenticatedHome() {
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
        <h2 className="main-title">Users</h2>
        <section>
          <Link href={`users/${1}`}>
            <div className="flex flex-col space-y-1 p-4 border border-gray-300 rounded-xl w-fit hover:border-blue-400">
              <p>
                <span className="font-semibold">Name:</span> Peter Len
              </p>
              <p>
                <span className="font-semibold">Number of Albums:</span> 7
              </p>
            </div>
          </Link>
        </section>
      </section>
    </section>
  );
}

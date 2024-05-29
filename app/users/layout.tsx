"use client";

import AuthenticatedUserMenu from "@/components/AuthenticatedUserMenu";
import Link from "next/link";
import React from "react";
import { FaPhotoFilm } from "react-icons/fa6";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="x-section-padding py-8 flex flex-col space-y-12">
      <nav className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center space-x-3">
          <FaPhotoFilm className="text-5xl" />
          <div className="hidden md:block font-bold text-xl">
            <h2 className="">Photo Labs</h2>
            <p className="text-base">Pictures worth 1024 words!</p>
          </div>
        </Link>
        <AuthenticatedUserMenu />
      </nav>
      <section>{children}</section>
    </section>
  );
}

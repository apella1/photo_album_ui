import React from "react";
import { FaPhotoFilm } from "react-icons/fa6";

export default function AuthenticatedHome() {
  return (
    <section className="x-section-padding py-8 flex flex-col space-y-16">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaPhotoFilm className="text-5xl" />
          <div className="font-bold text-xl">
            <h2 className="">Photo Labs</h2>
            <p className="text-base">Pictures worth 1024 words!</p>
          </div>
        </div>
        <div className="">
          <p className="text-lg">Hello, Peter</p>
        </div>
      </nav>
      <section>
        <h2 className="main-title">Users</h2>
        <section>
          <p>List of all users</p>
        </section>
      </section>
    </section>
  );
}

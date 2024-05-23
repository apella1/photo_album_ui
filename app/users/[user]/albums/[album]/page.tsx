import Link from "next/link";
import React from "react";

export default function UserAlbums() {
  return (
    <section className="py-8 flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="sub-title">Album Name</h2>
        <p>Top Memories</p>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="sub-title">Photos</h2>
        <div className="">
          <Link href={`/users/${1}/albums/${1}/photos/${1}`}>
            <div className="flex flex-col space-y-1 p-4 border border-gray-300 rounded-xl w-fit hover:border-blue-400">
              <p>
                <span className="font-semibold">Title:</span> Cat
              </p>
              <p className="w-[300px] h-[100px]">Preview</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import React from "react";

export default function User() {
  return (
    <section className="py-8 flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="sub-title">User Name</h2>
        <p>Peter Len</p>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="sub-title">Albums</h2>
        <div className="">
          <Link href={`/users/${1}/albums/${1}`}>
            <div className="flex flex-col space-y-1 p-4 border border-gray-300 rounded-xl w-fit hover:border-blue-400">
              <p>
                <span className="font-semibold">Title:</span> Top Memories
              </p>
              <p>
                <span className="font-semibold">Number of Photos:</span> 7
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

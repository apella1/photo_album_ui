"use client";

import { getAlbumById } from "@/lib/albums";
import { getAllPhotos } from "@/lib/photos";
import { DBPhoto } from "@/types/photo";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function UserAlbums() {
  const pathname = usePathname();
  const albumId = pathname.split("/")[4];

  const albumQuery = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => getAlbumById(albumId),
  });

  const photosQuery = useQuery({
    queryKey: ["photos"],
    queryFn: getAllPhotos,
  });

  return (
    <>
      {albumQuery.isLoading ? (
        <p className="text-xl font-medium">Fetching album...</p>
      ) : albumQuery.isError ? (
        <p className="text-xl font-medium">Album not found.</p>
      ) : (
        <section className="py-8 flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="sub-title">Album Name</h2>
            <p>{albumQuery.data.title}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="sub-title">Photos</h2>
            <div className="">
              {photosQuery.isLoading ? (
                <p>Fetching album&apos;s photos...</p>
              ) : photosQuery.data.length === 0 ? (
                <section className="flex flex-col space-y-4">
                  <p>{albumQuery.data.title} has no photos yet.</p>
                  <Link
                    href={`/users/${albumQuery.data.user_id}/albums/${albumQuery.data.id}/photos/create`}
                    className="bg-pink-500 px-16 py-2.5 rounded-xl w-fit"
                  >
                    Add Photo
                  </Link>
                </section>
              ) : (
                <section>
                  {photosQuery.data?.filter(
                    (photo: DBPhoto) => photo?.album_id === albumQuery.data?.id,
                  ).length == 0 ? (
                    <section className="flex flex-col space-y-4">
                      <p>{albumQuery.data.title} has no photos yet.</p>
                      <Link
                        href={`/users/${albumQuery.data.user_id}/albums/${albumQuery.data.id}/photos/create`}
                        className="bg-pink-500 px-16 py-2.5 rounded-xl w-fit"
                      >
                        Add Photo
                      </Link>
                    </section>
                  ) : (
                    <section className="flex flex-col gap-5">
                      <Link
                        href={`/users/${albumQuery.data.user_id}/albums/${albumQuery.data.id}/photos/create`}
                        className="bg-pink-500 px-16 py-2.5 rounded-xl w-fit"
                      >
                        Add Photo
                      </Link>

                      <section className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
                        {photosQuery.data
                          ?.filter(
                            (photo: DBPhoto) =>
                              photo?.album_id === albumQuery.data?.id,
                          )
                          .map((photo: DBPhoto) => (
                            <Link
                              href={`/users/${photo.user_id}/albums/${photo.album_id}/photos/${photo.id}`}
                              key={photo.id}
                            >
                              <div className="flex flex-col space-y-1 p-4 border border-gray-300 rounded-xl w-full md:w-fit hover:border-blue-400">
                                <p>
                                  <span className="font-semibold">Title:</span>
                                  <p>{photo.title}</p>
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Number of Photos:
                                  </span>{" "}
                                  {photosQuery.isLoading ? (
                                    <p>
                                      Fetching {`${photo.title}'s`} photos...
                                    </p>
                                  ) : photosQuery.data.length === 0 ? (
                                    <p>0</p>
                                  ) : (
                                    <p>
                                      {
                                        photosQuery.data.filter(
                                          (photo: DBPhoto) =>
                                            photo.album_id === photo.id,
                                        ).length
                                      }
                                    </p>
                                  )}
                                </p>
                              </div>
                            </Link>
                          ))}
                      </section>
                    </section>
                  )}
                </section>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

"use client";

import { getAlbumById } from "@/lib/albums";
import { getAllPhotos } from "@/lib/photos";
import { DBPhoto } from "@/types/photo";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function UserAlbums({ params }: { params: { slug: string } }) {
  const albumQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getAlbumById(params.slug),
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
            <h2 className="sub-title">Albums</h2>
            <div className="">
              {photosQuery.isLoading ? (
                <p>Fetching album&apos;s photos...</p>
              ) : photosQuery.data.length === 0 ? (
                <p>{albumQuery.data.title} has no photos yet.</p>
              ) : (
                <section>
                  {photosQuery.data?.filter(
                    (photo: DBPhoto) => photo?.album_id === albumQuery.data?.id,
                  ).length == 0 ? (
                    <p>{albumQuery.data.title} has no photos yet.</p>
                  ) : (
                    <section>
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
                            <div className="flex flex-col space-y-1 p-4 border border-gray-300 rounded-xl w-fit hover:border-blue-400">
                              <p>
                                <span className="font-semibold">Title:</span>
                                <p>{photo.title}</p>
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Number of Photos:
                                </span>{" "}
                                {photosQuery.isLoading ? (
                                  <p>Fetching {`${photo.title}'s`} photos...</p>
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

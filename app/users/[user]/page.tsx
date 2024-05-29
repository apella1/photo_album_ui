"use client";

import { getAllAlbums } from "@/lib/albums";
import { getAllPhotos } from "@/lib/photos";
import { getUserById } from "@/lib/users";
import { DBAlbum } from "@/types/album";
import { DBPhoto } from "@/types/photo";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function User() {
  const pathname = usePathname();
  const userId = pathname.split("/")[2];

  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  const albumsQuery = useQuery({
    queryKey: ["albums"],
    queryFn: getAllAlbums,
  });

  const photosQuery = useQuery({
    queryKey: ["photos"],
    queryFn: getAllPhotos,
  });

  return (
    <>
      {userQuery.isLoading ? (
        <p className="text-xl font-medium">Fetching user...</p>
      ) : userQuery.isError ? (
        <p className="text-xl">User not found.</p>
      ) : (
        <section className="py-8 flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="sub-title">User Name</h2>
            <p>
              {userQuery.data?.first_name} {userQuery.data?.last_name}
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="sub-title">Albums</h2>
            <div className="">
              {albumsQuery.isLoading ? (
                <p>Fetching {`${userQuery.data.first_name}'s`} albums...</p>
              ) : albumsQuery.data.length === 0 ? (
                <p>{userQuery.data.first_name} has no albums yet.</p>
              ) : (
                <section>
                  {albumsQuery.data?.filter(
                    (album: DBAlbum) => album?.user_id === userId,
                  ).length == 0 ? (
                    <p>{userQuery.data?.first_name} has no albums yet.</p>
                  ) : (
                    <section>
                      {albumsQuery.data
                        ?.filter((album: DBAlbum) => album?.user_id === userId)
                        .map((album: DBAlbum) => (
                          <Link
                            href={`/users/${userId}/albums/${album.id}`}
                            key={album.id}
                          >
                            <div className="flex flex-col space-y-1 p-4 border border-gray-300 rounded-xl w-fit hover:border-blue-400">
                              <p>
                                <span className="font-semibold">Title:</span>
                                <p>{album.title}</p>
                              </p>
                              <p className="flex items-center space-x-3">
                                <span className="font-semibold">
                                  Number of Photos:
                                </span>{" "}
                                {photosQuery.isLoading ? (
                                  <p>Fetching {`${album.title}'s`} photos...</p>
                                ) : photosQuery.data.length === 0 ? (
                                  <p>0</p>
                                ) : (
                                  <p>
                                    {
                                      photosQuery.data.filter(
                                        (photo: DBPhoto) =>
                                          photo.album_id === album.id,
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

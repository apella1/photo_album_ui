"use client";

import AuthenticatedUserMenu from "@/components/AuthenticatedUserMenu";
import { useAuthentication } from "@/hooks/useAuthentication";
import { getAllAlbums } from "@/lib/albums";
import { getAllPhotos } from "@/lib/photos";
import { DBAlbum } from "@/types/album";
import { DBPhoto } from "@/types/photo";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaPhotoFilm } from "react-icons/fa6";

export default function UserProfile() {
  const { user } = useAuthentication();
  const albumsQuery = useQuery({
    queryKey: ["albums"],
    queryFn: getAllAlbums,
  });

  const photosQuery = useQuery({
    queryKey: ["photos"],
    queryFn: getAllPhotos,
  });

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
      <section className="flex flex-col space-y-4">
        <h2 className="main-title">Albums</h2>
        <div className="">
          {albumsQuery.isLoading ? (
            <p className="text-xl font-medium">Fetching your albums...</p>
          ) : albumsQuery.data.length === 0 ? (
            <p>You don&apos;t have any albums.</p>
          ) : (
            <section className="">
              {albumsQuery.data?.filter(
                (album: DBAlbum) => album?.user_id === user?.id,
              ).length == 0 ? (
                <p>You don&apos;t have any albums.</p>
              ) : (
                <section>
                  {albumsQuery.data
                    ?.filter((album: DBAlbum) => album?.user_id === user?.id)
                    .map((album: DBAlbum) => (
                      <Link
                        href={`/users/${user?.id}/albums/${album.id}`}
                        key={album.id}
                      >
                        <div className="flex flex-col space-y-1 p-4 border border-gray-300 rounded-xl w-fit hover:border-blue-400">
                          <p className="flex items-center space-x-3">
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
      </section>
    </section>
  );
}

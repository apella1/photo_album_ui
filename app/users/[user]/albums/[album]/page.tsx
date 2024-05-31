"use client";

import RenderImages from "@/components/RenderImages";
import { useAuthentication } from "@/hooks/useAuthentication";
import { deleteAlbum, getAlbumById } from "@/lib/albums";
import { getAllPhotos } from "@/lib/photos";
import { DBPhoto } from "@/types/photo";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function UserAlbums() {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuthentication();
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

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      const res = await deleteAlbum(albumId);
      console.log(res);
      if (res.status === 200) {
        router.push(`/users/${user?.id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <>
      {albumQuery.isLoading ? (
        <p className="text-xl font-medium">Fetching album...</p>
      ) : albumQuery.isError ? (
        <p className="text-xl font-medium">Album not found.</p>
      ) : (
        <section className="py-8 flex flex-col space-y-6">
          <section className="flex justify-between items-center">
            <div className="flex flex-col space-y-2">
              <h2 className="sub-title">Album Name</h2>
              <p>{albumQuery.data.title}</p>
            </div>
            {user?.id === albumQuery.data?.user_id && (
              <button
                className="px-6 py-1.5 bg-pink-500 text-white rounded-lg"
                onClick={handleDelete}
                disabled={isDeleteLoading}
              >
                Delete Album
              </button>
            )}
          </section>
          <div className="flex flex-col space-y-2">
            <h2 className="sub-title">Photos</h2>
            <div className="">
              {photosQuery.isLoading ? (
                <p>Fetching album&apos;s photos...</p>
              ) : photosQuery.data.length === 0 ? (
                <section className="flex flex-col space-y-4">
                  <p>{albumQuery.data.title} has no photos yet.</p>
                  {albumQuery.data.user_id === user?.id && (
                    <Link
                      href={`/users/${albumQuery.data.user_id}/albums/${albumQuery.data.id}/photos/create`}
                      className="bg-pink-500 px-16 py-2.5 rounded-xl w-fit"
                    >
                      Add Photo
                    </Link>
                  )}
                </section>
              ) : (
                <section>
                  {photosQuery.data?.filter(
                    (photo: DBPhoto) => photo?.album_id === albumQuery.data?.id,
                  ).length == 0 ? (
                    <section className="flex flex-col space-y-4">
                      <p>{albumQuery.data.title} has no photos yet.</p>
                      {albumQuery.data.user_id === user?.id && (
                        <Link
                          href={`/users/${albumQuery.data.user_id}/albums/${albumQuery.data.id}/photos/create`}
                          className="bg-pink-500 px-16 py-2.5 rounded-xl w-fit"
                        >
                          Add Photo
                        </Link>
                      )}
                    </section>
                  ) : (
                    <section className="flex flex-col gap-5">
                      {albumQuery.data.user_id === user?.id && (
                        <Link
                          href={`/users/${albumQuery.data.user_id}/albums/${albumQuery.data.id}/photos/create`}
                          className="bg-pink-500 px-16 py-2.5 rounded-xl w-fit"
                        >
                          Add Photo
                        </Link>
                      )}
                      <section className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 md:gap-8">
                        <RenderImages
                          photos={photosQuery.data}
                          album={albumQuery.data}
                        />
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

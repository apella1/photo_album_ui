"use client";

import { useAuthentication } from "@/hooks/useAuthentication";
import { deletePhoto, getPhoto, updatePhotoTitle } from "@/lib/photos";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function PhotoDetails() {
  const { user } = useAuthentication();
  const pathname = usePathname();
  const photoId = pathname.split("/")[6];
  const photoQuery = useQuery({
    queryKey: ["photo", photoId],
    queryFn: () => getPhoto(photoId),
  });

  const router = useRouter();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(photoQuery.data?.title);
  const handleEdit = () => {
    setEdit(true);
  };

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleTitleUpdate = async () => {
    setIsUpdateLoading(true);
    try {
      const res = await updatePhotoTitle(photoId, { title: title });
      if (res.status == 200) {
        setTitle(title);
        setEdit(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      const res = await deletePhoto(photoId);
      if (res.status == 200) {
        setEdit(false);
        router.push(`/users/${user?.id}/albums/${photoQuery.data?.album_id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <>
      {photoQuery.isLoading ? (
        <p>Fetching photo...</p>
      ) : photoQuery.isError ? (
        <p className="text-xl">Photo not found.</p>
      ) : (
        <section className="p-8 flex flex-col gap-12 border border-gray-300 lg:h-[80vh] rounded-xl">
          <section className="flex items-center justify-center space-x-32">
            <div className="self-center flex items-center space-x-3">
              <h2 className="sub-title">Title: </h2>
              {edit === false ? (
                <p className="text-lg">{photoQuery.data?.title}</p>
              ) : (
                <input
                  value={title}
                  onChange={handleTitleChange}
                  name="title"
                  className="border border-gray-300 py-1.5 px-2 text-black placeholder:text-black"
                />
              )}
              {user?.id === photoQuery.data?.user_id && edit === false && (
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={handleEdit}
                >
                  <FaEdit className="text-xl" />
                  <p>Edit</p>
                </div>
              )}
              {user?.id === photoQuery.data.user_id && edit === true && (
                <button
                  className="px-6 py-1.5 bg-pink-500 text-white rounded-lg disabled:bg-gray-300 disabled:text-black"
                  onClick={handleTitleUpdate}
                  disabled={isUpdateLoading}
                >
                  Save
                </button>
              )}
            </div>
            {user?.id === photoQuery.data?.user_id && (
              <button
                className="px-6 py-1.5 bg-pink-500 text-white rounded-lg"
                onClick={handleDelete}
                disabled={isDeleteLoading}
              >
                Delete Image
              </button>
            )}
          </section>
          <div className="self-center flex flex-col space-y-2">
            <Image
              src={photoQuery.data?.image_url}
              height={800}
              width={800}
              alt={photoQuery.data?.title}
            />
          </div>
        </section>
      )}
    </>
  );
}

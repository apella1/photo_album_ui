"use client";

import { useAuthentication } from "@/hooks/useAuthentication";
import { deletePhoto, getPhoto, updatePhotoTitle } from "@/lib/photos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

export default function PhotoDetails() {
  const queryClient = useQueryClient();
  const { user } = useAuthentication();
  const pathname = usePathname();
  const photoId = pathname.split("/")[6];
  const photoQuery = useQuery({
    queryKey: ["photo", photoId],
    queryFn: () => getPhoto(photoId),
  });

  const router = useRouter();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const handleEdit = () => {
    setEdit(true);
  };

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  useEffect(() => {
    if (photoQuery.data?.title) {
      setTitle(photoQuery.data.title);
    }
  }, [photoQuery.data?.title]);

  const titleUpdate = useMutation({
    mutationFn: () => updatePhotoTitle(photoId, { title: title }),
    onSuccess: () => {
      toast.success("Photo title updated successfully.");
      setTitle(title);
      setEdit(false);
      queryClient.invalidateQueries({ queryKey: ["photo", photoId] });
      setIsUpdateLoading(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error updating photo!");
    },
  });

  const handleTitleUpdate = async () => {
    setIsUpdateLoading(true);
    titleUpdate.mutate();
  };

  const photoDelete = useMutation({
    mutationFn: () => deletePhoto(photoId),
    onSuccess: () => {
      toast.success("Photo deleted successfully.");
      setIsDeleteLoading(false);
      router.push(`/users/${user?.id}/albums/${photoQuery.data?.album_id}`);
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error deleting photo!");
    },
  });

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    photoDelete.mutate();
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

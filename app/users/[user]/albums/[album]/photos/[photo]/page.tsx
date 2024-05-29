"use client";

import { getPhoto, updatePhotoTitle } from "@/lib/photos";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function PhotoDetails({ params }: { params: { slug: string } }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const photoQuery = useQuery({
    queryKey: ["photo"],
    queryFn: () => getPhoto(params.slug),
  });

  const handleTitleUpdate = async () => {
    try {
      const res = await updatePhotoTitle(params.slug, { title: title });
      if (res.status == 200) {
        setTitle(title);
        setEdit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {photoQuery.isLoading ? (
        <p>Fetching photo...</p>
      ) : photoQuery.isError ? (
        <p className="text-xl">Photo not found.</p>
      ) : (
        <section className="p-8 flex flex-col space-y-6 border border-gray-300 lg:h-[80vh] rounded-xl">
          <div className="self-center flex items-center space-x-3">
            <h2 className="sub-title">Title: </h2>
            {!edit ? (
              <p className="text-lg">Photo Title</p>
            ) : (
              <input
                value={photoQuery.data?.title}
                onChange={handleTitleChange}
                name="title"
                className="border border-gray-300 py-1.5 px-2"
              />
            )}
            {!edit && (
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={handleEdit}
              >
                <FaEdit className="text-xl" />
                <p>Edit</p>
              </div>
            )}
            {edit && (
              <button
                className="px-6 py-1.5 bg-pink-500 text-white rounded-lg"
                onClick={handleTitleUpdate}
              >
                Save
              </button>
            )}
          </div>
          <div className="self-center flex flex-col space-y-2">
            <Image
              src={photoQuery.data?.body}
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

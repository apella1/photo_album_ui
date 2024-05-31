"use client";

import { client } from "@/lib/axios";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function UploadPhoto() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const pathname = usePathname();
  const albumId = pathname.split("/")[4];
  const userId = pathname.split("/")[2];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "file" && e.target.files) {
      setFile(e.target.files[0]);
    } else {
      setTitle(e.target.value);
    }
  };

  const router = useRouter();

  const createPhoto = useMutation({
    mutationFn: async (data: FormData) => {
      data.append("title", title);
      if (file) {
        data.append("photo", file);
      }

      await client.post(`/albums/${albumId}/photos`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      toast.success("Photo uploaded successfully.");
      queryClient.invalidateQueries({ queryKey: ["photos", albumId] });
      setIsLoading(false);
      router.push(`/users/${userId}/albums/${albumId}`);
    },
    onError: (error) => {
      setError("File size exceeds 400KB limit!");
      console.error(error.message);
      setIsLoading(false);
      toast.error("File size exceeds 400KB limit!");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    createPhoto.mutate(new FormData(e.currentTarget));
  };

  return (
    <section className="flex flex-col space-y-4 pt-8">
      <h1 className="main-title">Upload Photo</h1>
      <form
        action=""
        className="flex flex-col gap-6 w-full md:w-[80%] xl:w-[50%]"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500">{error}</p>}
        <TextField
          color="info"
          required
          label="Title"
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className="bg-white"
        />
        <input type="file" name="file" onChange={handleChange} />
        <button
          className="w-full bg-pink-500 px-8  py-2.5 text-center disabled:bg-gray-300 disabled:text-black"
          type="submit"
          disabled={isLoading}
        >
          Save
        </button>
      </form>
    </section>
  );
}

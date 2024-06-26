"use client";

import { createAlbum } from "@/lib/albums";
import { client } from "@/lib/axios";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateAlbum() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const router = useRouter();

  const albumCreate = useMutation({
    mutationFn: () => createAlbum({ title: title }),
    onSuccess: () => {
      toast.success("Album created successfully.");
      router.push("/profile");
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      setIsLoading(false);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Error creating photo!");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    albumCreate.mutate();
  };

  return (
    <section className="flex flex-col space-y-4 pt-8">
      <h1 className="main-title">Create Album</h1>
      <form
        action=""
        className="flex flex-col gap-6 w-full md:w-[80%] xl:w-[50%]"
        onSubmit={handleSubmit}
      >
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

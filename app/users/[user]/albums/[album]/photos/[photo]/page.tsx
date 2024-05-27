"use client";

import { ChangeEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function PhotoDetails() {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("Photo Title");
  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleTitleUpdate = () => {
    setTitle(title);
    setEdit(false);
  };

  return (
    <section className="p-8 flex flex-col space-y-6 border border-gray-300 lg:h-[80vh] rounded-xl">
      <div className="self-center flex items-center space-x-3">
        <h2 className="sub-title">Title: </h2>
        {!edit ? (
          <p className="text-lg">Photo Title</p>
        ) : (
          <input
            value={title}
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
        <p>Picture</p>
      </div>
    </section>
  );
}

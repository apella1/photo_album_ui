import { DBAlbum } from "@/types/album";
import { DBPhoto } from "@/types/photo";
import Image from "next/image";
import Link from "next/link";

export default function RenderImages({
  photos,
  album,
}: {
  photos: DBPhoto[];
  album: DBAlbum;
}) {
  return (
    <>
      {photos
        ?.filter((photo: DBPhoto) => photo?.album_id === album.id)
        .map((photo: DBPhoto) => {
          return (
            <Link
              href={`/users/${photo.user_id}/albums/${photo.album_id}/photos/${photo.id}`}
              key={photo.id}
            >
              <div className="flex flex-col gap-6 p-4 border border-gray-300 rounded-xl w-full md:w-fit hover:border-blue-400">
                <p className="flex items-center space-x-3 text-nowrap">
                  <span className="font-semibold">Title:</span>
                  <p>{photo.title}</p>
                </p>
                <Image
                  src={photo.image_url}
                  alt={photo.title}
                  width={200}
                  height={200}
                />
              </div>
            </Link>
          );
        })}
    </>
  );
}

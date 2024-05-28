import { getAllAlbums } from "@/lib/albums";
import { getUsers } from "@/lib/users";
import { DBAlbum } from "@/types/album";
import { DBUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaPhotoFilm } from "react-icons/fa6";
import AuthenticatedUserMenu from "./AuthenticatedUserMenu";

export default function AuthenticatedHome() {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const albumsQuery = useQuery({
    queryKey: ["albums"],
    queryFn: getAllAlbums,
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
        <h2 className="main-title">Users</h2>
        <section>
          {usersQuery.isLoading ? (
            <p>Loading users...</p>
          ) : usersQuery.data.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <section className="grid grid-cols-4 gap-8">
              {usersQuery.data.map((user: DBUser) => (
                <Link href={`users/${user.id}`} key={user.id}>
                  <div className="flex flex-col space-y-2 p-4 border border-gray-300 rounded-xl w-fit hover:border-blue-400">
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="flex items-center space-x-3">
                      <span className="font-semibold">Number of Albums:</span>{" "}
                      {albumsQuery.isLoading ? (
                        <p>Fetching {`${user.first_name}'s`} albums...</p>
                      ) : albumsQuery.data.length === 0 ? (
                        <p>0</p>
                      ) : (
                        <p>
                          {
                            albumsQuery.data.filter(
                              (album: DBAlbum) => album.user_id === user.id,
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
      </section>
    </section>
  );
}

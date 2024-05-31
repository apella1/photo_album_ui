import UserAlbums from "@/app/users/[user]/albums/[album]/page";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
// @ts-ignore
import { vi } from "vitest";

vi.mock("@/lib/albums", () => ({
  deleteAlbum: vi.fn(),
  getAlbumById: vi.fn(),
}));

vi.mock("@/lib/photos", () => ({
  getAllPhotos: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));

vi.mock("@/hooks/useAuthentication", () => ({
  useAuthentication: vi.fn(),
}));

describe("UserAlbums component", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/users/1/albums/1");
    vi.mocked(useRouter).mockReturnValue({
      push: vi.fn(),
    });
  });

  it("displays loading state when fetching album", async () => {
    vi.mocked(useQuery)
      .mockReturnValueOnce({ isLoading: true })
      .mockReturnValue({});

    vi.mocked(useAuthentication).mockReturnValue({ user: null });

    render(<UserAlbums />);

    expect(await screen.findByText("Fetching album...")).toBeInTheDocument();
  });

  it("displays 'Album not found.' message when album query fails", async () => {
    vi.mocked(useQuery)
      .mockReturnValueOnce({ isError: true })
      .mockReturnValue({});

    vi.mocked(useAuthentication).mockReturnValue({ user: null });

    render(<UserAlbums />);

    expect(await screen.findByText("Album not found.")).toBeInTheDocument();
  });

  it("displays album title when album query succeeds", async () => {
    const albumData = {
      id: 1,
      title: "My Album",
      user_id: 1,
    };
    // @ts-ignore
    const photosData = [];
    const userData = { id: 1 };

    vi.mocked(useAuthentication).mockReturnValue({ user: userData });
    vi.mocked(useQuery)
      .mockReturnValueOnce({ data: albumData, isLoading: false })
      // @ts-ignore
      .mockReturnValueOnce({ data: photosData, isLoading: false });

    render(<UserAlbums />);

    expect(await screen.findByText("Album Name")).toBeInTheDocument();
    expect(screen.getByText("My Album")).toBeInTheDocument();
  });

  it("displays loading state for photos", async () => {
    const albumData = {
      id: 1,
      title: "My Album",
      user_id: 1,
    };
    vi.mocked(useQuery)
      .mockReturnValueOnce({ data: albumData, isLoading: false })
      .mockReturnValueOnce({ isLoading: true });

    vi.mocked(useAuthentication).mockReturnValue({ user: null });

    render(<UserAlbums />);

    expect(
      await screen.findByText("Fetching album's photos..."),
    ).toBeInTheDocument();
  });

  it("displays 'no photos' message when album has no photos", async () => {
    const albumData = {
      id: 1,
      title: "My Album",
      user_id: 1,
    };
    // @ts-ignore
    const photosData = [];
    const userData = { id: 1 };

    vi.mocked(useAuthentication).mockReturnValue({ user: userData });
    vi.mocked(useQuery)
      .mockReturnValueOnce({ data: albumData, isLoading: false })
      // @ts-ignore
      .mockReturnValueOnce({ data: photosData, isLoading: false });

    render(<UserAlbums />);

    expect(
      await screen.findByText("My Album has no photos yet."),
    ).toBeInTheDocument();
  });
});

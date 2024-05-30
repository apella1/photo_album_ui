import { render, screen, waitFor, within } from "@testing-library/react";
import User from "@/app/users/[user]/page";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
// @ts-ignore
import { vi } from "vitest";

vi.mock("@/lib/albums", () => ({
  getAllAlbums: vi.fn(),
}));

vi.mock("@/lib/photos", () => ({
  getAllPhotos: vi.fn(),
}));

vi.mock("@/lib/users", () => ({
  getUserById: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

describe("User component", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/users/1");
  });

  it("displays loading state when fetching user", async () => {
    vi.mocked(useQuery)
      .mockReturnValueOnce({ isLoading: true })
      .mockReturnValue({});

    render(<User />);

    expect(await screen.findByText("Fetching user...")).toBeInTheDocument();
  });

  it("displays 'User not found.' message when user query fails", async () => {
    vi.mocked(useQuery)
      .mockReturnValueOnce({ isError: true })
      .mockReturnValue({});

    render(<User />);

    expect(await screen.findByText("User not found.")).toBeInTheDocument();
  });

  it("displays user name when user query succeeds", async () => {
    const userData = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
    };
    vi.mocked(useQuery)
      .mockReturnValueOnce({ data: userData, isLoading: false })
      .mockReturnValueOnce({ data: [], isLoading: false }) // albumsQuery
      .mockReturnValueOnce({ data: [], isLoading: false }); // photosQuery

    render(<User />);

    expect(await screen.findByText("User Name")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("displays loading state for albums", async () => {
    const userData = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
    };
    vi.mocked(useQuery)
      .mockReturnValueOnce({ data: userData, isLoading: false })
      .mockReturnValueOnce({ isLoading: true })
      .mockReturnValue({});

    render(<User />);

    expect(
      await screen.findByText("Fetching John's albums..."),
    ).toBeInTheDocument();
  });

  it("displays 'no albums' message when user has no albums", async () => {
    const userData = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
    };
    vi.mocked(useQuery)
      .mockReturnValueOnce({ data: userData, isLoading: false })
      .mockReturnValueOnce({ data: [], isLoading: false })
      .mockReturnValue({});

    render(<User />);

    expect(
      await screen.findByText("John has no albums yet."),
    ).toBeInTheDocument();
  });
});

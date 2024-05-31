import PhotoDetails from "@/app/users/[user]/albums/[album]/photos/[photo]/page";
import { useAuthentication } from "@/hooks/useAuthentication";
import { deletePhoto } from "@/lib/photos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
// @ts-ignore
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock("@/hooks/useAuthentication", () => ({
  useAuthentication: vi.fn(),
}));

vi.mock("@/lib/photos", () => ({
  deletePhoto: vi.fn(),
  getPhoto: vi.fn(),
  updatePhotoTitle: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));

describe("PhotoDetails component", () => {
  const mockUser = { id: 1 };
  const mockPhoto = {
    id: 1,
    title: "Photo Title",
    user_id: 1,
    album_id: 1,
    image_url: "/path/to/image.jpg",
  };

  beforeEach(() => {
    vi.mocked(useAuthentication).mockReturnValue({ user: mockUser });
    vi.mocked(usePathname).mockReturnValue("/users/1/albums/1/photos/1");
    vi.mocked(useRouter).mockReturnValue({ push: vi.fn() });
    vi.mocked(useQueryClient).mockReturnValue({
      invalidateQueries: vi.fn(),
    });
  });

  it("renders loading state when fetching photo", () => {
    vi.mocked(useQuery).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<PhotoDetails />);

    expect(screen.getByText("Fetching photo...")).toBeInTheDocument();
  });

  it("renders error message when photo is not found", () => {
    vi.mocked(useQuery).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    render(<PhotoDetails />);

    expect(screen.getByText("Photo not found.")).toBeInTheDocument();
  });

  it("displays photo details correctly when data is fetched successfully", () => {
    vi.mocked(useQuery).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockPhoto,
    });

    render(<PhotoDetails />);

    expect(screen.getByText("Title:")).toBeInTheDocument();
    expect(screen.getByText("Photo Title")).toBeInTheDocument();
    expect(screen.getByAltText("Photo Title")).toBeInTheDocument();
  });
  it("handles the photo deletion correctly", async () => {
    const mockRouterPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ push: mockRouterPush });
    vi.mocked(useQuery).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockPhoto,
    });

    // @ts-ignore
    vi.mocked(useMutation).mockImplementation(({ onSuccess }) => ({
      mutate: async () => {
        await onSuccess();
      },
    }));

    render(<PhotoDetails />);

    vi.mocked(deletePhoto).mockResolvedValue({ status: 200 });

    fireEvent.click(screen.getByText("Delete Image"));

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/users/1/albums/1");
    });
  });
});

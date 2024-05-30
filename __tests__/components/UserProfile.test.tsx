import { render, screen } from "@testing-library/react";
import UserProfile from "@/app/profile/page";
// @ts-ignore
import { vi } from "vitest";

vi.mock("@/hooks/useAuthentication", () => ({
  useAuthentication: () => ({
    user: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      username: "johndoe",
    },
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("UserProfile component", () => {
  it("renders without crashing", async () => {
    render(<UserProfile />);
    expect(
      await screen.findByRole("heading", { name: /My Profile/i }),
    ).toBeInTheDocument();
  });

  it("displays user's profile information correctly", async () => {
    render(<UserProfile />);
    const namePart = screen.getByText("Name:");
    const emailPart = screen.getByText("Email:");
    const usernamePart = screen.getByText("Username:");

    expect(namePart).toBeInTheDocument();
    expect(emailPart).toBeInTheDocument();
    expect(usernamePart).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
  });

  it("displays 'Add Album' button when user has albums", async () => {
    vi.mock("@tanstack/react-query", () => ({
      useQuery: () => ({
        isLoading: false,
        data: [{ id: 1, title: "Album 1" }],
      }),
    }));

    render(<UserProfile />);
    expect(
      await screen.findByRole("link", { name: /Add Album/i }),
    ).toBeInTheDocument();
  });

  it("displays user's albums correctly", async () => {
    vi.mock("@tanstack/react-query", () => ({
      useQuery: () => ({
        isLoading: false,
        data: [{ id: 1, title: "Album 1", user_id: 1 }],
      }),
    }));

    render(<UserProfile />);
    expect(await screen.findByText("Album 1")).toBeInTheDocument();
  });
});

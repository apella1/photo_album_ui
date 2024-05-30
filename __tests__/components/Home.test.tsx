import { render, screen } from "@testing-library/react";
import Home from "../../app/page";
import { useAuthentication } from "../../hooks/useAuthentication";
// @ts-ignore
import { vi } from "vitest";

vi.mock("../../hooks/useAuthentication");

vi.mock("../../components/AuthenticatedHome", () => ({
  __esModule: true,
  default: () => <div>Authenticated Home Component</div>,
}));

describe("Home component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the public view when not authenticated", () => {
    (useAuthentication as jest.Mock).mockReturnValue({
      isAuthenticated: false,
    });

    render(<Home />);

    expect(screen.getByText("Photo Labs")).toBeInTheDocument();
    expect(screen.getByText("Pictures worth 1024 words!")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("View Your Photos & More")).toBeInTheDocument();
    expect(screen.getByText("In One Place")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();

    expect(
      screen.queryByText("Authenticated Home Component"),
    ).not.toBeInTheDocument();
  });

  it("renders the authenticated view when authenticated", () => {
    (useAuthentication as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(<Home />);

    expect(
      screen.getByText("Authenticated Home Component"),
    ).toBeInTheDocument();

    expect(screen.queryByText("Photo Labs")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Pictures worth 1024 words!"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Log in")).not.toBeInTheDocument();
    expect(screen.queryByText("Sign Up")).not.toBeInTheDocument();
    expect(
      screen.queryByText("View Your Photos & More"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("In One Place")).not.toBeInTheDocument();
    expect(screen.queryByText("Get Started")).not.toBeInTheDocument();
  });
});

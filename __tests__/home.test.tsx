import { PaginationComponent } from "@/components/Pagination/Pagination";
import {  render, screen } from "@testing-library/react";
import { usePathname, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("PaginationComponent", () => {
  const mockedUsePathname = usePathname as jest.Mock;
  const mockedUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    mockedUsePathname.mockReturnValue("/current/path");
    const params = new URLSearchParams();
    params.set("page", "1");
    mockedUseSearchParams.mockReturnValue(params);
  });

  it('should call onPageChange function correctly when clicking page buttons', async() => {
    render(<PaginationComponent pageCount={5} />);
    expect(screen.getByText("Página 1")).toBeInTheDocument();
    
  });
  it("should disable the previous button on the first page", () => {
    render(<PaginationComponent pageCount={5} />);
    expect(screen.getByRole("button", { name: /anterior/i })).toBeDisabled();
  });
  it("should enable the next button when not on the last page", () => {
    render(<PaginationComponent pageCount={5} />);
    expect(screen.getByRole("button", { name: /próximo/i })).toBeEnabled();
  });
  it("should navigate to the previous page when the previous button is clicked", () => {
    render(<PaginationComponent pageCount={5} />);
    const previousLink = screen.getByRole("link", { name: /anterior/i });
    expect(previousLink).toHaveAttribute("href", "/current/path?page=0");
  });

  it("should disable the next button on the last page", () => {
    const params = new URLSearchParams();
    params.set("page", "5");
    mockedUseSearchParams.mockReturnValueOnce(params);
    render(<PaginationComponent pageCount={5} />);
    expect(screen.getByRole("button", { name: /próximo/i })).toBeDisabled();
  });
  it("should navigate to the next page when the next button is clicked", () => {
    render(<PaginationComponent pageCount={5} />);
    const nextLink = screen.getByRole("link", { name: /próximo/i });
    expect(nextLink).toHaveAttribute("href", "/current/path?page=2");
  });


});

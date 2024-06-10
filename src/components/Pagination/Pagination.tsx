"use client";
import { Button,  } from "@nextui-org/react";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  pageCount: number;
}

export function PaginationComponent({ pageCount }: Readonly<PaginationProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex w-full justify-center items-center">
        <Button data-testid="prev-button" size="md" isDisabled={currentPage <= 1}>
          <a href={createPageURL(currentPage - 1)}>Anterior</a>
        </Button>
        <p className="px-10">Página {currentPage}</p>
        <Button data-testid="next-button"  size="md" isDisabled={currentPage >= pageCount}>
          <a
            href={createPageURL(currentPage + 1)}
          >
            Próximo
          </a>
        </Button>
      </div>
  );
}

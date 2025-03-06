"use client"; // Mark this as a Client Component

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // Adjust the import path based on your project structure
import { useRouter, useSearchParams } from "next/navigation";

const ListingsPagination = ({
  totalPages,
  currentPage,
  hasPrevPage,
  hasNextPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to handle page change
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (hasPrevPage) handlePageChange(currentPage - 1);
            }}
            className={!hasPrevPage ? "opacity-50 cursor-not-allowed" : ""}
            disabled={!hasPrevPage}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (hasNextPage) handlePageChange(currentPage + 1);
            }}
            className={!hasNextPage ? "opacity-50 cursor-not-allowed" : ""}
            disabled={!hasNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ListingsPagination;
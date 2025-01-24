import React from "react";
import { Button } from "../ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  threadsPerPage: number;
  totalThreads: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  threadsPerPage,
  totalThreads,
  paginate,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalThreads / threadsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="flex justify-center my-4">
      <ul className="flex list-none items-center">
        <li
          className={`mx-1 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <Button variant={"outline"} onClick={handlePrevious} className="p-2">
            <FaChevronLeft />
          </Button>
        </li>
        <li className="mx-1">
          <span className="px-4 rounded text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
        </li>
        <li
          className={`mx-1 ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <Button variant={"outline"} onClick={handleNext} className="p-2">
            <FaChevronRight />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

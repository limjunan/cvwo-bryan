import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FaTag } from "react-icons/fa";

interface BtnTagProps {
  name: string;
  remove: boolean;
  onClick?: () => void;
}

const BtnTag: React.FC<BtnTagProps> = ({ name, remove, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center bg-blue-200 text-blue-800 text-sm font-semibold mr-4 mb-2 px-5 rounded-xl hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {remove ? (
        <RxCross1 className="mr-2 text-blue-800" />
      ) : (
        <FaTag className="mr-2 text-blue-800" />
      )}
      {name}
    </button>
  );
};

export default BtnTag;

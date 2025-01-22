import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FaTag } from "react-icons/fa";

interface BtnTagProps {
  name: string;
  color: string;
  remove: boolean;
  onClick?: () => void;
}

const BtnTag: React.FC<BtnTagProps> = ({ name, color, remove, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center text-sm font-semibold mr-4 mb-2 px-5 rounded-xl hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-opacity-50"
      style={{ backgroundColor: color, color: getTextColor(color) }}
    >
      {remove ? (
        <RxCross1 className="mr-2" style={{ color: getTextColor(color) }} />
      ) : (
        <FaTag className="mr-2" style={{ color: getTextColor(color) }} />
      )}
      {name}
    </button>
  );
};

// Helper function to determine text color based on background color
const getTextColor = (bgColor: string) => {
  // Simple algorithm to determine if the background color is light or dark
  const color = bgColor.substring(1); // Remove the '#'
  const rgb = parseInt(color, 16); // Convert hex to decimal
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155 ? "#000000" : "#FFFFFF"; // Light background -> dark text, dark background -> light text
};

export default BtnTag;

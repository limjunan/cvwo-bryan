import React from "react";

interface TagProps {
  name: string;
  color: string;
}

const Tag: React.FC<TagProps> = ({ name, color }) => {
  return (
    <span
      className="inline-block text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-xl"
      style={{ backgroundColor: color, color: getTextColor(color) }}
    >
      {name}
    </span>
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

export default Tag;

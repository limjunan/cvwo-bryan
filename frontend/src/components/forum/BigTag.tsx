import React from "react";

interface BigTagProps {
  name: string;
}

const BigTag: React.FC<BigTagProps> = ({ name }) => {
  return (
    <span className="inline-block bg-blue-200 text-blue-800 text-sm font-semibold mr-4 px-5 py-1 rounded-xl">
      {name}
    </span>
  );
};

export default BigTag;

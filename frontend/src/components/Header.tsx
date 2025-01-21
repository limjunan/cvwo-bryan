import React from "react";

const Header: React.FC = () => {
  return (
    <header className=" text-black">
      <div className="container mx-auto py-6">
        <h1 className="text-4xl font-bold">Gossip for CVWO</h1>
      </div>
      <div className="border-b border-gray-200 "></div>
    </header>
  );
};

export default Header;

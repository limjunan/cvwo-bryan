import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  return (
    <header className=" text-black">
      <div className="container mx-auto py-4 flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold">Gossip for CVWO</h1>
        <Input placeholder="Search" className="w-1/2" />
        <Button className="ml-2" variant="outline">
          Create Thread
        </Button>
      </div>
      <div className="border-b border-gray-200 "></div>
    </header>
  );
};

export default Header;

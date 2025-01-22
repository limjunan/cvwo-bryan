import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoIosAdd } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    console.log("localStorage:", localStorage);
    if (token && token !== "undefined") {
      try {
        console.log("Token:", token);
        const decodedToken: any = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    navigate("/login");
  };

  return (
    <header className="text-black">
      <div className="container mx-auto py-4 flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold">Gossip for CVWO</h1>
        <Input placeholder="Search" className="w-1/2" />
        {/* <Button className="ml-2" variant="outline">
          <IoIosAdd size={32} /> Create Thread
        </Button> */}
        {username ? (
          <div className="flex items-center">
            <span className="mr-4 inline-flex items-center text-gray-600">
              <CiUser className="mr-1" size={20} /> Welcome, {username}
            </span>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={() => navigate("/login")} variant="outline">
            Login
          </Button>
        )}
      </div>
      <div className="border-b border-gray-200"></div>
    </header>
  );
};

export default Header;

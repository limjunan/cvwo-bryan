import React, { useEffect, useState } from "react";
import api from "../services/api";

interface User {
  ID: number;
  Username: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        console.log("response", response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.ID}>{user.Username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

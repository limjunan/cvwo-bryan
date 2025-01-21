import React, { useEffect, useState } from "react";
import api from "../services/api";

interface User {
  id: number;
  username: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUsers(response.data);
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
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

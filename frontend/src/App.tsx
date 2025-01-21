import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import Forum from "./components/forum/Forum";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

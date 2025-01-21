import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

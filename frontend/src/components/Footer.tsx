import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 border-t border-gray-200">
      <p className="text-gray-600 text-sm">
        This is the assignment for CVWO 24/25. Check out the project on{" "}
        <a
          href="https://github.com/limjunan/cvwo-bryan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
      <p className="text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Bryan. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

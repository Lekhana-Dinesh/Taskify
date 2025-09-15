import React from "react";
import taskLogo from "../assets/task.jpeg";
import { useSelector } from "react-redux";
import useCurrentUser from "../hooks/useCurrentUser.jsx";

function Navbar() {
  useCurrentUser();
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[70px] bg-gradient-to-r from-pink-200 via-blue-200 to-blue-100 border-b border-gray-200 shadow flex items-center justify-between px-6">
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <img
          src={taskLogo}
          alt="Taskify logo"
          className="w-[40px] h-[40px] rounded-lg shadow-md"
        />
        <h1 className="text-xl font-bold text-gray-800">Taskify</h1>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <span className="text-sm font-medium text-gray-800">
          {userData?.user?.name || "User"}
        </span>
      </div>
    </div>
  );
}

export default Navbar;

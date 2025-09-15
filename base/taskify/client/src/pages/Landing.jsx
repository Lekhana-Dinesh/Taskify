import React from "react";
import { Link } from "react-router-dom";
import taskLogo from "../assets/task.jpeg";

function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-200 via-blue-200 to-blue-100 flex flex-col">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center px-6 py-4 text-gray-800 font-semibold text-lg">
        <div className="flex items-center gap-2">
          <img src={taskLogo} alt="Taskify logo" className="w-[50px] rounded-lg shadow-md" />
          <span className="tracking-wide text-xl">Taskify</span>
        </div>
        <div className="flex gap-4">
          <Link
            to="/signin"
            className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold shadow hover:opacity-90 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-pink-400 text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row flex-1 justify-center items-center gap-10 px-6 lg:px-20">
        {/* Left side */}
        <div className="text-gray-800 flex flex-col gap-6 max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow">
            Organize. Focus. Achieve ✨
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Welcome to <span className="font-bold">Taskify</span> – your
            personal space to manage tasks, categorize them, and stay on top of
            what matters most.
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-pink-400 text-white text-lg font-semibold rounded-xl shadow hover:opacity-90 transition active:scale-[.98]"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="px-6 py-3 bg-white text-blue-600 text-lg font-semibold rounded-xl shadow hover:opacity-90 transition active:scale-[.98]"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right side with logo */}
        <div className="relative flex justify-center items-center">
          <div className="absolute w-[300px] h-[300px] bg-pink-200/50 rounded-full blur-3xl animate-pulse"></div>
          <img
            src={taskLogo}
            alt="Taskify App Logo"
            className="relative w-[350px] md:w-[400px] drop-shadow-2xl animate-bounce-slow rounded-lg"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center text-gray-700 py-4 text-sm opacity-80">
        © {new Date().getFullYear()} Taskify — Simplify Your Tasks ✅
      </div>
    </div>
  );
}

export default LandingPage;

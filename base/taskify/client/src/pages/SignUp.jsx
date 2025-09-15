import React, { useState } from "react";
import taskLogo from "../assets/task.jpeg";
import { Link } from "react-router-dom";
import { signUp } from "../apiCalls/authCalls.js";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle SignUp
  const handleSignUp = async () => {
    if (!name || !userName || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    const user = {
      name,
      userName,
      email,
      password,
    };

    try {
      const response = await signUp(user);
      console.log("Sign Up Successful", response);

      navigate("/home");
      // Clear the form
      setName("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error during sign up", error);
      alert("Sign Up Failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen bg-gradient-to-br from-pink-200 via-blue-200 to-blue-100 flex flex-col justify-center items-center">
        <div className="w-full lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border border-gray-200 shadow-md">
          {/* LEFT (form) */}
          <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-6 gap-5">
            <div className="flex gap-2 items-center text-[20px] font-semibold mt-8 text-gray-800">
              <span>Sign Up to</span>
              <img src={taskLogo} alt="Taskify logo" className="w-[70px] rounded-lg shadow-md" />
            </div>

            {/* Name input */}
            <div className="relative flex items-center justify-start w-[90%] h-[44px] rounded-md mt-4 border border-gray-300 bg-white hover:border-gray-400 focus-within:border-pink-400 focus-within:ring-1 focus-within:ring-pink-400 transition">
              <label
                htmlFor="name"
                className="absolute -top-2 left-4 px-1 bg-white text-xs text-gray-500"
              >
                Enter Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full h-full rounded-md px-4 outline-none border-0 text-sm text-gray-900 bg-transparent"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Username input */}
            <div className="relative flex items-center justify-start w-[90%] h-[44px] rounded-md border border-gray-300 bg-white hover:border-gray-400 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition">
              <label
                htmlFor="userName"
                className="absolute -top-2 left-4 px-1 bg-white text-xs text-gray-500"
              >
                Enter Username
              </label>
              <input
                type="text"
                id="userName"
                className="w-full h-full rounded-md px-4 outline-none border-0 text-sm text-gray-900 bg-transparent"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Email input */}
            <div className="relative flex items-center justify-start w-[90%] h-[44px] rounded-md border border-gray-300 bg-white hover:border-gray-400 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition">
              <label
                htmlFor="email"
                className="absolute -top-2 left-4 px-1 bg-white text-xs text-gray-500"
              >
                Enter Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full h-full rounded-md px-4 outline-none border-0 text-sm text-gray-900 bg-transparent"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password input */}
            <div className="relative flex items-center justify-start w-[90%] h-[44px] rounded-md border border-gray-300 bg-white hover:border-gray-400 focus-within:border-pink-400 focus-within:ring-1 focus-within:ring-pink-400 transition">
              <label
                htmlFor="password"
                className="absolute -top-2 left-4 px-1 bg-white text-xs text-gray-500"
              >
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full h-full rounded-md px-4 outline-none border-0 text-sm text-gray-900 bg-transparent"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Sign Up button */}
            <button
              className="w-[70%] h-[44px] bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold rounded-lg mt-4 hover:opacity-90 active:scale-[.99] transition shadow"
              onClick={handleSignUp}
            >
              Sign Up
            </button>

            <p className="cursor-pointer text-gray-700 text-sm">
              Already Have An Account?{" "}
              <span className="border-b border-gray-800 pb-[2px] text-gray-900 hover:opacity-80">
                <Link to="/signin"> Sign In</Link>
              </span>
            </p>
          </div>

          {/* RIGHT (promo panel) */}
          <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-gradient-to-br from-pink-100 via-blue-100 to-white flex-col gap-2 text-gray-700 text-[16px] font-semibold rounded-l-[30px] shadow-2xl">
            <img src={taskLogo} alt="Taskify Logo" className="w-[40%] drop-shadow rounded-lg" />
            <p className="opacity-90">Taskify — Simplify Your Tasks ✅</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

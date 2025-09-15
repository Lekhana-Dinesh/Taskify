import React, { useState } from "react";
import taskLogo from "../assets/task.jpeg";
import { Link } from "react-router-dom";
import { signIn } from "../apiCalls/authCalls.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (!userName || !password) {
      alert("Please fill all the fields");
      return;
    }

    const user = {
      userName,
      password,
    };

    try {
      const response = await signIn(user);

      console.log("Sign In Successful", response);

      dispatch(setUserData(response));

      navigate("/home");

      // Clear the form
      setUserName("");
      setPassword("");
    } catch (error) {
      console.error("Error during sign in", error);
      alert("Sign In Failed. Please try again.");
    }
  };

  return (
    <div
      className="
        w-full min-h-screen 
        bg-gradient-to-br from-pink-200 via-blue-200 to-blue-100
        flex items-center justify-center
      "
    >
      <div className="w-[95%] lg:max-w-[60%] h-[600px] rounded-2xl flex justify-center items-center overflow-hidden">
        {/* LEFT (form) */}
        <div
          className="
            w-full lg:w-1/2 h-full 
            bg-white/90 
            flex flex-col items-center justify-center
            px-6 sm:px-10 
            gap-5
            shadow-[0_10px_40px_rgba(0,0,0,0.15)]
          "
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <img src={taskLogo} alt="Taskify Logo" className="w-[96px] object-contain rounded-lg shadow-md" />
            <h2 className="text-lg font-semibold text-neutral-700">
              Sign In to Taskify
            </h2>
          </div>

          {/* Inputs */}
          <div className="w-full flex flex-col items-center gap-3">
            <input
              type="text"
              id="userName"
              placeholder="Username"
              className="w-[95%] h-[44px] px-3 rounded-md border border-neutral-300 bg-white text-neutral-900 text-sm focus:outline-none focus:border-pink-400"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              id="password"
              placeholder="Password"
              className="w-[95%] h-[44px] px-3 rounded-md border border-neutral-300 bg-white text-neutral-900 text-sm focus:outline-none focus:border-blue-400"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot password */}
          <div className="w-[95%] text-right mt-1 text-sm text-pink-600 cursor-pointer hover:underline">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Button */}
          <button
            className="
              w-[95%] h-[44px] mt-4 rounded-lg font-semibold 
              bg-gradient-to-r from-pink-400 to-blue-400 text-white 
              hover:opacity-90 active:scale-[0.99] transition
              shadow-[0_6px_16px_rgba(0,0,0,0.2)]
            "
            onClick={handleSignIn}
          >
            Sign in
          </button>

          {/* Footer text */}
          <p className="text-neutral-500 text-sm mt-3">
            Want to create a new account?{" "}
            <span className="text-neutral-900 font-medium underline underline-offset-4">
              <Link to="/signup"> Sign Up</Link>
            </span>
          </p>
        </div>

        {/* RIGHT (promo panel) */}
        <div
          className="
            md:w-1/2 h-full hidden lg:flex flex-col items-center justify-center 
            bg-gradient-to-br from-pink-100 via-blue-100 to-white/60
            text-gray-700 font-semibold
          "
        >
          <img
            src={taskLogo}
            alt="Taskify Logo"
            className="w-[42%] drop-shadow-[0_10px_28px_rgba(0,0,0,0.15)] rounded-lg"
          />
          <p className="mt-4 text-gray-700/80">
            Taskify — Simplify Your Tasks ✅
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

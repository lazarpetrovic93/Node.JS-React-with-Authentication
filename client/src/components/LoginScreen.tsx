import React, { useState, useContext, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../async";
import { AppContext } from "../store/context";

export const LoginScreen = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => login(password, email, dispatch, navigate);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex items-center justify-center w-[600px] h-[300px] px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                required
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
                value={password}
                onChange={handleChangePassword}
              />
              <a
                onClick={() => navigate("/registration")}
                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2 cursor-pointer"
              >
                Sign Up
              </a>
            </div>
            <div className="mt-8">
              <button
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 disabled:bg-neutral-500 disabled:opacity-50"
                onClick={handleLogin}
                disabled={!email || !password}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

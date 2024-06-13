import React from "react";
import { AppContext } from "../store/context";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage, removeToken } from "../helpers";

export const Layout = () => {
  const { state } = React.useContext(AppContext);
  const { first_name, last_name } = state.auth;
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/logout");
    removeToken();
  };
  const firstName = first_name || getUserFromLocalStorage().first_name;
  const lastName = last_name || getUserFromLocalStorage().last_name;
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Welcome {firstName} {lastName}
      </h1>
      <button
        className="w-[200px] inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        onClick={handleLogOut}
      >
        Log Out
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
};

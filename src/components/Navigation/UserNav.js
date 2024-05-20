import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuthContext } from "../../context/Auth";

const UserNav = () => {
  const { user, logout } = useAuthContext();

  // const dropdownHandler = () => {
  //   // dropdown appears too lef

  //   const dropdown = document.getElementById("dropdown-user");
  //   if (dropdown.classList.contains("hidden")) {
  //     dropdown.classList.remove("hidden");
  //     dropdown.classList.add("block");
  //   } else {
  //     dropdown.classList.remove("block");
  //     dropdown.classList.add("hidden");
  //   }
  // }

  return (
    <>
      {user && (
        <div className="flex items-center">
          <div className="flex items-center ml-3">
            <div>
              <button
                type="button"
                // onClick={dropdownHandler}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.imageUrl}
                  alt="user"
                />
              </button>
            </div>
            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user"
            >
              <div className="px-4 py-3" role="none">
                <p
                  className="text-sm text-gray-900 dark:text-white"
                  role="none"
                >
                  {user.firstName + " " + user.lastName}
                </p>
                <p
                  className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  {user.email}
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Saved
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNav;

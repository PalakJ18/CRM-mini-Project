import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiUser, FiLogOut } from "react-icons/fi";
import LogoutModal from "../components/LogoutModal"; // import the modal

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="bg-white h-screen w-64 p-4 shadow-lg fixed left-0 top-0">
      <button className="bg-[#FF3A3A] text-white font-semibold px-4 py-2 rounded-md mb-6 w-full">
        Connect CRM
      </button>

      <nav className="flex flex-col space-y-4 text-gray-700 text-lg">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-red-500 ${
              isActive
                ? "text-red-500 font-semibold border-solid rounded-lg border-pure-greys-600 bg-pink-5 p-2"
                : "text-pure-greys-100"
            }`
          }
        >
          <FiHome /> Dashboard
        </NavLink>

        <NavLink
          to="/leads"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-red-500 ${
              isActive
                ? "text-red-500 font-semibold border-solid rounded-lg border-pure-greys-600 bg-pink-5 p-2"
                : "text-pure-greys-100"
            }`
          }
        >
          <FiUsers /> Leads
        </NavLink>

        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-red-500 ${
              isActive
                ? "text-red-500 font-semibold border-solid rounded-lg border-pure-greys-600 bg-pink-5 p-2"
                : "text-pure-greys-100"
            }`
          }
        >
          <FiUser /> Employee
        </NavLink>

        {/* Logout as a button instead of NavLink */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-2 text-pure-greys-100 hover:text-red-500"
        >
          <FiLogOut /> Logout
        </button>
      </nav>

      {/* Logout Modal */}
      <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
    </div>
  );
};

export default Sidebar;

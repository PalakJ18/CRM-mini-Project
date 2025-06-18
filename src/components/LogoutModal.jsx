import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/operations/authAPI"; // adjust the path to your logout logic

const LogoutModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = async () => {
    await logout(navigate); // implement this in your authAPI
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl text-center w-[350px] shadow-2xl">
        <h2 className="text-xl font-bold mb-6">Are You Sure Want To Log Out?</h2>

        <button
          onClick={handleLogout}
          className="bg-[#FF3A3A] text-white w-full py-2 rounded-md font-semibold mb-4"
        >
          Log Out
        </button>

        <button
          onClick={onClose}
          className="bg-black text-white w-full py-2 rounded-md font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;

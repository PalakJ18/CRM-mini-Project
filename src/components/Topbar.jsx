import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Topbar = () => {
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      console.log("decoded ", decoded);
      // your token payload includes { id, email, name, iat, exp }
      if (decoded.name) {
        setAdminName(decoded.name);
        console.log("amin name is ", adminName);
      }
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, []);

  return (
    <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Search"
        className="border rounded-md px-4 py-2 w-1/3"
      />
      <div className="flex items-center gap-2 border-2 border-richblack-800 p-2 bg-richblack-5 rounded-lg">
        <span className="font-medium">{adminName}</span>
        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
          👤
        </div>
      </div>
    </div>
  );
};

export default Topbar;

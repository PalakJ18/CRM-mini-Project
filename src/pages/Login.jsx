import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI"; // Adjust path if needed

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password, navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <form onSubmit={handleSubmit} className=" p-8 rounded shadow-md w-96 bg-pink-5 scale-150">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Admin Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border px-4 py-2 mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border px-4 py-2 mb-6"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full  bg-pure-greys-100 text-black py-2 rounded hover:bg-richblack-25"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

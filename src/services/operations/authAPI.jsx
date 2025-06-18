import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { authEndpoints } from "../apis"

const {
  LOGIN_API,
  LOGOUT_API,
} = authEndpoints;

//3
// services/operations/authAPI.jsx

export async function login(email, password, navigate) {
  const toastId = toast.loading("Logging in…");
  try {
    const { data } = await apiConnector("POST", LOGIN_API, { email, password });
    if (!data.success) throw new Error(data.message);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.success("Login successful");
    navigate("/dashboard");
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    toast.error(err.message || "Login failed");
  } finally {
    toast.dismiss(toastId);
  }
}

export async function logout(navigate) {
  const toastId = toast.loading("Logging out...");

  try {
    const token = localStorage.getItem("token");

    const response = await apiConnector("POST", LOGOUT_API, null, {
      Authorization: `Bearer ${token}`, // ✅ send token in headers
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");
    navigate("/login");
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    // toast.error("Logout failed. Please try again.");
  } finally {
    toast.dismiss(toastId);
  }
}

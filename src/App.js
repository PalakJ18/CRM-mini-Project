
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Employee from "./pages/Employee";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");

  const showSidebar = location.pathname !== "/login";

  return (
    <div className="flex">
      {/* Sidebar appears only if not on login page */}
      {showSidebar && <Sidebar />}

      <div className={showSidebar ? "ml-64 flex-1 p-4" : "flex-1"}>
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/dashboard" /> : <Login />
            }
          />
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/leads"
            element={
              isLoggedIn ? <Leads /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/employee"
            element={
              isLoggedIn ? <Employee /> : <Navigate to="/login" />
            }
          />
          {/* <Route
            path="/logout"
            element={
              isLoggedIn ? <Logout /> : <Navigate to="/login" />
            }
          /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;



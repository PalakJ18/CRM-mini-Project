import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EditEmployeeModal from "../components/EditEmployeeModal";
import DeleteModal from "../components/DeleteModal";
import Topbar from "../components/Topbar";
import { getAllEmployees } from "../services/operations/employeeAPI";

const Employee = () => {

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch employees from the backend
  const fetchEmployees = async () => {
    const data = await getAllEmployees();
    console.log("employee data is", data);
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-24 px-32 min-h-screen relative bg-pink-5">
      <Topbar />

      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Employee list</h2>
          <button
            className="bg-red-500 text-black px-4 py-2 rounded"
            onClick={() => setShowAddModal(true)}
          >
            + Add employee
          </button>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="p-2">Ser no</th>
              <th className="p-2">Company</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Position</th>
              <th className="p-2">Number of leads</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={emp._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2 text-red-600 font-medium">{emp.company}</td>
                <td className="p-2">{emp.email}</td>
                <td className="p-2">{emp.phone}</td>
                <td className="p-2">{emp.position}</td>
                <td className="p-2">{emp.noOfLeads}</td>
                <td className="p-2">
                  <select
                    className="border border-gray-300 px-2 py-1 rounded text-sm bg-white text-gray-700"
                    value={emp.status}
                    readOnly
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </td>
                <td className="p-2 flex space-x-2 text-red-500">
                  <FiEdit2
                    className="cursor-pointer"
                    onClick={() => {
                      setCurrentEmployee(emp);
                      setShowEditModal(true);
                    }}
                  />
                  <FiTrash2
                    className="cursor-pointer"
                    onClick={() => {
                      setCurrentEmployee(emp);
                      setShowDeleteModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onEmployeeAdded={() => {
          fetchEmployees();
          setShowAddModal(false);
        }}
      />

      <EditEmployeeModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        employeeData={currentEmployee}
        onEmployeeUpdated={() => {
          fetchEmployees();
          setShowEditModal(false);
        }}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        data={currentEmployee}
        onDeleted={() => {
          fetchEmployees();
          setShowDeleteModal(false);
        }}
        type = {"Employee"}
      />
    </div>
  );
};

export default Employee;

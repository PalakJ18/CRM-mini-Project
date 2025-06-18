import { useEffect, useRef, useState } from "react";
import { updateEmployee } from "../services/operations/employeeAPI";

const EditEmployeeModal = ({ isOpen, onClose, employeeData, onEmployeeUpdated }) => {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    phone: "",
    position: "",
    status: "",
    noOfLeads: "",
  });

  const modalRef = useRef();

  useEffect(() => {
    if (isOpen && employeeData) {
      setFormData({
        company:employeeData.company || "",
        email: employeeData.email || "",
        phone: employeeData.phone || "",
        position: employeeData.position || "",
        status: employeeData.status || "",
        noOfLeads: employeeData.noOfLeads || "",
      });
    }
  }, [isOpen, employeeData]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const updatedData = {
  id: employeeData._id,
  ...formData,
};

    const response = await updateEmployee(updatedData);

    if (response?.success) {
      onEmployeeUpdated(); // Refresh list and close modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div
        ref={modalRef}
        className="bg-pure-greys-5 rounded-lg shadow-md w-[600px] p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="company"
            className="border p-2"
            value={formData.company}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            className="border p-2"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            className="border p-2 col-span-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="position"
            className="border p-2"
            value={formData.position}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            className="border p-2"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input
            name="noOfLeads"
            type="number"
            className="border p-2 col-span-2"
            value={formData.noOfLeads}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-[#FF3A3A] text-white  hover:scale-105 py-2 mt-2 col-span-2 rounded"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;

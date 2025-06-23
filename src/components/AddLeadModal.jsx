import { useState, useEffect, useRef } from "react";
import { createLead } from "../services/operations/leadAPI";
import { getAllEmployees } from "../services/operations/employeeAPI";
import { toast } from "react-hot-toast";

const AddLeadModal = ({ isOpen, onClose, onLeadAdded }) => {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    phone: "",
    image: null,
    tag: "",
    status: "",
    employee: "",
  });

  const [employeeList, setEmployeeList] = useState([]);
  const modalRef = useRef();

  // Fetch employee list
  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getAllEmployees();
      if (data) setEmployeeList(data);
    };

    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  // Close on outside click
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
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("company", formData.company);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("tag", formData.tag);
    data.append("status", formData.status);
    data.append("employee", formData.employee);
    if (formData.image) {
      data.append("image", formData.image);
    }

    console.log("data is ", data);
    const result = await createLead(data);

    if (result?.success) {
      onLeadAdded();
      onClose();
      setFormData({
        company: "",
        email: "",
        phone: "",
        image: null,
        tag: "",
        status: "",
        employee: "",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div ref={modalRef} className="bg-pure-greys-5 rounded-lg shadow-md w-[600px] p-6">
        <h2 className="text-xl font-semibold mb-4">Add Lead</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="company"
            placeholder="Company"
            className="border p-2"
            value={formData.company}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            className="border p-2"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            className="border p-2 col-span-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            className="col-span-2"
            onChange={handleChange}
            accept="image/*"
          />
          <input
            name="tag"
            placeholder="Tag"
            className="border p-2"
            value={formData.tag}
            onChange={handleChange}
          />
          <select
            name="status"
            className="border p-2"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="contacted">Contacted</option>
            <option value="pending">Pending</option>
          </select>
          <select
            name="employee"
            className="border p-2 col-span-2"
            value={formData.employee}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {employeeList.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.company} ({emp.email})
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-[#FF3A3A] text-white  hover:scale-105 py-2 mt-2 col-span-2 rounded"
          >
            Add Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;


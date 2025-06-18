import { useEffect, useState, useRef } from "react";
import { getAllEmployees } from "../services/operations/employeeAPI";

const EditLeadModal = ({ isOpen, onClose, lead, onLeadUpdated }) => {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    phone: "",
    tags: "",
    status: "",
    employee: "",
    image: null,
  });

  const [employees, setEmployees] = useState([]);
  const modalRef = useRef();

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Pre-fill form
  useEffect(() => {
    if (lead) {
      setFormData({
        company: lead.company || "",
        email: lead.email || "",
        phone: lead.phone || "",
        tags: lead.tags?.join(", ") || "",
        status: lead.status || "",
        employee: lead.employeeAssigned?._id || lead.employee || "",
        image: null,
      });
    }
  }, [lead]);

  // Outside click closes modal
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const updatedData = new FormData();
    updatedData.append("leadId", lead._id);
    updatedData.append("company", formData.company);
    updatedData.append("email", formData.email);
    updatedData.append("phone", formData.phone);
    updatedData.append("status", formData.status);
    updatedData.append("employee", formData.employee);
    tagsArray.forEach((tag, idx) => updatedData.append(`tags[${idx}]`, tag));
    if (formData.image) {
      updatedData.append("image", formData.image);
    }

    onLeadUpdated(updatedData);
    onClose();
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div ref={modalRef} className="bg-pure-greys-5 rounded-lg shadow-md w-[600px] p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Lead</h2>
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
            name="tags"
            placeholder="Tags (comma-separated)"
            className="border p-2 col-span-2"
            value={formData.tags}
            onChange={handleChange}
          />
          <select
            name="employee"
            className="border p-2 col-span-2"
            value={formData.employee}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Employee --</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.company}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="image"
            className="col-span-2"
            onChange={handleChange}
          />
          <input
            name="status"
            placeholder="Status"
            className="border p-2 col-span-2"
            value={formData.status}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-[#FF3A3A] text-white  hover:scale-105 py-2 mt-2 col-span-2 rounded"
          >
            Update Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;

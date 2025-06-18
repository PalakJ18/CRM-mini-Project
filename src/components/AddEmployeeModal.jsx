import { useState, useEffect, useRef } from "react"
import { createEmployee, getAllEmployees } from "../services/operations/employeeAPI"

const AddEmployeeModal = ({ isOpen, onClose  }) => {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    phone: "",
    position: "",
    status: "",
    noOfLeads: "",
  })

  const modalRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await createEmployee(formData)

    if (response?.success) {
      onClose()
      setFormData({
        company: "",
        email: "",
        phone: "",
        position: "",
        status: "",
        noOfLeads: "",
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div ref={modalRef} className="bg-pure-greys-5 rounded-lg shadow-md w-[600px] p-6">
        <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
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
            name="position"
            placeholder="Position"
            className="border p-2 col-span-2"
            value={formData.position}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            className="border p-2 rounded-md shadow-sm col-span-1 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 text-richblack-400 "
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="" >Select Status</option>
            <option value="Active" cla>Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input
            name="noOfLeads"
            placeholder="No. of Leads"
            className="border p-2"
            value={formData.noOfLeads}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="py-2 mt-2 col-span-2 rounded bg-[#FF3A3A] text-white  hover:scale-105"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddEmployeeModal

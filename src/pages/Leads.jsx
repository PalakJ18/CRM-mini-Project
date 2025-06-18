import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddLeadModal from "../components/AddLeadModal";
import EditLeadModal from "../components/EditLeadModal";
import Topbar from "../components/Topbar";
import DeleteModal from "../components/DeleteModal";
import { getAllLeads } from "../services/operations/leadAPI";
import { updateLead } from "../services/operations/leadAPI";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchLeads = async () => {
    const data = await getAllLeads();
    console.log("leads data is", data);
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddLead = () => {
    fetchLeads();
    setShowAddModal(false);
  };

const handleEditLead = async (formData) => {
  try {
    await updateLead(formData);  // ✅ send update to backend
    await fetchLeads();          // ✅ refresh list
    setShowEditModal(false);     // ✅ close modal
  } catch (err) {
    console.error("Error updating lead:", err);
  }
};


  return (
    <div className="p-24 px-32 bg-pink-5 min-h-screen">
      <Topbar />

      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Leads</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-500 text-black px-4 py-2 rounded"
          >
            + Add Lead
          </button>
        </div>

        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="p-2">S.No</th>
              <th className="p-2">Company</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Tags</th>
              <th className="p-2">Image</th>
              <th className="p-2">Status</th>
              <th className="p-2">Employee</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={lead._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{lead.company}</td>
                <td className="p-2">{lead.email}</td>
                <td className="p-2">{lead.phone}</td>

                {/* Tags (badges stacked vertically) */}
                <td className="p-2">
                  <div className="flex flex-col gap-1">
                    {lead.tags?.length > 0 ? (
                      lead.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block border border-red-400 text-red-500 px-2 py-1 rounded-full text-xs w-fit"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No tags</span>
                    )}
                  </div>
                </td>

                {/* Image */}
                <td className="p-2">
                  <img
                    src={lead.image || "https://via.placeholder.com/40"}
                    alt="lead"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </td>

                <td className="p-2">{lead.status}</td>

                {/* Assigned Employee's Company */}
                <td className="p-2">{lead.employeeAssigned?.company || "—"}</td>

                <td className="p-2 flex gap-2 text-red-500">
                  <FiEdit2
                    className="cursor-pointer"
                    onClick={() => {
                      setCurrentLead(lead);
                      setShowEditModal(true);
                    }}
                  />
                  <FiTrash2
                    className="cursor-pointer"
                    onClick={() => {
                      setCurrentLead(lead);
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
      <AddLeadModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onLeadAdded={handleAddLead}
      />

      <EditLeadModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        lead={currentLead}
        onLeadUpdated={handleEditLead}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        data={currentLead}
        onDeleted={() => {
          fetchLeads();
          setShowDeleteModal(false);
        }}
        type={"leads"}
      />
    </div>
  );
};

export default Leads;

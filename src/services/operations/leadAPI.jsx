import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { leadsEndpoints } from "../apis"; // optionally rename to leadEndpoints

const {
  CREATE_LEADS_API,
  GET_ALL_LEADS_API,
  UPDATE_LEADS_API,
  DELETE_LEADS_API,
} = leadsEndpoints;

// CREATE
export async function createLead(data) {
  try {
    const response = await apiConnector("POST", CREATE_LEADS_API, data);
    console.log("response", response);
    if (response.data.success) toast.success("Lead created successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to create lead");
    console.error("CREATE_LEADS_API ERROR:", error);
    return null;
  }
}

// READ
export async function getAllLeads() {
  try {
    const response = await apiConnector("GET", GET_ALL_LEADS_API);
    console.log("response", response);
    return response.data.data;
  } catch (error) {
    toast.error("Failed to fetch leads");
    console.error("GET_ALL_LEADS_API ERROR:", error);
    return [];
  }
}

// UPDATE

export const updateLead = async (formData) => {
  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_LEADS_API,
      formData,
      { "Content-Type": "multipart/form-data" }
    );
    return response.data;
  } catch (error) {
    console.error("UPDATE_LEAD_API ERROR: ", error);
    throw error;
  }
};

// DELETE
export async function deleteLeads(leadId) {
  try {
    const response = await apiConnector("DELETE", DELETE_LEADS_API, { leadId }); // ✅ fix here
    console.log("response", response);
    if (response.data.success) toast.success("Lead deleted successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete lead");
    console.error("DELETE_LEADS_API ERROR:", error);
    return null;
  }
}


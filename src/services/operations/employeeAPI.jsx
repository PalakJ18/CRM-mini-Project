import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { employeeEndpoints } from "../apis";

const {
  CREATE_EMPLOYEE_API,
  GET_ALL_EMPLOYEE_API,
  UPDATE_EMPLOYEE_API,
  DELETE_EMPLOYEE_API,
  LEADS_COUNT_BY_EMPLOYEE,
} = employeeEndpoints;

// CREATE
export async function createEmployee(data) {
  try {
    const response = await apiConnector("POST", CREATE_EMPLOYEE_API, data);
    if (response.data.success) toast.success("Employee created successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to create employee");
    console.error("CREATE_EMPLOYEE_API ERROR:", error);
    return null;
  }
}

// READ
export async function getAllEmployees() {
  try {
    const response = await apiConnector("GET", GET_ALL_EMPLOYEE_API);
    console.log("response data is ", response);
    return response.data.data;
  } catch (error) {
    toast.error("Failed to fetch  employees");
    console.error(" GET_ALL_EMPLOYEE_API ERROR:", error);
    return [];
  }
}
export async function getLeadCountByEmployee() {
  try {
    const response = await apiConnector("GET", LEADS_COUNT_BY_EMPLOYEE);
    console.log("response data is ", response);
    return response.data.data;
  } catch (error) {
    toast.error("Failed to fetch  no of  leads for employees");
    console.error("LEADS_COUNT_BY_EMPLOYEE ", error);
    return [];
  }
}

// UPDATE
export async function updateEmployee(data) {
  try {
    const response = await apiConnector("PUT", UPDATE_EMPLOYEE_API, data);
    console.log("respone is ", response);
    if (response.data.success) toast.success("Employee updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to update employee");
    console.error("UPDATE_EMPLOYEE_API ERROR:", error);
    return null;
  }
}

// DELETE
export async function deleteEmployee(employeeId) {
  try {
    const response = await apiConnector("DELETE", DELETE_EMPLOYEE_API, { id: employeeId });
    if (response.data.success) toast.success("Employee deleted successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete employee");
    console.error("DELETE_EMPLOYEE_API ERROR:", error);
    return null;
  }
}

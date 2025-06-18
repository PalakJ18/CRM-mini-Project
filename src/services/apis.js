const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const authEndpoints = {
  LOGIN_API: BASE_URL + "/admin/login",
  LOGOUT_API: BASE_URL + "/admin/logout",
}

// EMPLOYEE ENDPOINTS
export const employeeEndpoints = {
  CREATE_EMPLOYEE_API: BASE_URL + "/employee/createEmployee",
  UPDATE_EMPLOYEE_API: BASE_URL + "/employee/updateEmployee",
  GET_ALL_EMPLOYEE_API: BASE_URL + "/employee/getAllEmployees",
  DELETE_EMPLOYEE_API: BASE_URL + "/employee/deleteEmployee",
  GET_EMPLOYEE_COUNT_API: BASE_URL + "/employee/count",
  LEADS_COUNT_BY_EMPLOYEE: BASE_URL + "/employee/noOfLeads",
}

// LEADS ENDPOINTS
export const leadsEndpoints = {
  CREATE_LEADS_API: BASE_URL + "/leads/createLeads",
  UPDATE_LEADS_API: BASE_URL + "/leads/updateLeads",
  GET_ALL_LEADS_API: BASE_URL + "/leads/getAllLeads",
  DELETE_LEADS_API: BASE_URL + "/leads/deleteLeads",
  GET_LEADS_COUNT_API: BASE_URL + "/leads/count",

}


import { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { employeeEndpoints, leadsEndpoints } from "../services/apis";

const Card = ({ title, des }) => {
  const [count, setCount] = useState(0);

  const { GET_EMPLOYEE_COUNT_API } = employeeEndpoints;
  const { GET_LEADS_COUNT_API } = leadsEndpoints;

  useEffect(() => {
    const fetchCount = async () => {
      try {
        let res;

        if (title === "Employees") {
          res = await apiConnector("GET", GET_EMPLOYEE_COUNT_API);
          console.log(`${title} count res:`, res);

          if (res?.data?.success) {
            setCount(res.data.totalEmployees
            );
          }
        } else if (title === "Leads") {
          res = await apiConnector("GET", GET_LEADS_COUNT_API);
          console.log(`${title} count res:`, res);

          if (res?.data?.success) {
            setCount(res.data.
              totalLeads);
          }
        }


      } catch (error) {
        console.error(`Error fetching ${title} count:`, error);
      }
    };

    fetchCount();
  }, [title]);

  return (
    <div className="border p-4 rounded-lg shadow-sm text-center w-1/4 bg-pure-greys-5">
      <p className="text-2xl font-bold text-gray-600">{title}</p>
      <p>{des}</p>
      <h2 className="text-2xl font-bold mt-2">{count}</h2>
    </div>
  );
};

export default Card;

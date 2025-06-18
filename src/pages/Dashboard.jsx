import Card from "../components/Card";
import Topbar from "../components/Topbar";

const Dashboard = () => {

  return (
    <div className="ml-2 p-24 px-40 bg-pink-5 min-h-screen">
      <Topbar />
      <h1 className="text-3xl font-bold mb-2">CRM Admin Dashboard</h1>
      <p className="mb-4 text-sm text-gray-600">
        Total number of Subadmin in CRM.
      </p>
      <div className="flex gap-4">
        <Card title="Leads" des="Total number of leads on CRM" />
        <Card title="Employees" des="Total number of Employees in CRM" />
      </div>
    </div>
  );
};

export default Dashboard;


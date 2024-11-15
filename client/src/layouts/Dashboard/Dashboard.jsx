import { Outlet, useNavigation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Loader from "../../components/Loader/Loader";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import Sidebar from "../../components/Sidebar/Sidebar";


const Dashboard = () => {
  const navigation = useNavigation();
  const { isLoading } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <Loader />;

  // console.log(role);

  if (navigation.state === "loading") return <Loader />;
  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex flex-col lg:flex-row h-full">
      <div className="w-full lg:w-[20%] lg:min-h-full">
        {role === "admin" && <AdminSidebar />}
        {role === "vendor" && <Sidebar />}
      </div>
      <div className="w-full lg:w-[80%] min-h-svh">
        <Outlet />
      </div>
      <p className="text-center text-gray-400 px-2 lg:hidden mb-4">
        &copy; 2024 PharmaMart. All rights reserved.
      </p>
    </div>
  );
};

export default Dashboard;
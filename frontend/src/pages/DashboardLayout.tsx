import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="w-full h-dvh min-h-dvh px-20 flex flex-col gap-5">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;

import { Outlet } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";

function MainLayout() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <Navbar />
        <div className="p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;

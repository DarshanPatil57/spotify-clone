import LeftSidebar from "../Components/LeftSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <aside className="w-1/7 bg-zinc-800  hidden md:flex flex-col">
        <div className="text-lg font-bold">
        <LeftSidebar/>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
      
      {/* Right Sidebar */}
      <aside className="w-1/4 bg-zinc-900 p-4  lg:flex flex-col">
        <div className="text-lg font-bold">Right Sidebar</div>
        {/* Add sidebar content here */}
      </aside>
    </div>
  );
};

export default MainLayout;

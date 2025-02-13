import RightSidebar from "../Components/RightSidebar";
import LeftSidebar from "../Components/LeftSidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import AudioPlayer from "../Components/AudioPlayer";
import PlayBackControl from "../Components/PlayBackControl";

// const MainLayout: React.FC = () => {
//   return (
//     <div className="h-screen w-screen bg-black text-white flex relative ">
//       {/* Left Sidebar */}
//       <AudioPlayer/>
//       <aside className="w-1/7 bg-zinc-800  hidden md:flex flex-col">
//         <div className="text-lg font-bold">
//         <LeftSidebar/>
//         </div>
//       </aside>
      
//       {/* Main Content */}
//       <main className="flex-1 p-4 overflow-y-auto">
//         <Outlet />
//       </main>
      
//       {/* Right Sidebar */}
//       <aside className="w-1/4 bg-zinc-900 p-4  lg:flex flex-col">
//         <div className="text-lg font-bold">
//           <RightSidebar/>
//         </div>
//       </aside>
//       <div className="fixed bottom-0 left-0 w-full shadow-md z-50">
//         <PlayBackControl />
//       </div>
//     </div>
//   );
// };

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <AudioPlayer/>
        {/* Left Sidebar */}
        <aside className="w-1/7 bg-zinc-800 hidden md:flex flex-col">
          <LeftSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto pb-24">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/5 bg-zinc-900 p-4 lg:flex flex-col">
          <RightSidebar />
        </aside>
      </div>

      {/* Playback Control -*/}
      <div className="w-full bg-zinc-900 border-t border-zinc-800 z-20">
        <PlayBackControl />
      </div>
    </div>
  );
};


export default MainLayout;

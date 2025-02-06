// import { axiosInstance } from "../lib/axios";
// import { useUser } from "@clerk/clerk-react";
// import { Loader } from "lucide-react";
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthPage = () => {
//   const {isLoaded,user} = useUser()

//   const navigate = useNavigate()

//   useEffect(()=>{
//     const syncUser = async ()=>{
//       try {
//         if(!isLoaded || !user) return
//         await axiosInstance.post("/auth/callback", {
//           id:user.id,
//           firstName:user.firstName,
//           lastName:user.lastName,
//           imageurl:user.imageUrl
//         })
//       } catch (error) {
//         console.log("Error in auth callback", error);
//       }finally{
//          navigate("/")
//       }
//     }
//     syncUser()
//   },[isLoaded,user,navigate])
//   return (
//     <div className="h-screen w-full bg-[#000] flex items-center justify-center text-white">
//       <div className="flex flex-col items-center justify-center w-96  p-6 bg-zinc-900 rounded-md shadow">
//         <Loader className="size-8 text-emerald-500 animate-spin" />
//         <h3 className="text-2xl font-bold tracking-tight font-sans text-zinc-400 text-center mt-2">
//           Logging you in
//         </h3>
//         <p className="font-normal text-zinc-400 text-center text-sm mt-3">
//           Redirecting......
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;


import { axiosInstance } from "../lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      // Check if user is loaded and valid
      if (!isLoaded || !user) {
        console.log("User is not loaded yet or not available");
        return;
      }

      try {
        console.log("Syncing user with backend...");

        // Sending user data to backend for callback
        const response = await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl, // Optional: depending on whether the user has an image
        });

        console.log("Response from backend:", response.data);
      } catch (error) {
        console.log("Error in auth callback", error);
      } finally {
        navigate("/"); // Navigate to home page after successful sync
      }
    };

    // Only run if user and isLoaded are true
    if (isLoaded && user) {
      syncUser();
    }
  }, [isLoaded, user, navigate]); // Re-run the effect when user or isLoaded changes

  return (
    <div className="h-screen w-full bg-[#000] flex items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center w-96  p-6 bg-zinc-900 rounded-md shadow">
        <Loader className="size-8 text-emerald-500 animate-spin" />
        <h3 className="text-2xl font-bold tracking-tight font-sans text-zinc-400 text-center mt-2">
          Logging you in
        </h3>
        <p className="font-normal text-zinc-400 text-center text-sm mt-3">
          Redirecting......
        </p>
      </div>
    </div>
  );
};

export default AuthPage;



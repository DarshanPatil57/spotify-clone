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
      if (!isLoaded || !user) {
        // console.log("User is not loaded yet or not available");
        return;
      }
  
      // console.log("User data from Clerk:", {
      //   id: user.id,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   imageUrl: user.imageUrl,
      // });
  
      try {
        // console.log("Sending user data to backend...");
  
        const response = await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
  
        // console.log("Response from backend:", response.data);
      } catch (error) {
        // console.log("Error in auth callback:", error.response?.data || error);
      } finally {
        navigate("/");
      }
    };
  
    if (isLoaded && user) {
      syncUser();
    }
  }, [isLoaded, user, navigate]);
  

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



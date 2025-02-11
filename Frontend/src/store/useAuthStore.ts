import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

interface AuthStore {
    isAdmin:boolean,
    isLoading:boolean,
    error: string | null,

    checkIsAdminStatus: ()=> Promise<void>,
    reset: ()=> void
}

export const useAuthStore = create<AuthStore>((set)=>({
    isAdmin:false,
    isLoading:false,
    error:null, 


    checkIsAdminStatus: async ()=>{
        set({isLoading:true,error:null})

        try {
            const response = await axiosInstance.get("/admin/check");
            set({isAdmin:response.data.isAdmin})
        } catch (error:any) {
            set({isAdmin:false,  error: error.response?.data?.message || "Something went wrong"})
        } finally{
            set({isLoading:false})
        }
    },
    reset: () =>{
        set({isAdmin:false,isLoading:false,error:null})
    }
}))
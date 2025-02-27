// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import React from "react";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import ChatPage from "./Pages/ChatPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layouts/MainLayout";
import AlbumPage from "./Pages/AlbumPage";
import AdminPage from "./Pages/Admin/AdminPage";
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInFallbackRedirectUrl={"/auth"}
            />
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage/>} />
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage/>}/>
          <Route path="/albums/:albumId" element={<AlbumPage/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;

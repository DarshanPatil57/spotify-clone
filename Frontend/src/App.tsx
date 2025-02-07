// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import React from "react";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import ChatPage from "./Pages/ChatPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layouts/MainLayout";

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
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;

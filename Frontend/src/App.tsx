// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import React from "react";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInFallbackRedirectUrl={"/auth".trim()}
            />
          }
        />

        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import React from "react"


function App() {

  return (
    <>
    <h1 className="text-3xl font-bold ">
    Hello world!
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  </h1>
    </>
  )
}

export default App

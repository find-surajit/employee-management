import React from "react";
import { SignIn, SignOutButton, useUser } from "@clerk/clerk-react";

const App: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!isSignedIn ? (
        <SignIn />
      ) : (
        <div>
          <h1>Welcome to Employee Management</h1>
          <SignOutButton />
        </div>
      )}
    </div>
  );
};

export default App;

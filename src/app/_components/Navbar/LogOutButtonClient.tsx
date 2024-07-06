"use client";

import { Button } from "flowbite-react";
import { signIn, signOut } from "next-auth/react";
import React from "react";

const LogOutButtonClient: React.FC = () => {
  return (
    <Button color="red" pill onClick={() => signOut()}>
      Log Out
    </Button>
  );
};

export default LogOutButtonClient;

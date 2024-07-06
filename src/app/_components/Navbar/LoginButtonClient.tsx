"use client";

import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import React from "react";

const LoginButtonClient: React.FC = () => {
  return (
    <Button color="blue" pill onClick={() => signIn()}>
      Sign In
    </Button>
  );
};

export default LoginButtonClient;

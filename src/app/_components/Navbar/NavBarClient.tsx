"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import LoginButtonClient from "./LoginButtonClient";
import LogOutButtonClient from "./LogOutButtonClient";
import Link from "next/link";
import { useAuth } from "@/utils/hooks/useAuth";

export const metadata = {
  title: "Application Nav Bar",
  description: "...",
};

export default function NavBarClient() {
  const { isAuthenticated, username } = useAuth();

  async function handleLogin(username: string, password: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to authenticate");
      }

      sessionStorage.setItem("accessToken", data.access_token);
      sessionStorage.setItem("tokenType", data.token_type);
      sessionStorage.setItem("username", username);

      window.location.href = "/dashboard"; // Redirect to update UI based on auth state
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Failed to authenticate");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("tokenType");
    sessionStorage.removeItem("username");
    window.location.href = "/"; // Redirect to the home page after logout
  }

  return (
    <Navbar fluid rounded className="shadow-md">
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Storage App
        </span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-2">
        {isAuthenticated ? (
          <>
            <span className="self-center text-lg font-semibold dark:text-white">
              {username}
            </span>
            <Button color="red" pill onClick={handleLogout}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/signin">
              <Button color="blue" pill>
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button color="red" pill>
                Sign Up
              </Button>
            </Link>
          </>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="/about">About</NavbarLink>
        <NavbarLink href="/services">Services</NavbarLink>
        <NavbarLink href="/pricing">Pricing</NavbarLink>
        <NavbarLink href="/contact">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

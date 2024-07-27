"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import * as z from "zod";
import useToast from "@/utils/hooks/useToast";
import { HiLockClosed, HiMail } from "react-icons/hi";

// Define the schema for form validation using Zod
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function SignIn() {
  const { showSuccessMessage, showErrorMessage, ToastContainer } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const setCookie = (name: string, value: string, days: number): void => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  const onSubmit = async (data: LoginSchema) => {
    const body = new URLSearchParams();
    body.append("username", data.username);
    body.append("password", data.password);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        showErrorMessage("Failed to authenticate");
        throw new Error(responseData.message || "Failed to authenticate");
      }

      // Store the JWT token in session storage
      sessionStorage.setItem("accessToken", responseData.access_token);
      sessionStorage.setItem("tokenType", responseData.token_type);
      sessionStorage.setItem("username", data.username);
      setCookie("accessToken", responseData.access_token, 1);

      showSuccessMessage("Logged in successfully");
      router.push("/packages"); // Redirect to the dashboard or any other page
    } catch (error) {
      console.error("Error during authentication:", error);
      showErrorMessage("Failed to authenticate");
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div style={{ minWidth: "30%" }}>
        <div
          className="flex min-h-full shadow-lg flex-1 flex-col justify-center 
px-6 py-12 lg:px-8 bg-white"
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
              className="mt-1 text-center text-2xl font-bold leading-9 
tracking-tight text-gray-900"
            >
              Sign In to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <TextInput
                    id="username"
                    icon={HiMail}
                    placeholder="Your username"
                    type="text"
                    sizing="sm"
                    helperText={
                      errors.username && (
                        <span className="font-medium text-red-500">
                          {errors.username.message}
                        </span>
                      )
                    }
                    {...register("username")}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <TextInput
                    id="password"
                    icon={HiLockClosed}
                    type="password"
                    placeholder="Your password"
                    sizing="sm"
                    helperText={
                      errors.password && (
                        <span className="font-medium text-red-500">
                          {errors.password.message}
                        </span>
                      )
                    }
                    {...register("password")}
                  />
                </div>
              </div>
              <div>
                <Button type="submit" className="flex w-full justify-center">
                  Sign In
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?
              <span
                onClick={() => {
                  router.push("/signup");
                }}
                className="font-semibold leading-6 text-indigo-600 
hover:text-indigo-500 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

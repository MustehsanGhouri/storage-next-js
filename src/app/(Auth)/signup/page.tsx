"use client";
import { routePaths } from "@/utils/constants/paths";
import useToast from "@/utils/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { HiMail, HiUser } from "react-icons/hi";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

const signupSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupSchema = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    showSuccessMessage,
    showErrorMessage,
    showWarningMessage,
    ToastContainer,
  } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    const newUUID = uuidv4();
    const payload = { ...data, id: newUUID };
    payload.confirmPassword;

    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        {
          method: "POST", // Use POST method to create a new user
          headers: {
            "Content-Type": "application/json", // Specify the content type
          },
          body: JSON.stringify(payload), // Send the data in the request body
          cache: "no-cache",
        }
      );

      if (!response.ok) {
        showErrorMessage("Unable to Created User");
        // Handle response errors
        throw new Error(`Error: ${response.status}`);
      }

      let createUserResponse = await response.json();
      showSuccessMessage("User Created Successfully");
      router.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}` +
          routePaths.AUTH.nextAuthSignInUrl
      );
    } catch (error) {}
  };

  return (
    <div className="flex justify-center mt-8">
      <div style={{ minWidth: "30%" }}>
        <div
          className="flex min-h-full shadow-lg flex-1 flex-col justify-center 
px-6 py-12 lg:px-8 bg-white"
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <div className="flex justify-center">
              <Image src="/login.gif" height={100} width={100} alt="" />
            </div> */}
            <h2
              className="mt-1 text-center text-2xl font-bold leading-9 
tracking-tight text-gray-900"
            >
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              //   action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User Name
                </label>
                <div className="mt-2">
                  <TextInput
                    id="username1"
                    icon={HiUser}
                    placeholder="your user name"
                    // required
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <TextInput
                    id="email4"
                    type="email"
                    icon={HiMail}
                    placeholder="name@flowbite.com"
                    // required
                    sizing="sm"
                    helperText={
                      errors.email && (
                        <span className="font-medium text-red-500">
                          {errors.email.message}
                        </span>
                      )
                    }
                    {...register("email")}
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
                    id="email4"
                    // icon={HiUser}

                    // required
                    type="password"
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmpassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <TextInput
                    id="email4"
                    type="password"
                    sizing="sm"
                    helperText={
                      errors.confirmPassword && (
                        <span className="font-medium text-red-500">
                          {errors.confirmPassword.message}
                        </span>
                      )
                    }
                    {...register("confirmPassword")}
                  />
                </div>
              </div>
              <div>
                <Button type="submit" className="flex w-full justify-center ">
                  Sign in
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => {
                  router.push("/");
                }}
                className="font-semibold leading-6 text-indigo-600 
hover:text-indigo-500 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

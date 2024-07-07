"use client";
import { Button, Label } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import useToast from "@/utils/hooks/useToast";
import { useImages } from "@/utils/hooks/useImages";
import { getCookie } from "@/utils/helper";

type FormData = {
  mobile: string;
};

const FileUploadClient: React.FC = () => {
  const { fetchImages } = useImages();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const { showSuccessMessage, showErrorMessage, ToastContainer } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [mobile, setMobile] = useState<string>("");
  const router = useRouter();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!file) {
      showErrorMessage("Please select a file to upload");
      return;
    }

    const token = getCookie("accessToken");
    if (!token) {
      showErrorMessage("You are not authorized. Please log in.");
      router.push("/signin");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mobile", mobile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/image/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          showErrorMessage("Unauthorized. Redirecting to login.");
          router.push("/signin");
        } else {
          showErrorMessage("Failed to upload file");
        }
        throw new Error(result.message || "Failed to upload file");
      }

      showSuccessMessage("File uploaded successfully");
      reset(); // Reset the form
      setFile(null); // Reset the file input
      setMobile(""); // Reset mobile input
      fetchImages(); // Fetch the latest images
      router.push("/dashboard"); // Redirect to the dashboard or any other page
    } catch (error) {
      console.error("Error during file upload:", error);
      showErrorMessage("Failed to upload file");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label
            htmlFor="mobile"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Mobile Number
          </Label>
          <PhoneInput
            country={"us"}
            value={mobile}
            onChange={(phone) => setMobile(phone)}
            inputProps={{
              name: "mobile",
              required: true,
              autoFocus: true,
            }}
            containerClass="w-full"
            inputClass="w-full"
          />
          {errors.mobile && (
            <span className="text-red-500">{errors.mobile.message}</span>
          )}
        </div>
        <div>
          <Label
            htmlFor="file"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select File
          </Label>
          <input
            type="file"
            id="file"
            onChange={onFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <Button type="submit" className="w-full">
          Upload
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default FileUploadClient;

"use client";
import FileUploadClient from "@/app/_components/FileUpload/FileUploaderClient";
import ImageList from "@/app/_components/ImagesList/ImageList";
import { ImagesProvider } from "@/utils/hooks/useImages";
import { Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



// Helper function to get a cookie
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      router.push("/signin");
    }
  }, [router]);

  return (
    <ImagesProvider>
      <Card className="max-w-sm" horizontal>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Upload files as per quota CL
        </h5>
        <FileUploadClient />
      </Card>
      <ImageList />
    </ImagesProvider>
  );
}

export default Dashboard;

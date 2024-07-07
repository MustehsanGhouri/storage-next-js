import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import useToast from "@/utils/hooks/useToast";
import { getCookie } from "../helper";

type Image = {
  filename: string;
  filepath: string;
  size: number;
  id: string;
  user_id: string;
  uploaded_at: string;
};

type ImagesContextType = {
  images: Image[];
  fetchImages: () => Promise<void>;
};

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

export const useImages = () => {
  const context = useContext(ImagesContext);
  if (!context) {
    throw new Error("useImages must be used within an ImagesProvider");
  }
  return context;
};

export const ImagesProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<Image[]>([]);
  const { showErrorMessage } = useToast();

  const fetchImages = async () => {
    try {
      const token = getCookie("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/image/images`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showErrorMessage("Failed to fetch images");
        throw new Error(data.message || "Failed to fetch images");
      }

      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      showErrorMessage("Failed to fetch images");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <ImagesContext.Provider value={{ images, fetchImages }}>
      {children}
    </ImagesContext.Provider>
  );
};

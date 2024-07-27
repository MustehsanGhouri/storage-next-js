"use client";

import { useImages } from "@/utils/hooks/useImages";
import { Card } from "flowbite-react";

const ImageList: React.FC = () => {
  const { images } = useImages();

  // Sort images in descending order by uploaded date
  const sortedImages = [...images].sort(
    (a, b) =>
      new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
  );

  return (
    <div className="mt-4">
      <Card>
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Uploaded Images ({sortedImages.length})
        </h3>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {sortedImages.map((image) => (
          <Card key={image.id} className="max-w-sm">
            <img
              src={image.filepath}
              alt={image.filename}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h5 className="text-lg font-bold">{image.filename}</h5>
              <p className="text-sm text-gray-600">Size: {image.size} bytes</p>
              <p className="text-sm text-gray-600">
                Uploaded at: {new Date(image.uploaded_at).toLocaleString()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageList;

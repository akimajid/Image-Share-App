"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import Link from "next/link";

const BASE_URL = "http://localhost:5000";

export default function ImagesPage() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get("/images");

        if (Array.isArray(response.data.images)) {
          const imagesWithFullUrl = response.data.images.map((image) => {
            const fullUrl = `${BASE_URL}${image.url}`;
            return {
              ...image,
              url: fullUrl,
            };
          });

          setImages(imagesWithFullUrl);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Failed to load images. Please try again later.");
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images. Please try again later.");
      }
    };

    fetchImages();
  }, []);

  if (error) {
    return (
      <p className="text-red-500 text-center font-semibold mt-6">{error}</p>
    );
  }

  return (
    <div className="container mx-auto p-12">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8 mt-2">
        All Uploaded Images
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {images.length > 0 ? (
          images.map((image) => {
            return (
              <div
                key={image.id}
                className="border rounded-lg overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform duration-200"
              >
                <Link href={`/images/${image.id}/edit`}>
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full h-64 object-cover cursor-pointer"
                  />
                </Link>
                <div className="p-4">
                  <p className="text-sm mt-2 text-gray-600">
                    {image.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No images available</p>
        )}
      </div>
    </div>
  );
}

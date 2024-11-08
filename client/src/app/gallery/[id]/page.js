"use client";

import { useEffect, useState } from "react";
import ImageCard from "../../../components/ImageCard";
import api from "../../../utils/api";
import { useParams } from "next/navigation";

const Gallery = () => {
  const params = useParams();
  const [gallery, setGallery] = useState(null);
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchGallery = async () => {
        try {
          const { data } = await api.get(`/galleries/${id}`);
          console.log("Gallery data:", data);

          const gallery = data.gallery || data.galleries?.[0];
          if (gallery) {
            setGallery(gallery);
          } else {
            console.warn("Gallery not found");
          }
        } catch (error) {
          console.error("Error fetching gallery:", error);
        }
      };

      fetchGallery();
    }
  }, [id]);

  if (!gallery) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{gallery.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.images && gallery.images.length > 0 ? (
          gallery.images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No images found.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;

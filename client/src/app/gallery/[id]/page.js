"use client";

import { useEffect, useState } from "react"; // Use only required imports
import ImageCard from "../../../components/ImageCard";
import api from "../../../utils/api";
import { useParams } from 'next/navigation'; // Correct hook for accessing dynamic route params

const Gallery = () => {
  const params = useParams(); // Access route params directly
  const [gallery, setGallery] = useState(null);

  // Use params.id directly, no need for React.use()
  const { id } = params;

  useEffect(() => {
    // Log the params and id to debug
    console.log("params:", params);
    console.log("Gallery ID:", id);
  
    if (id) {
      const fetchGallery = async () => {
        try {
          // Log before making the API call
          console.log(`Fetching gallery with ID: ${id}`);
  
          const { data } = await api.get(`/galleries/${id}`);
  
          // Log the API response
          console.log("Gallery data:", data);
  
          // Access the first gallery from the response
          const gallery = data.galleries?.[0];
  
          if (gallery) {
            // Log after setting the gallery data to ensure it is being stored correctly
            console.log("Gallery after setting state:", gallery);
            setGallery(gallery);
          } else {
            console.log("Gallery not found");
          }
        } catch (error) {
          // Log any errors
          console.error("Error fetching gallery:", error);
        }
      };
  
      fetchGallery();
    }
  }, [id]); // Ensure to fetch the gallery when 'id' changes
  

  // Log if the gallery is still loading
  if (!gallery) {
    console.log("Loading gallery...");
    return <p>Loading...</p>;
  }

  // Check if the images exist and log the count
  console.log("Images count:", gallery.images?.length);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{gallery.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.images && gallery.images.length > 0 ? (
          gallery.images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))
        ) : (
          <p>No images found.</p> // Handle the case where there are no images
        )}
      </div>
    </div>
  );
};

export default Gallery;

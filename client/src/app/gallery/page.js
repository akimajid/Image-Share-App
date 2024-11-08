"use client";

import { useEffect, useState } from "react";
import GalleryCard from "../../components/GalleryCard";
import api from "../../utils/api";

export default function Gallery() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        // Make the API call
        const response = await api.get("/galleries");
        const data = response.data;

        // Set galleries only if the response contains a valid array
        setGalleries(Array.isArray(data.galleries) ? data.galleries : []);
      } catch (error) {
        console.error("Error fetching galleries:", error);
        setError("Failed to load galleries. Please try again later.");
      } finally {
        // Ensure loading state is set to false after the request finishes
        setLoading(false);
      }
    };

    // Fetch galleries when the component mounts
    fetchGalleries();
  }, []);

  // Show a loading message while data is being fetched
  if (loading) return <div className="text-center">Loading galleries...</div>;

  // Show an error message if there's an error fetching data
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">All Galleries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Map through galleries and display GalleryCard component */}
        {galleries.length > 0 ? (
          galleries.map((gallery) => (
            <GalleryCard key={gallery.id} gallery={gallery} />
          ))
        ) : (
          <div className="col-span-full text-center">No galleries available.</div>
        )}
      </div>
    </div>
  );
}

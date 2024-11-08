"use client";

import { useEffect, useState } from "react";
import GalleryCard from "../../components/GalleryCard";
import api from "../../utils/api";
import CreateGallery from "../../components/CreateGallery";
import { FiPlusCircle } from "react-icons/fi";

export default function Gallery() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGalleryName, setNewGalleryName] = useState("");

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await api.get("/galleries");
        const data = response.data;
        setGalleries(Array.isArray(data.galleries) ? data.galleries : []);
      } catch (error) {
        console.error("Error fetching galleries:", error);
        setError("Failed to load galleries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const handleCreateGallery = async () => {
    try {
      console.log("Creating gallery with name:", newGalleryName);

      const response = await api.post("/galleries/create", {
        name: newGalleryName,
      });

      console.log("Gallery creation response:", response.data);

      if (response.data.gallery) {
        setGalleries((prevGalleries) => [
          response.data.gallery,
          ...prevGalleries,
        ]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating gallery:", error);
      console.log(
        "Error details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) return <div className="text-center">Loading galleries...</div>;

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">All Galleries</h1>

      {/* Button to open the modal for creating a new gallery */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 mb-6"
      >
        <FiPlusCircle className="text-lg" />
        Add New Gallery
      </button>

      {/* CreateGallery for creating a new gallery */}
      {isModalOpen && (
        <CreateGallery onClose={() => setIsModalOpen(false)}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">
              Create New Gallery
            </h2>
            <input
              type="text"
              placeholder="Gallery Name"
              value={newGalleryName}
              onChange={(e) => setNewGalleryName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
            <div className="flex gap-4">
              <button
                onClick={handleCreateGallery}
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Create Gallery
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </CreateGallery>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleries.length > 0 ? (
          galleries.map((gallery) => (
            <GalleryCard key={gallery.id} gallery={gallery} />
          ))
        ) : (
          <div className="col-span-full text-center">
            No galleries available.
          </div>
        )}
      </div>
    </div>
  );
}

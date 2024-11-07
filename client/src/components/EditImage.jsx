"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter, useParams } from "next/navigation";

const BASE_URL = "http://localhost:5000";

export default function EditImagePage() {
  const [image, setImage] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false); // Ensure this is defined
  const [currentUserId, setCurrentUserId] = useState(null); // State for userId
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    // Only access localStorage on the client-side
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      console.log("currentUserId from localStorage:", userId); // Debugging line
      setCurrentUserId(userId);
    }
  }, []);

  useEffect(() => {
    // Ensure currentUserId is available before fetching image data
    if (!id || !currentUserId) return;

    const fetchImage = async () => {
      console.log("Fetching image data...");
      try {
        const response = await api.get(`/images/${id}`);
        console.log("Image data response:", response.data);

        if (response.data) {
          setImage(response.data);
          setNewDescription(response.data.description || "");

          // Log and check the userId data type comparison
          console.log("Comparing user IDs:", currentUserId, response.data.userId);
          console.log("UserID types:", typeof currentUserId, typeof response.data.userId);

          // Check if the current user is the owner of the image
          const isOwner = String(currentUserId) === String(response.data.userId);
          console.log("isOwner:", isOwner);  // Debugging line
          
          if (isOwner) {
            setIsOwner(true);  // Ensure that this line is executed after the comparison
          } else {
            setError("You do not have permission to edit this image.");
          }
        } else {
          setError("Image not found.");
        }
      } catch (err) {
        console.error("Error fetching image:", err);
        setError("Failed to load image data.");
      }
    };

    fetchImage();
  }, [id, currentUserId]); // Add currentUserId as a dependency to ensure it's set

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleSave = async () => {
    if (!newDescription.trim()) return;

    try {
      const response = await api.put(`/images/${id}`, {
        description: newDescription,
      });

      if (response.status === 200) {
        router.push("/images");
      } else {
        setError("Failed to save changes. Please try again later.");
      }
    } catch (err) {
      console.error("Error updating image:", err);
      setError("Failed to save changes. Please try again later.");
    }
  };

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 font-semibold mt-6">{error}</p>
        {/* Button to navigate back to the images page */}
        <button
          onClick={() => router.push("/images")}
          className="mt-4 bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400"
        >
          Back to Images
        </button>
      </div>
    );
  }

  if (!image) {
    return <p className="text-center text-gray-500">Loading image...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Edit Image Description
      </h1>
      {isOwner ? (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <img
              src={`${BASE_URL}${image.url}`}
              alt={image.description}
              className="w-full h-64 object-cover cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <textarea
              value={newDescription}
              onChange={handleDescriptionChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Edit description"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => router.push("/images")}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-red-500 text-center font-semibold">
            You do not have permission to edit this image.
          </p>
          <button
            onClick={() => router.push("/images")}
            className="mt-4 bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400"
          >
            Back to Images
          </button>
        </div>
      )}
    </div>
  );
}

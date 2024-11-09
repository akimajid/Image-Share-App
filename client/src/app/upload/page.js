"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/api";

export default function UploadImage() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("url", url);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("userId", userId);

    try {
      const response = await api.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response);

      if (response.status === 200 || response.status === 201) { // Handling both 200 and 201
        // Show success toast
        toast.success("Image uploaded successfully!");
        // Redirect after the toast
        setTimeout(() => {
          router.push("/images");
        }, 1500); // Delay redirect to allow the toast to display
      } else {
        console.log("Unexpected response status:", response.status);
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Image File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}

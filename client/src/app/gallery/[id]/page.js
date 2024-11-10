"use client";

import { useEffect, useState } from "react";
import ImageCard from "../../../components/ImageCard";
import ImageModal from "../../../components/ImageModal";
import FullImageModal from "../../../components/FullImageModal";
import api from "../../../utils/api";
import { useParams } from "next/navigation";

const Gallery = () => {
  const params = useParams();
  const [gallery, setGallery] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullImageModalOpen, setIsFullImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const { id } = params;

  const fetchGallery = async () => {
    try {
      const { data } = await api.get(`/galleries/${id}`);
      const galleryData = data.gallery || data.galleries?.[0];
      if (galleryData) {
        setGallery(galleryData);
      } else {
        console.warn("Gallery not found");
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGallery();
    }
  }, [id]);

  const handleOpenModal = async () => {
    try {
      const imagesResponse = await api.get("/images");
      const galleriesResponse = await api.get("/galleries");

      setImages(imagesResponse.data.images);
      setGalleries(galleriesResponse.data.galleries);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching images or galleries:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitModal = async ({ imageId, newGalleryId }) => {
    try {
      const response = await api.put(`/gallery-images/${imageId}/move`, {
        newGalleryId,
      });
      handleCloseModal();
      await fetchGallery();
    } catch (error) {
      console.error("Error moving image:", error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsFullImageModalOpen(true);
  };

  const handleCloseFullImageModal = () => {
    setIsFullImageModalOpen(false);
  };

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
      <button
        onClick={handleOpenModal}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow mb-6 transition-colors duration-200"
      >
        Add Image
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.images && gallery.images.length > 0 ? (
          gallery.images.map((image) => (
            <div key={image.id} onClick={() => handleImageClick(image)}>
              <ImageCard image={image} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No images found.
          </p>
        )}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        images={images}
        galleries={galleries}
        currentGalleryId={id}
      />

      <FullImageModal
        isOpen={isFullImageModalOpen}
        onClose={handleCloseFullImageModal}
        image={selectedImage}
      />
    </div>
  );
};

export default Gallery;

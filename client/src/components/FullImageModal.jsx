import React from "react";

const FullImageModal = ({ isOpen, onClose, image }) => {
  const BASE_URL = "http://localhost:5000";
  const fullUrl = `${BASE_URL}${image?.image.url}`;

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative p-4 bg-white rounded-lg max-w-2xl w-full">
        <button
          className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={fullUrl}
          alt={image.name}
          className="w-full h-auto rounded-md"
        />
        <p className="mt-2 text-center text-gray-700 font-medium">
          {image.name}
        </p>
      </div>
    </div>
  );
};

export default FullImageModal;

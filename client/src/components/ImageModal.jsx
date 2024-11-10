import { useState, useEffect } from "react";

const ImageModal = ({
  isOpen,
  onClose,
  onSubmit,
  images,
  currentGalleryId,
}) => {
  const [selectedImageId, setSelectedImageId] = useState("");
  const [selectedGalleryId, setSelectedGalleryId] = useState(currentGalleryId);

  useEffect(() => {
    if (isOpen) {
      setSelectedGalleryId(currentGalleryId);
    }
  }, [isOpen, currentGalleryId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ imageId: selectedImageId, newGalleryId: selectedGalleryId });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Add Image</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Select Image:
            <select
              value={selectedImageId}
              onChange={(e) => setSelectedImageId(e.target.value)}
              className="border p-2 w-full"
              required
            >
              <option value="" disabled>
                Select an image
              </option>
              {images.map((image) => (
                <option key={image.id} value={image.id}>
                  {image.name || image.title}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black p-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageModal;

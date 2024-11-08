const ImageCard = ({ image }) => {
  const BASE_URL = "http://localhost:5000";
  const fullUrl = `${BASE_URL}${image.image.url}`;

  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative w-full h-48 overflow-hidden rounded-lg">
        <img
          src={fullUrl}
          alt="Uploaded Image"
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-lg"
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">
          {image.image.description}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;

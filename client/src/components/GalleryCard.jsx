import Link from "next/link";

const GalleryCard = ({ gallery }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold">{gallery.name}</h3>
      <p className="text-gray-600">{gallery.description}</p>
      <Link href={`/gallery/${gallery.id}`} className="text-blue-500 mt-2 inline-block">
        View Gallery
      </Link>
    </div>
  );
};

export default GalleryCard;

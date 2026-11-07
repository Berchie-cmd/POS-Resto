// A reusable card for each website feature.
// Props: image, title, description
function FeatureCard({ image, title, description }) {
  return (
    <div className="rounded-2xl border border-green-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="mx-auto mb-4 h-16 w-16 object-contain"
      />
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default FeatureCard;
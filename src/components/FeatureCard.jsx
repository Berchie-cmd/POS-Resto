// A reusable card. We use it once for every item in homeData.js.
// Props: image, title, description
function FeatureCard({ image, title, description }) {
  return (
    <div className="rounded-lg border p-4 text-center shadow dark:border-gray-600">
      <img
        src={image}
        alt={title}
        className="mx-auto mb-4 h-40 w-40 rounded-lg object-cover"
      />
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
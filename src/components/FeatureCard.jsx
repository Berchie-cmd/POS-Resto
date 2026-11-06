// A reusable card for each website feature.
// Props: icon, title, description
function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 text-4xl" aria-hidden="true">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default FeatureCard;
import Loader from "./Loader";

export default function Dashboard({ results, loading, error }) {
  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (results.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No results found.</p>;

    }
  return (
    <div className="mt-6 max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
  {results.map((item) => (
    <div
      key={item._id}
      className="p-5 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-xl transition"
    >
      <h2 className="font-semibold text-lg text-gray-800">
        {item.name || "Untitled"}
      </h2>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {item.description || "No description available"}
      </p>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">
          ⭐ {item.stars ?? 0}
        </span>
        <a
          href={item.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View Repo →
        </a>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {item.full_name}
      </p>
    </div>
  ))}
</div>

  );
}

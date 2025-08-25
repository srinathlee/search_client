import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");

  const fetchResults = async (searchKeyword, pageNum = 1) => {
    if (!searchKeyword) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:3000/results?keyword=${searchKeyword}&page=${pageNum}&limit=10`
      );
      if (!res.ok) throw new Error("Failed to fetch results");
      const data = await res.json();

    
      setResults(data.data);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  
  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
    setPage(1); 
    fetchResults(searchKeyword, 1);
  };

  useEffect(() => {
    if (keyword) {
      fetchResults(keyword, page);
    }
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        API-Driven Mini Web App
      </h1>

      <SearchForm onSearch={handleSearch} />

      <Dashboard results={results} loading={loading} error={error} />

      {/* Pagination */}
      {results.length > 0 && (
        <div className="flex justify-between items-center mt-6 max-w-xl mx-auto">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

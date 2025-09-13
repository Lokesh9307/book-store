import { useEffect, useState, useRef, useCallback } from "react";
import { fetchBooks } from "../api";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // typing value
  const [search, setSearch] = useState(""); // actual query for API
  const [filters, setFilters] = useState({
    rating: "",
    inStock: "",
    minPrice: "",
    maxPrice: "",
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 20;

  const observer = useRef();

  const loadBooks = async (reset = false) => {
    setLoading(true);
    const data = await fetchBooks({
      page,
      limit,
      search,
      ...filters,
    });

    if (reset) {
      setBooks(data.books);
    } else {
      setBooks((prev) => [...prev, ...data.books]);
    }

    setTotal(data.total);
    setLoading(false);
  };

  // Reset when filters or search change
  useEffect(() => {
    setPage(1);
    loadBooks(true);
  }, [search, filters]);

  // Load more on page change
  useEffect(() => {
    if (page > 1) loadBooks();
  }, [page]);

  // Infinite Scroll Observer
  const lastBookRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && books.length < total) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, books, total]
  );

  return (
    <>
      <Navbar
        search={searchInput}
        setSearch={setSearchInput}
        onSearch={() => setSearch(searchInput)} // ✅ search only triggers on button
      />

      <div className="container mx-auto px-6 py-6 bg-black">
        {/* Filter toggle (mobile only) */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-xl font-semibold text-white">Books</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {showFilters ? "Close Filters ✖" : "Filters ⚙️"}
          </button>
        </div>

        {/* Filters */}
        <div className={`mb-6 ${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="bg-black text-white ring-1 shadow rounded-md p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
              <Filters
                filters={filters}
                setFilters={setFilters}
                onApply={() => {
                  setPage(1);
                  loadBooks(true);
                  setShowFilters(false);
                }}
                layout="horizontal"
              />
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <main>
          {books.length === 0 && !loading ? (
            <p className="text-gray-400">No books found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book, idx) => {
                if (idx === books.length - 1) {
                  return (
                    <div key={book._id} ref={lastBookRef}>
                      <BookCard book={book} />
                    </div>
                  );
                }
                return <BookCard key={book._id} book={book} />;
              })}
            </div>
          )}

          {loading && <p className="text-center text-gray-400 mt-6">Loading more books...</p>}
        </main>
      </div>
    </>
  );
}

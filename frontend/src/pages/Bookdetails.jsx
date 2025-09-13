import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBookById } from "../api";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookById(id).then(setBook);
  }, [id]);

  if (!book) return <p className="p-6">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <Link to="/" className="text-indigo-600 mb-6 block bg-white w-[150px] tex-xl font-semibold rounded px-3 py-2 hover:bg-indigo-300 transition">
        ← Back to Books
      </Link>

      <div className="bg-black ring-1 ring-white/60 rounded shadow-lg p-6 flex flex-col md:flex-row gap-6 w-[500px]">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="h-72 w-72 object-contain self-center"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
          <p className="text-indigo-600 text-xl font-semibold mb-2">
            {book.price}
          </p>
          <p className="mb-2">⭐ Rating: {book.rating}</p>
          <p
            className={`mb-4 ${
              book.availability.includes("In stock")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {book.availability}
          </p>
          <a
            href={book.detailUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            View on Store
          </a>
        </div>
      </div>
    </div>
  );
}

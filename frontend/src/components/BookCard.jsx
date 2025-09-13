import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="bg-black ring-1 ring-white rounded-lg shadow hover:shadow-lg transition flex flex-col">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="h-56 w-full object-contain p-4"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg line-clamp-2 text-white">{book.title}</h3>
        <p className="text-indigo-300 font-bold mt-1">{book.price}</p>
        <p className="text-sm text-gray-600">⭐ {book.rating}</p>
        <p
          className={`text-sm mt-1 ${
            book.availability.includes("In stock")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {book.availability}
        </p>
        <Link
          to={`/books/${book._id}`}
          className="mt-auto bg-indigo-600 text-white px-3 py-2 rounded-md text-center hover:bg-indigo-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function Navbar({ search, setSearch, onSearch }) {
  return (
    <nav className="bg-black border-b-1 border-white rounded-xl text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-3">
        <h1 className="text-2xl font-bold tracking-wide text-indigo-300">
            <a href="/">Book Explorer</a>
        </h1>
        <div className="flex w-full md:w-1/2 gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books..."
            className="w-full rounded-l-md px-4 py-2 focus:outline-none bg-white text-black"
          />
          <button
            onClick={onSearch}
            className="bg-white text-indigo-800 px-4 py-2 rounded-md hover:scale-105 hover:transition hover:font-semibold"
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}

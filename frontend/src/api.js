const API_BASE = "http://localhost:5000/api";

export async function fetchBooks(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/books?${query}`);
  return res.json();
}

export async function fetchBookById(id) {
  const res = await fetch(`${API_BASE}/books/${id}`);
  return res.json();
}

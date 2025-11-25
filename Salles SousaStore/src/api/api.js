// src/api/api.js
const BASE_URL = "https://fakestoreapi.com";

async function request(endpoint, method = "GET", body = null, retries = 1) {
  const config = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) config.body = JSON.stringify(body);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} - ${text}`);
    }
    // FakeStore sometimes returns plain object or string token
    const txt = await res.text();
    try {
      return JSON.parse(txt);
    } catch {
      return txt;
    }
  } catch (err) {
    if (retries > 0) return request(endpoint, method, body, retries - 1);
    throw err;
  }
}

export const api = {
  getProducts: () => request("/products"),
  getProduct: (id) => request(`/products/${id}`),

  login: (payload) => request("/auth/login", "POST", payload),

  createProduct: (data) => request("/products", "POST", data),
  updateProduct: (id, data) => request(`/products/${id}`, "PUT", data),
  deleteProduct: (id) => request(`/products/${id}`, "DELETE"),
};

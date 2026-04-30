import type { Authlogin, Authregister} from "../types";

const BASE_URL = "http://localhost:3000/api";

async function fetchApi(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API error");
  }
  return res.json();
}

export async function register(data: Authregister) {
  return fetchApi(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUser(formData: FormData) {
  const res = await fetch(`${BASE_URL}/auth/users/update`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API error");
  }

  return res.json();
}

export async function login(data: Authlogin) {
  return fetchApi(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logout() {
  return fetchApi(`${BASE_URL}/auth/logout`, {
    method: "POST",
  });
}

export async function authenticate() {
  return fetchApi(`${BASE_URL}/auth/me`);
}

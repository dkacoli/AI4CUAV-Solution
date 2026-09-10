import apiClient from "./apiClient";
import { extractErrorMessage } from "./apiError";

export async function login({ email, password }) {
  try {
    const { data } = await apiClient.post("/api/account/login", {
      Email: email,
      Password: password,
    });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Login failed"));
  }
}

export async function register({ email, password }) {
  try {
    const { data } = await apiClient.post("/api/account/register", {
      Email: email,
      Password: password,
    });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Registration failed"));
  }
}

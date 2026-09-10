import apiClient from "./apiClient";
import { extractErrorMessage } from "./apiError";

export async function uploadDataset(formData) {
  try {
    const { data } = await apiClient.post("/api/Datasets/upload", formData);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Upload failed"));
  }
}

export async function listDatasets() {
  try {
    const { data } = await apiClient.get("/api/Datasets");
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Failed to fetch datasets"));
  }
}

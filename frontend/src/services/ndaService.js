import apiClient from "./apiClient";
import { extractErrorMessage } from "./apiError";

export async function sendNda({ orderId, email, partyName }) {
  try {
    const { data } = await apiClient.post("/api/Nda/send", { orderId, email, partyName });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "NDA send failed"));
  }
}

export async function uploadDatasetProof(orderId, file) {
  const form = new FormData();
  form.append("file", file);
  try {
    const { data } = await apiClient.post(`/api/Orders/${orderId}/dataset-proof`, form);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Dataset proof upload failed"));
  }
}

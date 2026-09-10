import apiClient from "./apiClient";
import { extractErrorMessage } from "./apiError";

// The caller (useOrderForm) already builds the payload in the exact shape
// CreateOrderDto expects — no need to re-map/re-default it here too.
export async function submitOrder(dto) {
  try {
    const { data } = await apiClient.post("/api/Orders", dto);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Failed to submit order"));
  }
}

// Admin only — requires an authenticated Admin session.
export async function listOrders() {
  try {
    const { data } = await apiClient.get("/api/Orders");
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Failed to fetch orders"));
  }
}

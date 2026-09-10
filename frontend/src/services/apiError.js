/**
 * Turn an axios error response body (a plain string, a validation object,
 * or an array of ASP.NET Identity errors) into one readable message.
 */
export function extractErrorMessage(error, fallback) {
  const status = error?.response?.status;
  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) return data;

  if (status === 401) return "Your session has expired. Please log in again.";
  if (status === 403) return "You don't have permission to do that.";

  if (Array.isArray(data)) {
    const descriptions = data.map((e) => e?.description || e?.Description).filter(Boolean);
    if (descriptions.length) return descriptions.join(" ");
  }

  if (data?.errors) {
    const messages = Object.values(data.errors).flat();
    if (messages.length) return messages.join(" ");
  }

  if (typeof data?.title === "string") return data.title;
  if (typeof data?.error === "string") return data.error;

  return error?.message || fallback;
}

/**
 * Format a PascalCase/camelCase value (or array) into a readable, comma-separated string.
 */
export function formatArrayField(value) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  const spaced = (value || "").replace(/([a-z])([A-Z])/g, "$1, $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Format a URL as a clickable link descriptor { href, text }.
 */
export function formatUrlLink(url) {
  if (!url) return null;
  return {
    href: url,
    text: new URL(url).hostname,
  };
}

/**
 * Validate email format.
 */
export function validateEmail(email) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

/**
 * Format a byte count as a human-readable KB/MB size.
 */
export function formatFileSize(bytes) {
  if (!bytes) return "-";
  const kb = bytes / 1024;
  const mb = kb / 1024;
  if (mb > 1) return `${mb.toFixed(2)} MB`;
  return `${kb.toFixed(2)} KB`;
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// validators.js

/**
 * Validates whether a string is a properly formatted URL.
 * @param {string} url - The input URL string.
 * @returns {boolean} True if valid, else false.
 */
export function isValidUrl(url) {
  try {
    // Will throw if invalid
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Validates whether a string is an integer representing minutes (for validity).
 * @param {string | number} input - The input value to check.
 * @returns {boolean} True if it's a valid integer >= 1.
 */
export function isValidValidityPeriod(input) {
  const num = Number(input);
  return Number.isInteger(num) && num > 0;
}

export function isValidShortCodeFormat(shortcode) {
  const regex = /^[a-zA-Z0-9]{1,10}$/;
  return regex.test(shortcode);
}

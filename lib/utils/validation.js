/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param {string} password
 * @returns {object} validation result
 */
export function validatePassword(password) {
  if (password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" }
  }
  return { valid: true }
}

/**
 * Validate required fields
 * @param {object} data
 * @param {array} requiredFields
 * @returns {object} validation result
 */
export function validateRequiredFields(data, requiredFields) {
  const missing = requiredFields.filter((field) => !data[field])
  if (missing.length > 0) {
    return { valid: false, error: `Missing fields: ${missing.join(", ")}` }
  }
  return { valid: true }
}

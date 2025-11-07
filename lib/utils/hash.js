import bcryptjs from "bcryptjs"

/**
 * Hash a password using bcryptjs
 * @param {string} password - The password to hash
 * @returns {Promise<string>} The hashed password
 */
export async function hashPassword(password) {
  const salt = await bcryptjs.genSalt(10)
  return bcryptjs.hash(password, salt)
}

/**
 * Verify a password against a hash
 * @param {string} password - The password to verify
 * @param {string} hash - The hash to compare against
 * @returns {Promise<boolean>} True if password matches hash
 */
export async function verifyPassword(password, hash) {
  return bcryptjs.compare(password, hash)
}

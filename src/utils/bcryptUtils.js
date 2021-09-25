import bcrypt from "bcryptjs";

/**
 *
 * @param {string} password
 * @param {string} passwordHash
 * @returns true if valid else throws error
 */

export async function checkPasswordValidity(password, passwordHash) {
  try {
    const valid = await bcrypt.compare(password, passwordHash);
    if (!valid) {
      throw new Error("Invalid password!");
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

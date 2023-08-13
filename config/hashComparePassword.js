const bcrypt = require("bcryptjs")

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

const comparePasswords = async(enteredPassword, hash) => {
    return await bcrypt.compare(enteredPassword, hash)
}

module.exports = {hashPassword, comparePasswords}
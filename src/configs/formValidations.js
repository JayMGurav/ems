export const emailValidation = {
  required: { value: true, message: "Email is required" },
};

export const fullValidation = {
  required: { value: true, message: "Fullname is required" },
  minLength: {
    value: 3,
    message: "Fullname should at least be 3 characters long",
  },
};

export const passwordValidation = {
  required: { value: true, message: "Password is required" },
  pattern: {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
    message: "password should contain upper-case, lower-case and Numbers",
  },
  minLength: {
    value: 4,
    message: "Should be minimum of length 4",
  },
  maxLength: {
    value: 8,
    message: "Should be maximum of length 8",
  },
};

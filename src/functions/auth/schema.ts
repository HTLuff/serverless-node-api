const loginSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};
const changePasswordSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};
const unsubscribeSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};

export { loginSchema, changePasswordSchema, unsubscribeSchema };

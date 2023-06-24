const createUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};
const getUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};

export { createUserSchema, getUserSchema };

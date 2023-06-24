// LIBS
import { call } from "@libs/aws-sdk";
// TYPES
import { GetUserInput } from "../types";

const createUser = async (userData) => {
  // Perform any necessary validation or transformations
  // Then delegate to the business logic
  // return logic.createUser(userData);
};

// Implement other user-related service functions
const getUser = async (userData: GetUserInput) => {
  try {
    // Validation
    if (!userData)
      throw new Error(`invalid request`, {
        cause: "missing required field: id",
      });
    // AWS libs interaction
    const response = await call("dynamodb", "get", {
      id: userData.id,
    });
    // return data
    return response;
  } catch (error) {
    throw error;
  }
  // Perform any necessary validation or transformations
  // Then delegate to the business logic
  // return logic.getUser(userData);
};

export { createUser, getUser };

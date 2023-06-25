// EXTERNAL
import { randomUUID } from "crypto";
import * as bcrypt from "bcrypt";
// LIBS
import * as aws from "@libs/aws-sdk";
import AppError from "@libs/app.error";
// TYPES
import {
  CreateUserInput,
  GetUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from "./types";
// UTILS
import { isValidEmail } from "@utils/email-validator";

export const createUser = async (input: CreateUserInput) => {
  try {
    if (!isValidEmail(input.email)) {
      throw new AppError({
        message: "invalid email",
        cause: "please enter a valid email address",
      });
    }
    const passwordHash = await bcrypt.hash(input.password, 10);
    const dynamoParams = {
      TableName: process.env.USERS_TABLE,
      Item: {
        id: randomUUID(),
        first_name: input.first_name,
        last_name: input.last_name,
        subscription: "trial",
        unsubscribe_reason: undefined,
        deleted_at: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        source_language: input.source_language,
        target_language: input.target_language,
        email: input.email,
        emailConfirmed: false,
        password_hash: passwordHash,
      },
      ConditionExpression: "attribute_not_exists(id)",
    };
    const user = await aws.call("dynamoDb", "put", dynamoParams);
    return user;
  } catch (error) {
    throw error(error);
  }
};

// Implement other user-related service functions
export const getUser = async (input: GetUserInput) => {
  try {
    // Validation
    if (!input.id) {
      throw new AppError({
        message: "invalid request",
        cause: "missing required field: id",
      });
    }
    // AWS libs interaction
    const dynamoParams = {
      TableName: process.env.USERS_TABLE,
      Item: {
        id: input.id,
      },
    };
    const response = await aws.call("dynamodb", "get", dynamoParams);
    // return data
    return response;
  } catch (error) {
    throw error(error);
  }
  // Perform any necessary validation or transformations
  // Then delegate to the business logic
  // return logic.getUser(userData);
};

export const getUsers = async () => {
  try {
    // Validation

    // AWS libs interaction
    const dynamoParams = {
      TableName: process.env.USERS_TABLE,
    };
    const response = await aws.call("dynamodb", "get", dynamoParams);
    // return data
    return response;
  } catch (error) {
    throw error(error);
  }
  // Perform any necessary validation or transformations
  // Then delegate to the business logic
  // return logic.getUser(userData);
};

export const deleteUser = async (input: DeleteUserInput) => {
  try {
    // Validation
    if (!input.id) {
      throw new AppError({
        message: "invalid request",
        cause: "missing required field: id",
      });
    }
    // AWS libs interaction
    const dynamoParams = {
      TableName: process.env.USERS_TABLE,
      Item: {
        id: input.id,
      },
    };
    const response = await aws.call("dynamodb", "delete", dynamoParams);
    return response;
  } catch (error) {
    throw error(error);
  }
};

export const updateUser = async (input: UpdateUserInput) => {
  try {
    // Validation
    if (!input.id) {
      throw new AppError({
        message: "invalid request",
        cause: "missing required field: id",
      });
    }
    // AWS libs interaction
    const dynamoParams = {
      TableName: process.env.USER_TABLE,
      Key: {
        id: input.id,
      },
      ConditionExpression: "attribute_exists(id)",
      UpdateExpression:
        "SET  source_language = :a, " +
        "target_language = :b" +
        "updated_at = :c",
      ExpressionAttributeValues: {
        ":a": input.source_language,
        ":b": input.target_language,
        ":c": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    };
    const response = await aws.call("dynamodb", "get", dynamoParams);
    return response;
  } catch (error) {
    throw error(error);
  }
};

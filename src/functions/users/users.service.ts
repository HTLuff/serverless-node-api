// EXTERNAL
import { randomUUID } from "crypto";
import * as bcrypt from "bcryptjs";
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
  if (
    !input.email ||
    !input.password ||
    !input.first_name ||
    !input.last_name ||
    !input.source_language ||
    !input.target_language
  ) {
    throw new AppError({
      statusCode: 400,
      message: "missing properties",
      cause: "",
    });
  }
  if (!isValidEmail(input.email)) {
    throw new AppError({
      statusCode: 400,
      message: "invalid email",
      cause: "please enter a valid email address",
    });
  }
  const passwordHash = await bcrypt.hash(input.password, 10);
  const dynamoParams = {
    // TableName: process.env.USERS_TABLE,
    TableName: "some-table-name",
    Item: {
      id: randomUUID(),
      first_name: input.first_name,
      last_name: input.last_name,
      subscription: "trial", // trial | trial-lapsed | subscribed | unsubscribed
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
};

// Implement other user-related service functions
export const getUser = async (input: GetUserInput) => {
  // Validation
  if (!input.id) {
    throw new AppError({
      statusCode: 400,
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
  return response;

  // Perform any necessary validation or transformations
  // Then delegate to the business logic
  // return logic.getUser(userData);
};

export const getUsers = async (nextPageToken?: string) => {
  // Validation
  const limit = 10;
  const lastEvaluatedKey: string = nextPageToken
    ? JSON.parse(nextPageToken)
    : undefined;
  // AWS libs interaction
  const dynamoParams = {
    TableName: process.env.USERS_TABLE,
    Limit: limit,
    ExclusiveStartKey: lastEvaluatedKey,
  };
  const response = await aws.call("dynamodb", "get", dynamoParams);
  // return data
  return response;

  // Perform any necessary validation or transformations
  // Then delegate to the business logic
  // return logic.getUser(userData);
};

export const deleteUser = async (input: DeleteUserInput) => {
  // Validation
  if (!input.id) {
    throw new AppError({
      statusCode: 400,
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
};

export const updateUser = async (input: UpdateUserInput) => {
  // Validation
  if (!input.id) {
    throw new AppError({
      statusCode: 400,
      message: "invalid request",
      cause: "missing required field: id",
    });
  }
  if (!input.source_language || !input.target_language) {
    throw new AppError({
      statusCode: 400,
      message: "invalid request",
      cause: "user properties weren't found",
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
};

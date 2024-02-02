// EXTERNAL
import * as bcrypt from "bcryptjs";
// LIBS
import AppError from "@libs/app.error";
import * as aws from "@libs/aws-sdk";
// UTILS
import { generateAccessToken } from "@utils/access-token";
// TYPES
import { LoginInput } from "./types";

export async function login(input: LoginInput) {
  // Retrieve the user item from DynamoDB
  const dynamoParams = {
    TableName: process.env.USERS_TABLE,
    Key: {
      email: input.email,
    },
  };

  const response = await aws.call("dynamodb", "get", dynamoParams);

  if (!response.id) {
    throw new AppError({
      statusCode: 401,
      message: "problem logging in",
      cause: "permission denied",
    });
  }

  // Compare the hashed password with the provided password
  const passwordMatch = await bcrypt.compare(
    input.password,
    response.password_hash
  );

  if (!passwordMatch) {
    throw new AppError({
      statusCode: 401,
      message: "problem logging in",
      cause: "permission denied",
    });
  }

  // Generate an access token (JWT)
  const accessToken = generateAccessToken(response.id, response.email);

  return { accessToken };
}

export async function changePassword() {
  return;
}

export async function unsubscribe() {
  return;
}

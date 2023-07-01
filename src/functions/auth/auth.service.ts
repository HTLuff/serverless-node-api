// EXTERNAL
import * as bcrypt from "bcrypt";
// LIBS
import AppError from "@libs/app.error";
import * as aws from "@libs/aws-sdk";
// UTILS
import { generateAccessToken } from "@utils/access-token";

export async function login(email: string, password: string) {
  try {
    // Retrieve the user item from DynamoDB
    const dynamoParams = {
      TableName: process.env.USERS_TABLE,
      Key: {
        email,
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
      password,
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
  } catch (error) {
    throw error(error);
  }
}

export async function changePassword() {
  return;
}

export async function unsubscribe() {
  return;
}
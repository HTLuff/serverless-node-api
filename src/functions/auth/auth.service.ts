// EXTERNAL
import * as bcrypt from "bcrypt";
// LIBS
import AppError from "@libs/app.error";
import * as aws from "@libs/aws-sdk";
import { generateAccessToken } from "@utils/access-token";

export async function login(username: string, password: string) {
  try {
    // Retrieve the user item from DynamoDB
    const dynamoParams = {
      TableName: process.env.USERS_TABLE,
      Key: {
        Username: username,
      },
    };

    const response = await aws.call("dynamodb", "get", dynamoParams);

    if (!response.id) {
      throw new AppError({
        message: "problem logging in",
        cause: "permission denied",
      });
    }

    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!passwordMatch) {
      throw new AppError({
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

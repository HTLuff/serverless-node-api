// EXTERNAL
const jwt = require("jsonwebtoken");
import AppError from "@libs/app.error";
// CONSTS
import * as consts from "../consts";

export function generateAccessToken(userId: string, username: string) {
  const payload = {
    userId,
    username,
  };

  const expiresIn = consts.TOKEN_EXPIRY_TIME;

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return accessToken;
}

export function validateAccessToken(accessToken: string) {
  try {
    // Verify the access token and decode its payload
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Return the decoded token
    return decodedToken;
  } catch (error) {
    throw new AppError({
      statusCode: 401,
      message: "permission denied",
      cause: "invalid access token",
    });
  }
}

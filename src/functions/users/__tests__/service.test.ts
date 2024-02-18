// EXTERNAL
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// const { getCommand, GetCommandOutput } = require("@aws-sdk/client-dynamodb");
// SERVICES
import * as userService from "../users.service";

// Mock the DynamoDB client
jest.mock("@aws-sdk/client-dynamodb");

describe("UserService", () => {
  describe("getUserById", () => {
    it("should throw error if no id is passed to it", async () => {
      // Arrange
      const userId = { id: "" };
      const errorMessage = "invalid request";

      (DynamoDBClient.prototype.send as jest.Mock).mockImplementationOnce(
        () => null
      );

      // Act and assert
      await expect(userService.getUser(userId)).rejects.toThrow(errorMessage);
    });

    it("should handle a DynamoDB error", async () => {
      // Arrange
      const userId = { id: "123" };
      const errorMessage = "DynamoDB error";

      // Mock the DynamoDB client's getCommand method to throw an error
      (DynamoDBClient.prototype.send as jest.Mock).mockImplementationOnce(
        () => {
          throw new Error(errorMessage);
        }
      );

      // Act and assert
      await expect(userService.getUser(userId)).rejects.toThrow(errorMessage);
    });
  });
});

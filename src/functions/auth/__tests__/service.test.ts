import * as authService from "../auth.service";
import * as bcrypt from "bcryptjs";
import * as aws from "@libs/aws-sdk";
import AppError from "@libs/app.error";
import { generateAccessToken } from "@utils/access-token";

jest.mock("bcryptjs");
jest.mock("@libs/aws-sdk");

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should login user and return access token", async () => {
      const mockLoginInput = {
        email: "test@example.com",
        password: "password",
      };

      const mockUser = {
        id: "mockUserId",
        email: "test@example.com",
        password_hash: "mockHashedPassword",
      };

      const mockDynamoParams = {
        TableName: process.env.USERS_TABLE,
        Key: {
          email: mockLoginInput.email,
        },
      };

      (aws.call as jest.Mock).mockResolvedValueOnce(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      (generateAccessToken as jest.Mock).mockReturnValueOnce("mockAccessToken");

      const result = await authService.login(mockLoginInput);

      expect(aws.call).toHaveBeenCalledWith(
        "dynamodb",
        "get",
        mockDynamoParams
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockLoginInput.password,
        mockUser.password_hash
      );
      expect(generateAccessToken).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.email
      );
      expect(result).toEqual({ accessToken: "mockAccessToken" });
    });

    it("should throw AppError if user not found", async () => {
      const mockLoginInput = {
        email: "test@example.com",
        password: "password",
      };

      (aws.call as jest.Mock).mockResolvedValueOnce({});

      await expect(authService.login(mockLoginInput)).rejects.toThrow(AppError);
      expect(aws.call).toHaveBeenCalled();
    });

    it("should throw AppError if password is incorrect", async () => {
      const mockLoginInput = {
        email: "test@example.com",
        password: "password",
      };

      const mockUser = {
        id: "mockUserId",
        email: "test@example.com",
        password_hash: "mockHashedPassword",
      };

      (aws.call as jest.Mock).mockResolvedValueOnce(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

      await expect(authService.login(mockLoginInput)).rejects.toThrow(AppError);
      expect(bcrypt.compare).toHaveBeenCalled();
    });
  });

  describe("changePassword", () => {
    it("should do something", async () => {
      // Add test case for changePassword function if needed
    });
  });

  describe("unsubscribe", () => {
    it("should do something", async () => {
      // Add test case for unsubscribe function if needed
    });
  });
});

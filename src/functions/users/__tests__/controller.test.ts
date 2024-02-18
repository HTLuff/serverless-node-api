import * as userController from "../users.controller";
import * as userService from "@functions/users/users.service";

jest.mock("@functions/users/users.service");

describe("userController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should call userService.createUser with the correct input", async () => {
      const mockCreateUserInput = {
        // Your mock input data for createUser function
      };
      const mockEvent = {
        body: mockCreateUserInput,
      };

      await userController.createUser(mockEvent);

      expect(userService.createUser).toHaveBeenCalledWith(mockCreateUserInput);
    });
  });

  describe("getUsers", () => {
    it("should call userService.getUsers with the correct input", async () => {
      const mockEvent = {
        queryStringParameters: {
          nextPageToken: "mockNextPageToken",
        },
      };

      await userController.getUsers(mockEvent);

      expect(userService.getUsers).toHaveBeenCalledWith("mockNextPageToken");
    });
  });

  describe("getUser", () => {
    it("should call userService.getUser with the correct input", async () => {
      const mockEvent = {
        pathParameters: {
          id: "mockUserId",
        },
      };

      await userController.getUser(mockEvent);

      expect(userService.getUser).toHaveBeenCalledWith({ id: "mockUserId" });
    });
  });

  describe("deleteUser", () => {
    it("should call userService.deleteUser with the correct input", async () => {
      const mockEvent = {
        pathParameters: {
          id: "mockUserId",
        },
      };

      await userController.deleteUser(mockEvent);

      expect(userService.deleteUser).toHaveBeenCalledWith({ id: "mockUserId" });
    });
  });

  describe("updateUser", () => {
    it("should call userService.updateUser with the correct input", async () => {
      const mockUpdateUserInput = {
        // Your mock input data for updateUser function
      };
      const mockEvent = {
        body: mockUpdateUserInput,
        pathParameters: {
          id: "mockUserId",
        },
      };

      await userController.updateUser(mockEvent);

      expect(userService.updateUser).toHaveBeenCalledWith({
        ...mockUpdateUserInput,
        id: "mockUserId",
      });
    });
  });
});

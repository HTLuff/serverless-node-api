import * as authController from "../auth.controller";
import * as authService from "@functions/auth/auth.service";

jest.mock("@functions/auth/auth.service");

describe("authController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should call authService.login with the correct input", async () => {
      const mockLoginInput = {
        // Your mock input data for login function
      };
      const mockEvent = {
        body: mockLoginInput,
      };

      await authController.login(mockEvent);

      expect(authService.login).toHaveBeenCalledWith(mockLoginInput);
    });
  });

  describe("changePassword", () => {
    it("should call authService.changePassword without input", async () => {
      await authController.changePassword();

      expect(authService.changePassword).toHaveBeenCalled();
    });
  });

  describe("unsubscribe", () => {
    it("should call authService.unsubscribe without input", async () => {
      await authController.unsubscribe();

      expect(authService.unsubscribe).toHaveBeenCalled();
    });
  });
});

// EXTERNAL
import { ICustomAPIGatewayProxyEvent } from "@libs/api-gateway";
// SERVICE
import * as authService from "@functions/auth/auth.service";
// TYPES
import { LoginInput } from "./types";

export function login(event: ICustomAPIGatewayProxyEvent<LoginInput>) {
  const { body } = event;
  return authService.login(body);
}

export function changePassword() {
  // const nextPageToken = event.queryStringParameters?.nextPageToken;

  return authService.changePassword();
}

export function unsubscribe() {
  // const id = event.pathParameters?.id as string;

  return authService.unsubscribe();
}

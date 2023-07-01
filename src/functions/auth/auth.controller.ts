import { ICustomAPIGatewayProxyEvent } from "@libs/api-gateway";
import * as authService from "@functions/auth/auth.service";
// UTILS
import AppError from "@libs/app.error";

export function login(event: ICustomAPIGatewayProxyEvent<ICreateMovieDTO>) {
  const { body } = event;
  return authService.login(body);
}

export function changePassword(event: ICustomAPIGatewayProxyEvent) {
  const nextPageToken = event.queryStringParameters?.nextPageToken;

  return authService.changePassword(nextPageToken);
}

export function unsubscribe(event: ICustomAPIGatewayProxyEvent) {
  const id = event.pathParameters?.id as string;

  return authService.unsubscribe(id);
}

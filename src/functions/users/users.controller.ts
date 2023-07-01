import { ICustomAPIGatewayProxyEvent } from "@libs/api-gateway";
// import {
//   ICreateMovieDTO,
//   UpdateMovieInfoDTO,
// } from "@repositories/movie.repository";
import * as userService from "@functions/users/users.service";
import { CreateUserInput, UpdateUserInput } from "./types";

export function createUser(
  event: ICustomAPIGatewayProxyEvent<CreateUserInput>
) {
  const { body } = event;
  return userService.createUser(body);
}

export function getUsers(event: ICustomAPIGatewayProxyEvent) {
  const nextPageToken = event.queryStringParameters?.nextPageToken;

  return userService.getUsers(nextPageToken);
}

export function getUser(event: ICustomAPIGatewayProxyEvent) {
  const id = event.pathParameters?.id as string;

  return userService.getUser({ id });
}

export function deleteUser(event: ICustomAPIGatewayProxyEvent) {
  const id = event.pathParameters?.id as string;

  return userService.deleteUser({ id });
}

export function updateUser(
  event: ICustomAPIGatewayProxyEvent<UpdateUserInput>
) {
  const id = event.pathParameters?.id as string;
  const { body } = event;
  return userService.updateUser({ ...body, id });
}

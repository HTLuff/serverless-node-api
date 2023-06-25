import { ICustomAPIGatewayProxyEvent } from "@libs/api-gateway";
import {
  ICreateMovieDTO,
  UpdateMovieInfoDTO,
} from "@repositories/movie.repository";
import * as userService from "@functions/users/users.service";

export function createUser(
  event: ICustomAPIGatewayProxyEvent<ICreateMovieDTO>
) {
  const { body } = event;

  return userService.createUser(body);
}

export function getUsers(event: ICustomAPIGatewayProxyEvent) {
  const id = Number(event.pathParameters?.id);
  const nextPageToken = event.queryStringParameters?.nextPageToken;

  return userService.getUsers(id, nextPageToken);
}

export function getUser(event: ICustomAPIGatewayProxyEvent) {
  const id = event.pathParameters?.id as string;

  return userService.getUser(id);
}

export function deleteUser(event: ICustomAPIGatewayProxyEvent) {
  const id = event.pathParameters?.id as string;

  return userService.deleteUser(id);
}

export function updateUser(
  event: ICustomAPIGatewayProxyEvent<UpdateMovieInfoDTO>
) {
  const id = event.pathParameters?.id as string;

  return userService.updateUser(id, event.body);
}
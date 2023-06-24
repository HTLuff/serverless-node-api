// LIBS
import { middyfy } from "@libs/lambda";
import {
  failure,
  success,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway-response";
// SCHEMA
import { createUserSchema, getUserSchema } from "./schema";
// SERVICES
import * as UserService from "./services/user";
// TYPES
import { CreateUserResponse } from "./types";

/**
 *
 * GET /users
 * POST /users
 * GET /users/:id
 * PUT /users/:id
 * DELETE /users/:id
 */

const createUser: ValidatedEventAPIGatewayProxyEvent<
  typeof createUserSchema
> = async (event) => {
  try {
    const response: CreateUserResponse = await UserService.createUser(event);
    return success(200, response);
  } catch (error) {
    return failure(400, error);
  }
};

const getUser: ValidatedEventAPIGatewayProxyEvent<
  typeof getUserSchema
> = async (event) => {
  try {
    const response = await UserService.getUser(event);
    return success(200, response);
  } catch (error) {
    return failure(400, error);
  }
};

export default {
  createUser: middyfy(createUser),
  getUser: middyfy(getUser),
};

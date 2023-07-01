// EXTERNAL
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
// LIBS
import AppError from "./app.error";
import { formatJSONResponse } from "./api-gateway-response";
// UTILS
import { validateAccessToken } from "@utils/access-token";

export interface ICustomAPIGatewayProxyEvent<TBody = unknown>
  extends Omit<APIGatewayProxyEvent, "body"> {
  body: TBody;
}

export interface ICustomAPIGatewayProxyHandler<
  TBody = unknown,
  TResult = unknown
> {
  (event: ICustomAPIGatewayProxyEvent<TBody>): Promise<TResult>;
}

export interface IRouter {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  resource: string;
  handler: ICustomAPIGatewayProxyHandler;
  schema: any;
  authorize: boolean;
}

export function createAPIGatewayProxyHandler(
  routers: IRouter[]
): APIGatewayProxyHandler {
  return async (event) => {
    try {
      const { httpMethod, resource } = event;
      const foundRouter = routers.find((router) => {
        return router.method === httpMethod && router.resource === resource;
      });
      // test<
      if (!foundRouter) {
        return formatJSONResponse(
          { message: `${httpMethod.toUpperCase()} ${resource} not found!` },
          404
        );
      }

      // test<
      if (foundRouter.authorize) {
        console.log("JWT validation here.");
        const accessToken = event.headers.authorization; // Example: Bearer <access_token>
        validateAccessToken(accessToken);
      }
      const result = await foundRouter.handler({
        ...event,
        body: event.body ? JSON.parse(event.body) : {},
      });

      return formatJSONResponse(result);
    } catch (err: unknown) {
      console.error(err);

      const error = err as Error;
      let statusCode = 500;
      if (error instanceof AppError) {
        statusCode = error.statusCode;
      }

      return formatJSONResponse({ message: error.message }, statusCode);
    }
  };
}

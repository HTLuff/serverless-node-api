import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

interface Response {
  statusCode: number;
  body: string;
  headers: {
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Credentials": boolean;
    "Content-Type": string;
  };
}
export function success(statusCode: number, body: any): Response {
  return buildResponse(statusCode || 200, body);
}

export function failure(statusCode: number, body: any) {
  console.error("Error:", body);
  /**
   * Add call to events DB to track errors
   */
  return buildResponse(statusCode || 400, body);
}

function buildResponse(statusCode: number, body: any): Response {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

import { createAPIGatewayProxyHandler } from "@libs/api-gateway";
import routers from "./users.router";

export const main = createAPIGatewayProxyHandler(routers);

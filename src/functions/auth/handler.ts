import { createAPIGatewayProxyHandler } from "@libs/api-gateway";
import routers from "./auth.router";

export const main = createAPIGatewayProxyHandler(routers);

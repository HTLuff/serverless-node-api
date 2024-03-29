import { handlerPath } from "@libs/handler-resolver";
import routers from "./users.router";

export const handleUsers = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: routers.map((router) => {
    return {
      httpApi: {
        path: router.resource,
        method: router.method,
        request: {
          schemas: {
            "application/json": router.schema,
          },
        },
      },
    };
  }),
};

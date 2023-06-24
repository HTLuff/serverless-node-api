import { createUserSchema, getUserSchema } from "./schema";
import { handlerPath } from "@libs/handler-resolver";

const CreateUser = {
  handler: `${handlerPath(__dirname)}/handler.createUser`,
  events: [
    {
      http: {
        method: "post",
        path: "users",
        request: {
          schemas: {
            "application/json": createUserSchema,
          },
        },
      },
    },
  ],
};
const GetUser = {
  handler: `${handlerPath(__dirname)}/handler.getUser`,
  events: [
    {
      http: {
        method: "get",
        path: "users/{id}",
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
          schemas: {
            "application/json": getUserSchema,
          },
        },
      },
    },
  ],
};

export { CreateUser, GetUser };

// TYPES
import { IRouter } from "@libs/api-gateway";
// FUNCTIONS
import * as controller from "./users.controller";

const routers: IRouter[] = [
  {
    method: "GET",
    resource: `/users`,
    handler: controller.getUsers,
    schema: "",
    authorize: true,
  },
  {
    method: "GET",
    resource: `/users/{id}`,
    handler: controller.getUser,
    schema: "",
    authorize: true,
  },
  {
    method: "POST",
    resource: `/users`,
    handler: controller.createUser,
    schema: "",
    authorize: false,
  },
  {
    method: "DELETE",
    resource: `/users/{id}`,
    handler: controller.deleteUser,
    schema: "",
    authorize: true,
  },
  {
    method: "PUT",
    resource: `/users/{id}`,
    handler: controller.updateUser,
    schema: "",
    authorize: true,
  },
];

export default routers;

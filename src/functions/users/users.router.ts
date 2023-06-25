import { IRouter } from "@libs/api-gateway";
import * as controller from "./users.controller";

const ROOT_PATH = "/users";

const routers: IRouter[] = [
  {
    method: "GET",
    resource: `${ROOT_PATH}/`,
    handler: controller.getUsers,
    schema: "",
  },
  {
    method: "GET",
    resource: `${ROOT_PATH}/{id}`,
    handler: controller.getUser,
    schema: "",
  },
  {
    method: "POST",
    resource: `${ROOT_PATH}`,
    handler: controller.createUser,
    schema: "",
  },
  {
    method: "DELETE",
    resource: `${ROOT_PATH}/{id}`,
    handler: controller.deleteUser,
    schema: "",
  },
  {
    method: "PUT",
    resource: `${ROOT_PATH}/{id}`,
    handler: controller.updateUser,
    schema: "",
  },
];

export default routers;

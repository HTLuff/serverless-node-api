// TYPES
import { IRouter } from "@libs/api-gateway";
import * as schemas from "./schema";
// FUNCTIONS
import * as controller from "./auth.controller";

const routers: IRouter[] = [
  {
    method: "POST",
    resource: `/auth/login`,
    handler: controller.login,
    schema: schemas.loginSchema,
    authorize: true,
  },
  {
    method: "POST",
    resource: `/auth/change-password`,
    handler: controller.changePassword,
    schema: schemas.changePasswordSchema,
    authorize: true,
  },
  {
    method: "POST",
    resource: `/auth/unsubscribe`,
    handler: controller.unsubscribe,
    schema: schemas.unsubscribeSchema,
    authorize: true,
  },
];

export default routers;

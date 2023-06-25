/**
 *
 *
 * RESPONSES
 *
 */
export type CreateUserResponse = {
  id: string;
  name: string;
  email: string;
};
/**
 *
 *
 * INPUTS
 *
 */
export type CreateUserInput = {
  first_name: string;
  last_name: string;
  source_language: string;
  target_language: string;
  email: string;
  password: string;
};
export type GetUserInput = {
  id: string;
};
export type DeleteUserInput = {
  id: string;
};
export type UpdateUserInput = {
  id: string;
  source_language: string;
  target_language: string;
};

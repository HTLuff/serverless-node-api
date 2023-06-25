export default class AppError extends Error {
  constructor({ message, cause }) {
    super(message);
    this.name = this.constructor.name;
    this.cause = cause;
    Error.captureStackTrace(this, AppError);
  }
}

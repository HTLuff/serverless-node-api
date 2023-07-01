export default class AppError extends Error {
  public statusCode: number;
  constructor({
    message,
    cause,
    statusCode,
  }: {
    message: string;
    cause: string;
    statusCode: number;
  }) {
    super(message);
    this.name = this.constructor.name;
    this.cause = cause;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, AppError);
  }
}

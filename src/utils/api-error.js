class ApiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    errors = [],
    stact = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stact) {
      this.stack = stact;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
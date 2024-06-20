class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    // this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = {
  UnauthorizedError,
};

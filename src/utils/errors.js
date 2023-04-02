class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

class EntityError extends HttpError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = {
  HttpError,
  EntityError,
};

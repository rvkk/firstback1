class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    } else if (this instanceof NotFound) {
      return 404;
    } else if (this instanceof UnAuthorized) {
      return 401;
    } else if (this instanceof Forbidden) {
      return 403;
    } else if (this instanceof Conflict) {
      return 409;
    } else {
      return 500;
    }
  }
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
class UnAuthorized extends GeneralError { }
class Forbidden extends GeneralError { }
class Conflict extends GeneralError { }

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  UnAuthorized,
  Forbidden,
  Conflict
};

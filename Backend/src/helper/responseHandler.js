class ResponseHandler {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  sender(code, message, data, error, info) {
    if (error) {
      console.log("ERROR : ", error);
    }

    this.res.status(code).json({
      message: message,
      data: data || {},
      error: info,
    });
  }

  success(message, data, info) {
    const msg = "STATUS.SUCCESS";
    this.sender(STATUS_CODES.SUCCESS, message || msg, data, info);
  }

  badRequest(message, data, info) {
    this.sender(
      STATUS_CODES.BAD_REQUEST,
      message || "STATUS.BAD_REQUEST",
      data,
      info
    );
  }

  unauthorized(message, data, info) {
    this.sender(
      STATUS_CODES.UNAUTHORIZED,
      message || "STATUS.UNAUTHORIZED",
      data,
      info
    );
  }

  notFound(message, info) {
    this.sender(
      STATUS_CODES.NOT_FOUND,
      message || "STATUS.NOT_FOUND",
      info
    );
  }

  validationError(message, error) {
    this.sender(
      STATUS_CODES.VALIDATION_ERROR,
      message || "STATUS.VALIDATION_ERROR",
      null,
      null,
      error,
      false
    );
  }

  serverError(error) {
    this.sender(
      STATUS_CODES.SERVER_ERROR,
      "Internal server error.",
      undefined,
      error
    );
  }
}

export default ResponseHandler;
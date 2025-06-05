interface AppErrorProps {
  message: string;
  statusCode: number;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly status: "fail" | "error";

  constructor({ message, statusCode }: AppErrorProps) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request") {
    return new AppError({ message, statusCode: 400 });
  }

  static unauthorized(message = "Unauthorized") {
    return new AppError({ message, statusCode: 401 });
  }

  static forbidden(message = "Forbidden") {
    return new AppError({ message, statusCode: 403 });
  }

  static notFound(message = "Not Found") {
    return new AppError({ message, statusCode: 404 });
  }

  static internal(message = "Internal Server Error") {
    return new AppError({ message, statusCode: 500 });
  }
}

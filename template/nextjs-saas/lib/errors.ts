/** Base API error */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** 403 Forbidden */
export class ForbiddenError extends ApiError {
  constructor() {
    super("Access forbidden", 403);
    this.name = "ForbiddenError";
  }
}

/** 429 Too Many Requests */
export class RateLimitError extends ApiError {
  constructor(public retryAfter?: number) {
    super("Too many requests", 429);
    this.name = "RateLimitError";
  }
}

/** Network error / offline */
export class OfflineError extends Error {
  constructor() {
    super("Network unavailable");
    this.name = "OfflineError";
  }
}

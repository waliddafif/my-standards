import { ApiError, ForbiddenError, OfflineError, RateLimitError } from "./errors";
import { auth } from "./firebase";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * Authenticated fetch wrapper.
 * Automatically injects Firebase Bearer token and handles common error cases.
 */
export async function api<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  let token: string | undefined;

  try {
    token = await auth.currentUser?.getIdToken();
  } catch {
    // Not authenticated yet — proceed without token (public endpoints)
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  } catch {
    throw new OfflineError();
  }

  if (response.status === 204) return undefined as T;

  if (response.status === 403) throw new ForbiddenError();

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new RateLimitError(retryAfter ? parseInt(retryAfter) : undefined);
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(body?.detail ?? "Request failed", response.status);
  }

  return response.json() as Promise<T>;
}

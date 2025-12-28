/**
 * PokéAPI HTTP client
 * Layer 5: Service/IO adapter
 * 
 * NOTE: Caching and request deduplication are now handled by React Query.
 * This module provides simple fetch utilities for the PokeAPI.
 */

const BASE_URL = "https://pokeapi.co/api/v2";

export class PokeAPIError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "PokeAPIError";
  }
}

export interface FetchOptions {
  queryParams?: Record<string, string | number | boolean>;
}

export async function fetchFromPokeAPI<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  let url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_URL}/${endpoint}`;

  // Add query parameters if provided
  if (options?.queryParams) {
    const params = new URLSearchParams();
    Object.entries(options.queryParams).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new PokeAPIError(
        `PokéAPI request failed: ${response.statusText}`,
        response.status
      );
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    if (error instanceof PokeAPIError) {
      throw error;
    }
    throw new PokeAPIError(
      `Network error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Build a query key for React Query
 * Consistent key structure ensures proper caching
 */
export function buildQueryKey(endpoint: string, options?: FetchOptions): string[] {
  const key = [endpoint];
  if (options?.queryParams) {
    key.push(JSON.stringify(options.queryParams));
  }
  return key;
}

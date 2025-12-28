/**
 * Local storage service - handles all browser localStorage operations
 * Layer 5: Services (IO/adapters)
 * 
 * Provides type-safe read/write operations with error handling
 * for persisting application state to browser localStorage.
 */

/**
 * Retrieves a value from localStorage and parses it as JSON
 * @param key - The storage key to retrieve
 * @returns The parsed value or null if not found or invalid
 */
export function getFromStorage<T>(key: string): T | null {
  // SSR safety check
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return null;
  }
}

/**
 * Stores a value in localStorage as JSON
 * @param key - The storage key to set
 * @param value - The value to store (will be JSON stringified)
 */
export function setInStorage<T>(key: string, value: T): void {
  // SSR safety check
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
}

/**
 * Removes a value from localStorage
 * @param key - The storage key to remove
 */
export function removeFromStorage(key: string): void {
  // SSR safety check
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
}

/**
 * Clears all localStorage data
 */
export function clearStorage(): void {
  // SSR safety check
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

/**
 * Checks if localStorage is available
 * @returns true if localStorage is available, false otherwise
 */
export function isStorageAvailable(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

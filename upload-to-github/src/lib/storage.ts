/**
 * Small, failure-tolerant wrapper around localStorage.
 * An in-memory copy keeps progress for the current visit even when browser storage is blocked or full.
 * Only activity progress is stored: no personal information, no cookies.
 */

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const memory = new Map<string, unknown>();

function browserStorage(): StorageLike | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function createProgressStore(getStorage: () => StorageLike | null = browserStorage) {
  return {
    /** Returns the remembered value, or null if nothing usable is stored. Corrupted data is discarded. */
    load(key: string): unknown {
      if (memory.has(key)) return memory.get(key);
      const storage = getStorage();
      if (!storage) return null;
      try {
        const raw = storage.getItem(key);
        return raw === null ? null : (JSON.parse(raw) as unknown);
      } catch {
        try {
          storage.removeItem(key);
        } catch {
          /* Storage unavailable: nothing more to do. */
        }
        return null;
      }
    },
    /** Saves the value. Returns false when only the in-memory copy could be kept. */
    save(key: string, value: unknown): boolean {
      memory.set(key, value);
      const storage = getStorage();
      if (!storage) return false;
      try {
        storage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
    /** Clears only this key. */
    clear(key: string): void {
      memory.delete(key);
      const storage = getStorage();
      try {
        storage?.removeItem(key);
      } catch {
        /* Storage unavailable. */
      }
    },
    /** For tests. */
    forgetMemory(): void {
      memory.clear();
    },
  };
}

export const progressStore = createProgressStore();

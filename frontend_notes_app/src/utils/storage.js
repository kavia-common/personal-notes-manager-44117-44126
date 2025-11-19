let debouncedTimers = new Map();

/**
 * Safely read JSON from localStorage by key
 * @template T
 * @param {string} key
 * @returns {T|null}
 */
export function getItem(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Safely write JSON to localStorage
 * @param {string} key
 * @param {any} value
 */
export function setItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota/private errors
  }
}

/**
 * Simple debounce utility
 * @template {Function} F
 * @param {F} fn
 * @param {number} wait
 * @returns {F & { cancel: () => void }}
 */
export function debounce(fn, wait = 300) {
  /** @type {number|undefined} */
  let t;
  const wrapped = ((...args) => {
    if (t) window.clearTimeout(t);
    // @ts-ignore
    t = window.setTimeout(() => fn(...args), wait);
  });
  // @ts-ignore
  wrapped.cancel = () => {
    if (t) window.clearTimeout(t);
    t = undefined;
  };
  // @ts-ignore
  return wrapped;
}

/**
 * Debounced setter for localStorage writes
 */
export const setItemDebounced = debounce(setItem, 300);

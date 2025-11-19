type Debounced<T extends (...args: any[]) => void> = T & { cancel: () => void };

export function getItem<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota or private errors
  }
}

export function debounce<F extends (...args: any[]) => void>(fn: F, wait = 300): Debounced<F> {
  let t: number | undefined;
  const wrapped = ((...args: any[]) => {
    if (t) window.clearTimeout(t);
    // @ts-ignore
    t = window.setTimeout(() => fn(...args), wait);
  }) as Debounced<F>;
  wrapped.cancel = () => {
    if (t) window.clearTimeout(t);
    t = undefined;
  };
  return wrapped;
}

export const setItemDebounced = debounce(setItem, 300);

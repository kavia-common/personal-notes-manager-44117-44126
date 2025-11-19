export function uuid() {
  // PUBLIC_INTERFACE
  /** Generate a RFC4122-ish UUID using crypto if available, otherwise fallback. */
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // @ts-ignore
    return crypto.randomUUID();
  }
  // fallback
  const s: string[] = [];
  const hex = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  for (let i = 0; i < hex.length; i++) {
    const c = hex[i];
    if (c === 'x' || c === 'y') {
      const r = Math.floor(Math.random() * 16);
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      s.push(v.toString(16));
    } else {
      s.push(c);
    }
  }
  return s.join('');
}

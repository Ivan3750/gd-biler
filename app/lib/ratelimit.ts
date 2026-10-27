// In-memory limiter: good enough for a single Node process, resets on restart.
const hits = new Map<string, number[]>();

function recent(key: string, windowMs: number) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (list.length) hits.set(key, list);
  else hits.delete(key);
  return list;
}

/** True while `key` is still under the limit. Does not count the call. */
export function allowed(key: string, limit: number, windowMs: number) {
  return recent(key, windowMs).length < limit;
}

export function record(key: string, windowMs: number) {
  const list = recent(key, windowMs);
  list.push(Date.now());
  hits.set(key, list);
}

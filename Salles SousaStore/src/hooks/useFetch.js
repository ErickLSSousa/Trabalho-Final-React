import { useEffect, useRef, useState } from "react";

const cache = new Map();

export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(() => cache.get(fetcher) ?? null);
  const [loading, setLoading] = useState(!cache.has(fetcher));
  const [error, setError] = useState(null);
  const abortRef = useRef(false);

  useEffect(() => {
    abortRef.current = false;
    let mounted = true;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcher();
        if (!abortRef.current && mounted) {
          cache.set(fetcher, result);
          setData(result);
        }
      } catch (err) {
        if (!abortRef.current && mounted) setError(err);
      } finally {
        if (!abortRef.current && mounted) setLoading(false);
      }
    }

    run();
    return () => {
      abortRef.current = true;
      mounted = false;
    };
  
  }, deps);

  return { data, loading, error };
}

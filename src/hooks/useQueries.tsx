"use client";

import { useEffect, useState, useCallback } from "react";

type Props<T, P extends any[]> = {
  fn: (...params: P) => Promise<T>;
  params?: P;
};

const useQueries = <T, P extends any[]>({ fn, params = [] }: Props<T, P>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn(...params);
      setData(res);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [fn, ...params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, loading, error, refetch };
};

export default useQueries;

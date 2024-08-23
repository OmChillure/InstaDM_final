"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { RootState, AppDispatch, AppStore } from './store';

type UseQueriesProps<T, P extends any[]> = {
  fn: (...params: P) => Promise<T>;
  params?: Partial<P>; // Allow params to be undefined or an array with fewer elements
};

export const useQueries = <T, P extends any[]>({ fn, params = [] as unknown as P }: UseQueriesProps<T, P>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn(...(params as P));
      setData(res);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [fn, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, loading, error, refetch };
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

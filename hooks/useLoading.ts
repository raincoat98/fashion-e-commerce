import { useState, useCallback } from "react";

interface UseLoadingOptions {
  initialLoading?: boolean;
  delay?: number; // 최소 로딩 시간 (ms)
  onError?: (error: Error) => void;
  onSuccess?: (data: any) => void;
}

interface UseLoadingReturn {
  loading: boolean;
  error: Error | null;
  data: any;
  execute: <T>(asyncFunction: () => Promise<T>) => Promise<T>;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setData: (data: any) => void;
  reset: () => void;
}

export function useLoading(options: UseLoadingOptions = {}): UseLoadingReturn {
  const { initialLoading = false, delay = 300, onError, onSuccess } = options;

  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const execute = useCallback(
    async <T>(asyncFunction: () => Promise<T>): Promise<T> => {
      const startTime = Date.now();

      try {
        setLoading(true);
        setError(null);

        const result = await asyncFunction();

        // 최소 로딩 시간 보장
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < delay) {
          await new Promise((resolve) =>
            setTimeout(resolve, delay - elapsedTime)
          );
        }

        setData(result);
        setLoading(false);
        onSuccess?.(result);

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setLoading(false);
        onError?.(error);
        throw error;
      }
    },
    [delay, onError, onSuccess]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    setLoading,
    setError,
    setData,
    reset,
  };
}

// 여러 로딩 상태를 관리하는 훅
export function useMultipleLoading() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, Error | null>>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: loading }));
  }, []);

  const setError = useCallback((key: string, error: Error | null) => {
    setErrors((prev) => ({ ...prev, [key]: error }));
  }, []);

  const execute = useCallback(
    async <T>(
      key: string,
      asyncFunction: () => Promise<T>,
      options: {
        delay?: number;
        onError?: (error: Error) => void;
        onSuccess?: (data: T) => void;
      } = {}
    ): Promise<T> => {
      const { delay = 300, onError, onSuccess } = options;
      const startTime = Date.now();

      try {
        setLoading(key, true);
        setError(key, null);

        const result = await asyncFunction();

        // 최소 로딩 시간 보장
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < delay) {
          await new Promise((resolve) =>
            setTimeout(resolve, delay - elapsedTime)
          );
        }

        setLoading(key, false);
        onSuccess?.(result);

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(key, error);
        setLoading(key, false);
        onError?.(error);
        throw error;
      }
    },
    [setLoading, setError]
  );

  const isLoading = useCallback(
    (key: string) => loadingStates[key] || false,
    [loadingStates]
  );
  const getError = useCallback((key: string) => errors[key] || null, [errors]);
  const hasAnyLoading = useCallback(
    () => Object.values(loadingStates).some(Boolean),
    [loadingStates]
  );

  return {
    loadingStates,
    errors,
    execute,
    setLoading,
    setError,
    isLoading,
    getError,
    hasAnyLoading,
  };
}

// 조건부 로딩 훅
export function useConditionalLoading<T>(
  condition: boolean,
  asyncFunction: () => Promise<T>,
  options: UseLoadingOptions = {}
) {
  const loadingHook = useLoading(options);

  const executeIfCondition = useCallback(async () => {
    if (condition) {
      return await loadingHook.execute(asyncFunction);
    }
    return null;
  }, [condition, asyncFunction, loadingHook]);

  return {
    ...loadingHook,
    executeIfCondition,
  };
}

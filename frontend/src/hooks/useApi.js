import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tracks the lifecycle of an async call made through services/api.js.
 *
 *   const { data, status, error, loading, execute } = useApi(adminService.getDashboard, { immediate: true });
 *
 * status: 'idle' | 'loading' | 'ready' | 'error'
 * `execute(...args)` calls the request, stores the result and resolves to it (or undefined on failure).
 * `merge(previous, result)` decides what is stored; by default the result replaces the previous data.
 * Results from a call that was superseded by a newer one, or that finished after unmount, are ignored.
 */
const replace = (_previous, result) => result;

export const useApi = (request, { immediate = false, initialData = null, initialStatus = 'idle', merge = replace } = {}) => {
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState(null);

  // Always use the latest request and merge functions without making `execute` change identity.
  const requestRef = useRef(request);
  const mergeRef = useRef(merge);
  useEffect(() => {
    requestRef.current = request;
    mergeRef.current = merge;
  });

  const callIdRef = useRef(0);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async (...callArgs) => {
    const callId = ++callIdRef.current;
    const isCurrent = () => mountedRef.current && callId === callIdRef.current;

    setStatus('loading');
    setError(null);
    try {
      const result = await requestRef.current(...callArgs);
      if (isCurrent()) {
        setData(previous => mergeRef.current(previous, result));
        setStatus('ready');
      }
      return result;
    } catch (err) {
      if (isCurrent()) {
        setError(err);
        setStatus('error');
      }
      return undefined;
    }
  }, []);

  useEffect(() => {
    if (immediate) execute();
  }, [immediate, execute]);

  return { data, status, error, loading: status === 'loading', execute };
};

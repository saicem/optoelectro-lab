import { useRef, useEffect, useCallback } from 'react';

interface UseAnimationFrameOptions {
  autoStart?: boolean;
}

export function useAnimationFrame(
  callback: (deltaTime: number, timestamp: number) => void,
  options: UseAnimationFrameOptions = {}
) {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const callbackRef = useRef(callback);
  const isRunningRef = useRef(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callbackRef.current(deltaTime, time);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  const start = useCallback(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      previousTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const stop = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
    isRunningRef.current = false;
  }, []);

  useEffect(() => {
    if (options.autoStart) {
      start();
    }
    return () => stop();
  }, []);

  return { start, stop };
}

import { useRef, useEffect, useCallback } from 'react';

interface UseAnimationFrameOptions {
  autoStart?: boolean;
}

export function useAnimationFrame(
  callback: (deltaTime: number, timestamp: number) => void,
  options: UseAnimationFrameOptions = {},
) {
  const requestRef = useRef<number>(undefined);
  const previousTimeRef = useRef<number>(undefined);
  const callbackRef = useRef(callback);
  const isRunningRef = useRef(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const start = useCallback(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      previousTimeRef.current = undefined;
      const frame = (time: number) => {
        if (previousTimeRef.current !== undefined) {
          const deltaTime = time - previousTimeRef.current;
          callbackRef.current(deltaTime, time);
        }
        previousTimeRef.current = time;
        if (isRunningRef.current) {
          requestRef.current = requestAnimationFrame(frame);
        }
      };
      requestRef.current = requestAnimationFrame(frame);
    }
  }, []);

  const stop = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
    isRunningRef.current = false;
  }, []);

  const { autoStart } = options;

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => stop();
  }, [autoStart, start, stop]);

  return { start, stop };
}

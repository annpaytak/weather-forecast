import * as React from "react";

interface DebouncedFunction<Args> {
  (args: Args): void;
  cancel: () => void;
  flush: (args: Args) => void;
}

export function useDebounce<Args>(
  callback: (value: Args) => void,
  delay: number
): DebouncedFunction<Args> {
  const timer = React.useRef<number | undefined>();

  const debouncedCallback = React.useCallback(
    (args: Args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(args);
      }, delay);
    },
    [callback, delay]
  ) as DebouncedFunction<Args>;

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  debouncedCallback.cancel = function () {
    clearTimeout(timer.current);
  };

  debouncedCallback.flush = (args: Args) => {
    clearTimeout(timer.current);
    callback(args);
  };

  return debouncedCallback;
}

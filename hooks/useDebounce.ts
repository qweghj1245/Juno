import { useEffect, useRef } from "react";

const useDebounce = (event: Function, time: number) => {
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function debounceEvent(...args: any[]) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => event(...args), time) as any;
  }
  return debounceEvent;
};

export default useDebounce;

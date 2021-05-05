import React, { FC, useEffect, useRef } from "react";

interface Props {
  callback: () => void;
}

const InfiniteScrollObserver: FC<Props> = (props) => {
  const { callback } = props;
  const observer = useRef<IntersectionObserver>();
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: "400px 0px",
        threshold: 1.0,
      }
    );

    if (element.current) observer.current.observe(element.current);

    return () => observer.current?.disconnect();
  }, [callback]);

  return <div ref={element} />;
};

export default InfiniteScrollObserver;

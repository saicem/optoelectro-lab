import { useEffect, useRef } from 'react';

interface MathRendererProps {
  children: string;
  className?: string;
}

export default function MathRenderer({ children, className = '' }: MathRendererProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current && window.katex) {
      // Clear previous content
      containerRef.current.innerHTML = '';
      // Render the math
      if (children.startsWith('$$') && children.endsWith('$$')) {
        // Display math
        window.katex.render(children.slice(2, -2), containerRef.current, {
          displayMode: true,
          throwOnError: false,
          output: 'html',
        });
      } else {
        // Inline math
        window.katex.render(children, containerRef.current, {
          displayMode: false,
          throwOnError: false,
          output: 'html',
        });
      }
    }
  }, [children]);

  return <span ref={containerRef} className={className} />;
}

// Declare katex for TypeScript
declare global {
  interface Window {
    katex: {
      render: (tex: string, element: HTMLElement, options?: {
        displayMode?: boolean;
        throwOnError?: boolean;
        output?: string;
      }) => void;
    };
  }
}

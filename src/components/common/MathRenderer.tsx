import { useEffect, useMemo, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  children: string;
  className?: string;
  displayMode?: boolean;
}

export default function MathRenderer({ children, className = '', displayMode }: MathRendererProps) {
  const [html, setHtml] = useState('');
  const isDisplay = useMemo(() => displayMode ?? children.startsWith('$$'), [displayMode, children]);

  useEffect(() => {
    let tex = children;

    if (tex.startsWith('$$') && tex.endsWith('$$')) {
      tex = tex.slice(2, -2);
    } else if (tex.startsWith('$') && tex.endsWith('$')) {
      tex = tex.slice(1, -1);
    }

    try {
      const rendered = katex.renderToString(tex, {
        displayMode: isDisplay,
        throwOnError: false,
        output: 'html',
        strict: false,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHtml(rendered);
    } catch (err) {
      console.warn('KaTeX render error:', err);
      setHtml(children);
    }
  }, [children, displayMode, isDisplay]);

  if (isDisplay) {
    return (
      <div
        className={`katex-display-wrapper w-full overflow-x-auto overflow-y-hidden py-2 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return <span className={`katex-inline-wrapper ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { cn } from '@/lib/utils';
import TermNote from './TermNote';
import {
  Lightbulb,
  Zap,
  Waves,
  Search,
  Sparkles,
  Radio,
  CircuitBoard,
  BarChart3,
  Compass,
  Target,
  Network,
  BookOpen,
  BookText,
  Flame,
  Cable,
  Cpu,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  lightbulb: Lightbulb,
  zap: Zap,
  waves: Waves,
  search: Search,
  sparkles: Sparkles,
  radio: Radio,
  circuitboard: CircuitBoard,
  barchart3: BarChart3,
  compass: Compass,
  target: Target,
  network: Network,
  bookopen: BookOpen,
  booktext: BookText,
  flame: Flame,
  cable: Cable,
  cpu: Cpu,
};

const colorMap: Record<string, string> = {
  cyan: 'text-laser-cyan',
  green: 'text-laser-green',
  purple: 'text-laser-purple',
  red: 'text-laser-red',
  orange: 'text-laser-orange',
  blue: 'text-laser-blue',
  muted: 'text-lab-muted',
  text: 'text-lab-text',
  white: 'text-white',
};

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

function processText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  const termNoteRegex = /\[\[([^\]]+)\]\]/g;
  const iconRegex = /\{icon:(\w+)(?::(\w+))?\}/g;
  const colorRegex = /\{color:(\w+)\}([^{}]*)\{\/color\}/g;
  const highlightRegex = /\{highlight:(\w+)?\}([^{}]*)\{\/highlight\}/g;

  const combinedRegex = new RegExp(
    `(${termNoteRegex.source}|${iconRegex.source}|${colorRegex.source}|${highlightRegex.source})`,
    'g',
  );

  let match;
  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1].startsWith('[[') && match[1].endsWith(']]')) {
      const term = match[1].slice(2, -2);
      parts.push(<TermNote key={match.index} term={term} />);
    } else if (match[1].startsWith('{icon:')) {
      const iconName = match[2];
      const color = match[3] || 'cyan';
      const IconComponent = iconMap[iconName.toLowerCase()];
      if (IconComponent) {
        parts.push(
          <IconComponent
            key={match.index}
            className={cn('w-5 h-5 inline', colorMap[color] || 'text-laser-cyan')}
          />,
        );
      } else {
        parts.push(match[1]);
      }
    } else if (match[1].startsWith('{color:')) {
      const color = match[2];
      const content = match[3];
      parts.push(
        <span key={match.index} className={cn(colorMap[color] || 'text-lab-text')}>
          {content}
        </span>,
      );
    } else if (match[1].startsWith('{highlight:')) {
      const color = match[2] || 'cyan';
      const content = match[3];
      const bgColor = {
        cyan: 'bg-laser-cyan/10 border-laser-cyan/30',
        green: 'bg-laser-green/10 border-laser-green/30',
        purple: 'bg-laser-purple/10 border-laser-purple/30',
        red: 'bg-laser-red/10 border-laser-red/30',
        orange: 'bg-laser-orange/10 border-laser-orange/30',
      }[color] || 'bg-laser-cyan/10 border-laser-cyan/30';
      const textColor = colorMap[color] || 'text-laser-cyan';
      parts.push(
        <span key={match.index} className={cn('px-1.5 py-0.5 rounded border', bgColor, textColor)}>
          {content}
        </span>,
      );
    } else {
      parts.push(match[1]);
    }

    lastIndex = combinedRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderNodeText(children: React.ReactNode[]): React.ReactNode[] {
  return children.map((child, index) => {
    if (typeof child === 'string') {
      return processText(child);
    }
    if (Array.isArray(child)) {
      return renderNodeText(child);
    }
    return child;
  });
}

export default function MarkdownRenderer({ children, className = '' }: MarkdownRendererProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => (
            <p className="text-lab-muted leading-relaxed">
              {renderNodeText(Array.isArray(children) ? children : [children])}
            </p>
          ),
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-bold font-display text-lab-text mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold font-display text-lab-text mb-4 mt-8 flex items-center gap-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-semibold text-lab-text mb-2">
              {renderNodeText(Array.isArray(children) ? children : [children])}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-semibold text-lab-text mb-2 text-sm">
              {renderNodeText(Array.isArray(children) ? children : [children])}
            </h4>
          ),
          strong: ({ children }) => (
            <strong className="text-lab-text font-semibold">
              {renderNodeText(Array.isArray(children) ? children : [children])}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-lab-text italic">{children}</em>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="font-mono text-laser-cyan bg-lab-bg/50 px-1.5 py-0.5 rounded text-sm">
                  {renderNodeText(Array.isArray(children) ? children : [children])}
                </code>
              );
            }
            return (
              <code className={cn('block p-4 rounded-lg bg-lab-bg/50 text-sm font-mono overflow-x-auto', className)}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-lab-bg/50 p-4 rounded-lg overflow-x-auto">
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2 text-sm">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-2 text-sm list-decimal list-inside">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2">
              <span className="text-laser-cyan">•</span>
              <span className="text-lab-muted">
                {renderNodeText(Array.isArray(children) ? children : [children])}
              </span>
            </li>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-lab-border">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody>{children}</tbody>
          ),
          tr: ({ children, className }) => (
            <tr className={cn('border-b border-lab-border/50', className)}>{children}</tr>
          ),
          th: ({ children }) => (
            <th className="text-left py-2 text-lab-muted font-medium">{children}</th>
          ),
          td: ({ children }) => (
            <td className="py-2 text-lab-muted">{children}</td>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-laser-cyan pl-4 py-2 bg-lab-bg/30 rounded-r-lg my-4">
              <p className="text-sm text-lab-muted">{children}</p>
            </blockquote>
          ),
          hr: () => (
            <hr className="border-lab-border/50 my-8" />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-laser-cyan hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
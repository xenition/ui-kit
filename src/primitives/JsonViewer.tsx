import * as React from 'react';
import { cn } from './cn';

export interface JsonViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Any JSON-serializable value to inspect. */
  value: unknown;
  /** Expand nodes up to this depth on first render (default 1). */
  defaultExpandDepth?: number;
  /** Root key label (default `root`). */
  rootLabel?: string;
}

type Kind = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';

function kindOf(value: unknown): Kind {
  if (value === null || value === undefined) return 'null';
  if (Array.isArray(value)) return 'array';
  const t = typeof value;
  if (t === 'object') return 'object';
  if (t === 'number') return 'number';
  if (t === 'boolean') return 'boolean';
  return 'string';
}

const SCALAR_CLASS: Record<Exclude<Kind, 'object' | 'array'>, string> = {
  string: 'text-on-surface',
  number: 'text-primary',
  boolean: 'text-warn',
  null: 'text-muted',
};

interface NodeProps {
  label: string;
  value: unknown;
  depth: number;
  defaultExpandDepth: number;
}

function Node({ label, value, depth, defaultExpandDepth }: NodeProps): React.ReactElement {
  const kind = kindOf(value);
  const branch = kind === 'object' || kind === 'array';
  const [open, setOpen] = React.useState(depth < defaultExpandDepth);
  const indent = { paddingLeft: `${depth * 0.75}rem` };

  if (!branch) {
    const scalarClass = SCALAR_CLASS[kind as Exclude<Kind, 'object' | 'array'>];
    const display = kind === 'string' ? `"${String(value)}"` : String(value);
    return (
      <div className="flex gap-1 py-0.5 font-mono text-sm" style={indent}>
        <span className="text-accent">{`${label}:`}</span>
        <span className={scalarClass}>{display}</span>
      </div>
    );
  }

  const entries: [string, unknown][] = Array.isArray(value)
    ? value.map((v, i) => [String(i), v])
    : Object.entries(value as Record<string, unknown>);
  const summary = kind === 'array' ? `[${entries.length}]` : `{${entries.length}}`;

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={indent}
        className="flex w-full items-center gap-1 py-0.5 text-left font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
      >
        <span aria-hidden="true" className="text-xs text-muted">
          {open ? '▾' : '▸'}
        </span>
        <span className="text-accent">{`${label}:`}</span>
        <span className="text-muted">{summary}</span>
      </button>
      {open
        ? entries.map(([k, v]) => (
            <Node key={k} label={k} value={v} depth={depth + 1} defaultExpandDepth={defaultExpandDepth} />
          ))
        : null}
    </div>
  );
}

/**
 * Web parity of the native `JsonViewer`: a collapsible JSON tree inspector. Keys
 * render in the `accent` token, strings in `on-surface`, numbers in `primary`,
 * booleans in `warn`, and null in `muted`, all monospaced. Branch nodes toggle
 * open on click. `font-mono` is a font family, not a color. All colors/spacing
 * come from the `--xen-*` tokens via Tailwind classes — no literal colors.
 */
export const JsonViewer = React.forwardRef<HTMLDivElement, JsonViewerProps>(function JsonViewer(
  { className, value, defaultExpandDepth = 1, rootLabel = 'root', ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-surface rounded-[var(--xen-radius-md)] border border-border p-3',
        className
      )}
      {...rest}
    >
      <Node label={rootLabel} value={value} depth={0} defaultExpandDepth={defaultExpandDepth} />
    </div>
  );
});

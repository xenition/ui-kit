import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { V4_CODE_CSS, V4_CODE_STYLE_ID } from './internal/v4-data';
import type { JsonViewerProps } from './JsonViewer';

export type { JsonViewerProps as JsonViewerV4Props };

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

/**
 * Scalar → ink.
 *
 * Every one is a `*Text` slot, never a fill. `text-primary` and `text-warn` —
 * what this twin used — are BACKGROUND colours: the compiler guarantees
 * `on-primary` ON `primary` and nothing at all about `primary` as ink on
 * `surface`. The native twin was fixed for exactly this (its audit found keys
 * measuring 1.43:1 in light mode) and its web twin was left behind. Syntax
 * colour IS text, so it takes the text forms.
 */
const SCALAR_CLASS: Record<Exclude<Kind, 'object' | 'array'>, string> = {
  string: 'text-on-surface',
  number: 'text-primary-text',
  boolean: 'text-warn-text',
  null: 'text-muted-text',
};

/** Keys, in the accent's contrast-safe text form for the same reason. */
const KEY_CLASS = 'text-accent-text';

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

  // Depth is carried by a guide at the level's left edge rather than by
  // padding alone.
  const level =
    depth > 0
      ? 'ml-[var(--xen-space-sm)] pl-[var(--xen-space-sm)]'
      : '';
  const levelAttrs = depth > 0 ? { 'data-xen-v4-json-level': '' } : {};

  if (!branch) {
    const scalarClass = SCALAR_CLASS[kind as Exclude<Kind, 'object' | 'array'>];
    const display = kind === 'string' ? `"${String(value)}"` : String(value);
    return (
      <div
        {...levelAttrs}
        className={cn('flex gap-[var(--xen-space-xs)] py-0.5 font-mono text-sm', level)}
      >
        <span className={KEY_CLASS}>{`${label}:`}</span>
        <span className={scalarClass}>{display}</span>
      </div>
    );
  }

  const entries: [string, unknown][] = Array.isArray(value)
    ? value.map((v, i) => [String(i), v])
    : Object.entries(value as Record<string, unknown>);
  const summary = kind === 'array' ? `[${entries.length}]` : `{${entries.length}}`;

  return (
    <div {...levelAttrs} className={level}>
      <button
        type="button"
        data-xen-v4-json-branch=""
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-sm)]',
          'py-0.5 text-left font-mono text-sm transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
      >
        <span aria-hidden="true" className="text-xs text-muted-text">
          {open ? '▾' : '▸'}
        </span>
        <span className={KEY_CLASS}>{`${label}:`}</span>
        <span className="text-muted-text">{summary}</span>
      </button>
      {open
        ? entries.map(([k, v]) => (
            <Node
              key={k}
              label={k}
              value={v}
              depth={depth + 1}
              defaultExpandDepth={defaultExpandDepth}
            />
          ))
        : null}
    </div>
  );
}

/**
 * **V4 JSON viewer** — the web twin of the native `JsonViewerV4`, same props as
 * {@link JsonViewer}, a different design line.
 *
 * Four changes:
 *
 * 1. **The syntax colours become readable.** `text-accent`, `text-primary` and
 *    `text-warn` are FILL colours; the compiler makes no contrast promise
 *    about any of them as ink on `surface`. The native twin was fixed for this
 *    — its audit found keys measuring 1.43:1 in light mode — and this twin was
 *    left behind, so the same viewer was legible on a phone and not in a
 *    browser. All five roles now take their `*Text` forms.
 * 2. **A calm, recessed ground.** The tree sat on `bg-surface`, the same
 *    colour as the page. It sinks by the same 4% neutral step `CodeBlockV4`
 *    and the V4 tables use, mixed from the two scheme-resolved slots so it
 *    inverts with the scheme.
 * 3. **Depth gets a guide, not just an indent.** Each level draws a hairline
 *    at its left edge, and the indent step becomes a token instead of the
 *    literal `0.75rem` that made this twin a different shape from its native
 *    counterpart. This is the one place a rule earns itself against §9: an
 *    indent with nothing in it stops telling you which parent a row belongs to
 *    as soon as the parent scrolls off the top, and re-finding that is the
 *    entire task a JSON inspector exists for (§33).
 * 4. **The focus ring is a token.** `ring-primary-300` was a ramp step;
 *    `ring-ring` is the semantic slot, so the ring survives a hue change.
 *
 * **No gradient and no new palette.** Five roles all drawn from seed tokens is
 * the whole colour system here, and §35.5 would not thank us for a sixth.
 */
export const JsonViewerV4 = React.forwardRef<HTMLDivElement, JsonViewerProps>(
  function JsonViewerV4(
    { className, value, defaultExpandDepth = 1, rootLabel = 'root', ...rest },
    ref
  ) {
    injectStyleOnce(V4_CODE_STYLE_ID, V4_CODE_CSS);
    return (
      <div
        ref={ref}
        data-xen-v4-code=""
        data-xen-v4-code-body=""
        className={cn(
          'rounded-[var(--xen-radius-md)] border border-border p-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        <Node label={rootLabel} value={value} depth={0} defaultExpandDepth={defaultExpandDepth} />
      </div>
    );
  }
);

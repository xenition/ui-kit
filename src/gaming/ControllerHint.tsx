import * as React from 'react';
import { cn } from '../primitives/cn';

export type ControllerHintVariant = 'pill' | 'inline';
export type ControllerHintSize = 'sm' | 'md';

export interface ControllerHintItem {
  /** The button glyph / label to render in the key cap, e.g. `'A'`, `'▢'`, `'⏵'`. */
  button: string;
  /** What the button does, e.g. `'Jump'`. */
  action: string;
}

export interface ControllerHintProps {
  /** A single hint (shorthand) — or use `hints` for a row of them. */
  button?: string;
  /** Action label for the single-hint shorthand. */
  action?: string;
  /** A row of hints; takes precedence over the `button`/`action` shorthand. */
  hints?: ControllerHintItem[];
  /**
   * - `pill`   — key cap + action inside a bordered pill (default).
   * - `inline` — key cap + action with no surrounding chrome (for a HUD strip).
   */
  variant?: ControllerHintVariant;
  /** Size scale. */
  size?: ControllerHintSize;
  /** Extra classes on the root. */
  className?: string;
}

const CAP: Record<ControllerHintSize, { box: string; text: string; label: string }> = {
  sm: { box: 'h-5 min-w-[20px] text-xs', text: 'text-xs', label: 'text-xs' },
  md: { box: 'h-[26px] min-w-[26px] text-sm', text: 'text-sm', label: 'text-sm' },
};

/**
 * A controller / keybind hint — a rounded "key cap" showing the button glyph
 * next to its action label (e.g. `Ⓐ Jump`). Pass a single `button`/`action` or
 * a `hints` array for a HUD strip. The action text always accompanies the glyph,
 * so the mapping never relies on the symbol alone. Token-only.
 */
export function ControllerHint({
  button,
  action,
  hints,
  variant = 'pill',
  size = 'md',
  className,
}: ControllerHintProps): React.ReactElement | null {
  const sz = CAP[size];

  const list: ControllerHintItem[] =
    hints && hints.length > 0
      ? hints
      : button != null
        ? [{ button, action: action ?? '' }]
        : [];

  if (list.length === 0) return null;

  const renderHint = (hint: ControllerHintItem, key: React.Key): React.ReactElement => (
    <span
      key={key}
      role="img"
      aria-label={hint.action ? `${hint.action}: ${hint.button}` : hint.button}
      className={cn(
        'inline-flex items-center gap-[var(--xen-space-xs)]',
        variant === 'pill' &&
          'rounded-full border border-border bg-surface px-[var(--xen-space-sm)] py-[3px]'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex items-center justify-center rounded-[var(--xen-radius-sm)] bg-primary px-1 font-bold text-on-primary',
          sz.box
        )}
      >
        {hint.button}
      </span>
      {hint.action ? (
        <span aria-hidden="true" className={cn('text-on-surface', sz.label)}>
          {hint.action}
        </span>
      ) : null}
    </span>
  );

  if (list.length === 1) {
    return <div className={className}>{renderHint(list[0]!, 'h0')}</div>;
  }

  return (
    <div className={cn('flex flex-wrap gap-[var(--xen-space-sm)]', className)}>
      {list.map((h, i) => renderHint(h, `h${i}`))}
    </div>
  );
}

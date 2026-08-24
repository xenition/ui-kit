import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives';
import type { InspectionRowProps, InspectionResult } from './InspectionRow';

/**
 * Alternate design (v3) of {@link InspectionRow} — a drop-in with the **same
 * props**. The *dense line*: a small result glyph, the checkpoint label on one
 * row (code inline, muted), and the result word pinned to the trailing edge in
 * its semantic text color. Rows are separated by a hairline bottom border.
 * Result is glyph + label + a token color (pass → success, fail → danger) —
 * never color alone. No literal colors.
 */
export type InspectionRowV3Props = InspectionRowProps;

interface Desc {
  label: string;
  glyph: string;
  /** Icon slot (semantic color). */
  icon: IconColor;
  /** Trailing result-word text token class. */
  text: string;
}

const RESULT: Record<InspectionResult, Desc> = {
  pass: { label: 'Pass', glyph: '✓', icon: 'success', text: 'text-success' },
  fail: { label: 'Fail', glyph: '✕', icon: 'danger', text: 'text-danger' },
  na: { label: 'N/A', glyph: '–', icon: 'muted', text: 'text-muted' },
  pending: { label: 'Pending', glyph: '○', icon: 'primary', text: 'text-primary' },
};

export const InspectionRowV3 = React.forwardRef<HTMLDivElement, InspectionRowV3Props>(
  function InspectionRowV3({ label, result, code, note, onClick, className, style }, ref) {
    const rd = RESULT[result] ?? RESULT.pending;
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        style={style}
        {...(interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': `${label}, ${rd.label}`,
              onClick,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] border-b border-border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-100 motion-reduce:transition-none',
          className
        )}
      >
        <Icon glyph={rd.glyph} size="sm" color={rd.icon} aria-label={rd.label} />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold text-on-surface">
            {label}
            {code != null ? <span className="font-normal text-muted">{`   ${code}`}</span> : null}
          </span>
          {note != null ? <span className="truncate text-xs text-muted">{note}</span> : null}
        </div>
        <span className={cn('shrink-0 text-xs font-bold', rd.text)}>{`${rd.glyph} ${rd.label}`}</span>
      </div>
    );
  }
);

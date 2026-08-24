import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce/EmptyState';
import type { AccentSlot } from './types';
import type { TrackPadProps } from './TrackPad';

/** Same public contract as {@link TrackPad} — a drop-in alternate design. */
export type TrackPadV2Props = TrackPadProps;

const ACCENTS: AccentSlot[] = ['primary', 'accent', 'success', 'warn', 'danger'];
const SOFT: Record<AccentSlot, string> = {
  primary: 'bg-primary/10', accent: 'bg-accent/10', success: 'bg-success/10', warn: 'bg-warn/10', danger: 'bg-danger/10',
};
const SOLID: Record<AccentSlot, string> = {
  primary: 'bg-primary text-on-primary', accent: 'bg-accent text-on-accent', success: 'bg-success text-on-success', warn: 'bg-warn text-on-warn', danger: 'bg-danger text-on-danger',
};
const TEXT: Record<AccentSlot, string> = {
  primary: 'text-primary', accent: 'text-accent', success: 'text-success', warn: 'text-warn', danger: 'text-danger',
};

/**
 * TrackPad, redesigned (v2): **bold color tiles**. Each pad is a big rounded
 * square tinted by its accent with the glyph over a label; a triggered pad fills
 * solid in its accent with a ring (never color alone — also a bold label). A
 * punchier grid than v1's outlined pads. Same props, token-only.
 */
export const TrackPadV2 = React.forwardRef<HTMLDivElement, TrackPadV2Props>(function TrackPadV2(
  { pads, columns = 4, variant, activePadIds, label, emptyLabel = 'No pads assigned', onPadPress, className, ...rest },
  ref
) {
  void variant;
  if (pads.length === 0) {
    return (
      <EmptyState
        ref={ref}
        icon={<Icon glyph="🥁" size="2xl" color="muted" aria-label="Pads" />}
        title={emptyLabel}
        className={className}
        {...rest}
      />
    );
  }
  const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
  const active = new Set(activePadIds ?? []);

  return (
    <div ref={ref} className={cn('flex flex-col gap-2', className)} {...rest}>
      {label ? (
        <p role="heading" aria-level={3} className="text-base font-bold text-on-surface">
          {label}
        </p>
      ) : null}
      <div className="flex flex-wrap">
        {pads.map((pad, i) => {
          const accent = pad.color ?? ACCENTS[i % ACCENTS.length]!;
          const isEmpty = pad.empty === true;
          const isActive = active.has(pad.id);
          const name = pad.label ?? pad.note ?? `Pad ${i + 1}`;
          return (
            <div key={pad.id} className="p-1" style={{ width: `${100 / cols}%` }}>
              <button
                type="button"
                disabled={isEmpty || !onPadPress}
                aria-pressed={isActive}
                aria-label={isEmpty ? `${name}, empty` : name}
                onClick={() => onPadPress?.(pad, i)}
                className={cn(
                  'flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-lg transition-transform',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
                  isEmpty
                    ? 'bg-neutral-100 opacity-45'
                    : isActive
                      ? cn(SOLID[accent], 'ring-2 ring-offset-1 scale-95 motion-reduce:scale-100')
                      : cn(SOFT[accent], 'hover:opacity-90')
                )}
              >
                {pad.glyph ? <span className="text-2xl">{pad.glyph}</span> : null}
                <span className={cn('max-w-full truncate text-xs font-bold', isEmpty ? 'text-muted' : isActive ? '' : TEXT[accent])}>
                  {isEmpty ? '—' : name}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

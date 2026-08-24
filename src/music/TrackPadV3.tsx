import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce/EmptyState';
import type { AccentSlot } from './types';
import type { TrackPadProps } from './TrackPad';

/** Same public contract as {@link TrackPad} — a drop-in alternate design. */
export type TrackPadV3Props = TrackPadProps;

const ACCENTS: AccentSlot[] = ['primary', 'accent', 'success', 'warn', 'danger'];
const DOT: Record<AccentSlot, string> = {
  primary: 'bg-primary', accent: 'bg-accent', success: 'bg-success', warn: 'bg-warn', danger: 'bg-danger',
};

/**
 * TrackPad, redesigned (v3): a **compact pad strip**. Small square pads wrap in a
 * tight grid with the label beneath each; a triggered pad shows a filled accent
 * dot and a bold label (never color alone). The minimal counterpart to v2's bold
 * tiles. Same props, token-only.
 */
export const TrackPadV3 = React.forwardRef<HTMLDivElement, TrackPadV3Props>(function TrackPadV3(
  { pads, columns = 6, variant, activePadIds, label, emptyLabel = 'No pads assigned', onPadPress, className, ...rest },
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
  const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 6));
  const active = new Set(activePadIds ?? []);

  return (
    <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...rest}>
      {label ? (
        <p role="heading" aria-level={3} className="text-sm font-bold text-on-surface">
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
            <div key={pad.id} className="p-0.5" style={{ width: `${100 / cols}%` }}>
              <button
                type="button"
                disabled={isEmpty || !onPadPress}
                aria-pressed={isActive}
                aria-label={isEmpty ? `${name}, empty` : name}
                onClick={() => onPadPress?.(pad, i)}
                className={cn(
                  'relative flex aspect-square w-full items-center justify-center rounded border transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2',
                  isEmpty ? 'border-border bg-neutral-100 opacity-45' : isActive ? 'border-on-surface bg-neutral-100' : 'border-border bg-surface hover:bg-neutral-50'
                )}
              >
                {isActive ? <span aria-hidden className={cn('absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full', DOT[accent])} /> : null}
                {pad.glyph ? <span className="text-base">{pad.glyph}</span> : <span className="text-[10px] text-muted">{name.slice(0, 2)}</span>}
              </button>
              <p className={cn('mt-0.5 truncate text-center text-[10px]', isActive ? 'font-bold text-on-surface' : 'text-muted')}>
                {isEmpty ? '—' : name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

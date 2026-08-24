import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, type BadgeTone, type IconColor } from '../primitives';
import { DISC_TINT, type FieldSlot } from './internal/format';
import type { InspectionRowProps, InspectionResult } from './InspectionRow';

/**
 * Alternate design (v2) of {@link InspectionRow} — a drop-in with the **same
 * props**. Where the base is a thin row with a small disc, V2 is an *elevated
 * checkpoint card* fronted by a large **pass / fail marker** (a tinted square
 * carrying the result glyph), the label / code / note stack, and a soft result
 * banner on the trailing edge. Result is glyph + label + a token slot
 * (pass → success, fail → danger) — never color alone. No literal colors.
 */
export type InspectionRowV2Props = InspectionRowProps;

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
  slot: FieldSlot;
}

const RESULT: Record<InspectionResult, Desc> = {
  pass: { label: 'Pass', glyph: '✓', tone: 'success', slot: 'success' },
  fail: { label: 'Fail', glyph: '✕', tone: 'danger', slot: 'danger' },
  na: { label: 'N/A', glyph: '–', tone: 'neutral', slot: 'muted' },
  pending: { label: 'Pending', glyph: '○', tone: 'primary', slot: 'primary' },
};

export const InspectionRowV2 = React.forwardRef<HTMLDivElement, InspectionRowV2Props>(
  function InspectionRowV2({ label, result, code, note, onClick, className, style }, ref) {
    const rd = RESULT[result] ?? RESULT.pending;
    const iconColor: IconColor = rd.slot === 'muted' ? 'muted' : (rd.slot as IconColor);
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
          'flex items-stretch gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-md',
          interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none',
          className
        )}
      >
        <span
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
            DISC_TINT[rd.slot]
          )}
        >
          <Icon glyph={rd.glyph} size="2xl" color={iconColor} aria-label={rd.label} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <span className="line-clamp-2 text-base font-bold text-on-surface">{label}</span>
          {code != null ? <span className="text-xs uppercase tracking-wide text-muted">{code}</span> : null}
          {note != null ? <span className="text-xs text-muted">{note}</span> : null}
        </div>
        <div className="flex items-center">
          <Badge tone={rd.tone} variant="soft">{`${rd.glyph} ${rd.label}`}</Badge>
        </div>
      </div>
    );
  }
);

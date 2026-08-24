import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, type BadgeTone, type IconColor } from '../primitives';
import { DISC_TINT, type FieldSlot } from './internal/format';

/** Inspection result — text + glyph + color (never color-alone). */
export type InspectionResult = 'pass' | 'fail' | 'na' | 'pending';

interface ResultDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
  /** Semantic slot used for the tinted disc + glyph. */
  slot: FieldSlot;
}

const INSPECTION_RESULT: Record<InspectionResult, ResultDescriptor> = {
  pass: { label: 'Pass', glyph: '✓', tone: 'success', slot: 'success' },
  fail: { label: 'Fail', glyph: '✕', tone: 'danger', slot: 'danger' },
  na: { label: 'N/A', glyph: '–', tone: 'neutral', slot: 'muted' },
  pending: { label: 'Pending', glyph: '○', tone: 'primary', slot: 'primary' },
};

export interface InspectionRowProps {
  /** Inspection checkpoint label (e.g. "Fire extinguisher charged"). */
  label: string;
  /** Result — conveyed by text + glyph + color. */
  result: InspectionResult;
  /** Reference code shown as a meta line (e.g. "NFPA 10"). */
  code?: string;
  /** Inspector note / defect description shown under the label. */
  note?: string;
  /** Fires on row click (e.g. open the checkpoint detail). */
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * One line in an inspection checklist: a tinted result glyph disc, a
 * label/code/note stack, and a result pill. The result is conveyed redundantly
 * (glyph + label + a color that traces to a semantic token: pass → success,
 * fail → danger) so it is never color-alone. Becomes a `role="button"` surface
 * only when `onClick` is supplied. No literal colors.
 */
export const InspectionRow = React.forwardRef<HTMLDivElement, InspectionRowProps>(
  function InspectionRow({ label, result, code, note, onClick, className, style }, ref) {
    const rd = INSPECTION_RESULT[result] ?? INSPECTION_RESULT.pending;
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
          'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer',
          className
        )}
      >
        <span
          className={cn('flex h-9 w-9 items-center justify-center rounded-full', DISC_TINT[rd.slot])}
        >
          <Icon glyph={rd.glyph} color={iconColor} aria-label={rd.label} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="line-clamp-2 text-base font-semibold text-on-surface">{label}</span>
          {code != null ? <span className="text-xs text-muted">{code}</span> : null}
          {note != null ? <span className="text-xs text-muted">{note}</span> : null}
        </div>
        <Badge tone={rd.tone}>{`${rd.glyph} ${rd.label}`}</Badge>
      </div>
    );
  }
);

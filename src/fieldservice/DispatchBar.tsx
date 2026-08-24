import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Button, type IconColor } from '../primitives';
import { DISC_TINT, type FieldSlot } from './internal/format';

/** Dispatch stage — text + glyph + color (never color-alone). */
export type DispatchStage = 'unassigned' | 'accepted' | 'en-route' | 'on-site' | 'complete';

interface StageDescriptor {
  label: string;
  glyph: string;
  /** Semantic slot used for the tinted status disc + glyph. */
  slot: FieldSlot;
  /** Label for the button that advances to the next stage. */
  advance?: string;
  /** The stage that pressing advance moves to. */
  next?: DispatchStage;
}

const DISPATCH_STAGE: Record<DispatchStage, StageDescriptor> = {
  unassigned: { label: 'Unassigned', glyph: '○', slot: 'muted', advance: 'Accept', next: 'accepted' },
  accepted: { label: 'Accepted', glyph: '✓', slot: 'primary', advance: 'Start driving', next: 'en-route' },
  'en-route': { label: 'En route', glyph: '→', slot: 'warn', advance: 'Arrive', next: 'on-site' },
  'on-site': { label: 'On site', glyph: '▶', slot: 'success', advance: 'Complete', next: 'complete' },
  complete: { label: 'Complete', glyph: '✓', slot: 'success', advance: undefined, next: undefined },
};

export interface DispatchBarProps {
  /** Current dispatch stage — text + glyph + color. */
  stage: DispatchStage;
  /** Localized ETA / arrival window (e.g. "ETA 12 min"). */
  eta?: string;
  /** Work order / job label shown as the primary line. */
  jobLabel?: string;
  /** Fires with the next stage when the advance button is pressed. */
  onAdvance?: (next: DispatchStage) => void;
  /** Fires when the secondary Navigate action is pressed. */
  onNavigate?: () => void;
  /** Blocks the advance action (web `Button` has no spinner → disabled). */
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A dispatch status/action bar for the tech's active job. Shows the current
 * stage as a tinted glyph disc + label (text + glyph + a color that traces to a
 * semantic token — never color alone) with an optional ETA and job label, plus
 * a primary button that advances the workflow (accept → en-route → on-site →
 * complete) firing `onAdvance(next)`. An optional Navigate action sits
 * alongside. Web `Button` has no loading spinner, so `loading` disables the
 * advance action. No literal colors.
 */
export const DispatchBar = React.forwardRef<HTMLDivElement, DispatchBarProps>(function DispatchBar(
  { stage, eta, jobLabel, onAdvance, onNavigate, loading = false, className, style },
  ref
) {
  const sd = DISPATCH_STAGE[stage] ?? DISPATCH_STAGE.unassigned;
  const iconColor: IconColor = sd.slot === 'muted' ? 'muted' : (sd.slot as IconColor);
  const canAdvance = sd.advance != null && sd.next != null;

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] border-t border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-md)]',
        className
      )}
    >
      <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', DISC_TINT[sd.slot])}>
        <Icon glyph={sd.glyph} color={iconColor} aria-label={sd.label} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-bold text-on-surface">{jobLabel ?? sd.label}</span>
        <span className="truncate text-xs text-muted">
          {sd.glyph} {sd.label}
          {eta != null ? ` · ${eta}` : ''}
        </span>
      </div>
      {onNavigate ? (
        <Button variant="outline" size="sm" onClick={onNavigate}>
          Navigate
        </Button>
      ) : null}
      {canAdvance ? (
        <Button
          variant="primary"
          size="sm"
          disabled={loading}
          onClick={() => onAdvance?.(sd.next as DispatchStage)}
        >
          {sd.advance}
        </Button>
      ) : null}
    </div>
  );
});

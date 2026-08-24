import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  MATTER_STAGE_META,
  MATTER_STAGE_ORDER,
  clampPct,
  toneBgClass,
  activateOnKey,
  type MatterStage,
} from './internal';

export type MatterStatusVariant = 'default' | 'compact';

export interface MatterStatusProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Matter title / caption. */
  title?: string;
  /** Current workflow stage — drives the meter fill + pill. */
  stage: MatterStage;
  /** Optional 0–100 progress within the current stage (default derived from stage). */
  progressPct?: number;
  /** Pre-formatted opened / age label. */
  opened?: string;
  /** Responsible attorney. */
  attorney?: string;
  /** Density. */
  variant?: MatterStatusVariant;
  /** Click handler. */
  onClick?: () => void;
  testID?: string;
}

/**
 * Stage tracker for a legal matter: a segmented progress meter across the
 * intake → active → discovery → trial → settlement → closed workflow, with the
 * current stage as a glyph + word pill (never color alone). Segments up to and
 * including the current stage fill with the stage tone token; the rest use the
 * border token. Exposes an ARIA `progressbar`. All colors are `--xen-*` token
 * classes — no literals.
 */
export const MatterStatus = React.forwardRef<HTMLDivElement, MatterStatusProps>(
  function MatterStatus(
    { title, stage, progressPct, opened, attorney, variant = 'default', onClick, testID, className, ...rest },
    ref
  ) {
    const compact = variant === 'compact';
    const currentIndex = Math.max(0, MATTER_STAGE_ORDER.indexOf(stage));
    const total = MATTER_STAGE_ORDER.length;
    const derivedPct = clampPct(progressPct ?? Math.round(((currentIndex + 1) / total) * 100));
    const stageMeta = MATTER_STAGE_META[stage];
    const fillClass = toneBgClass(stageMeta.tone);
    const interactive = Boolean(onClick);

    return (
      <Card
        ref={ref}
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Matter ${title ?? stageMeta.label}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)]',
          compact && 'p-[var(--xen-space-md)]',
          interactive && 'cursor-pointer',
          className
        )}
        {...rest}
      >
        <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            {title ? (
              <span className="truncate text-sm font-bold text-on-surface">{title}</span>
            ) : null}
            {!compact && (opened || attorney) ? (
              <span className="text-xs text-muted">
                {[opened, attorney].filter(Boolean).join(' · ')}
              </span>
            ) : null}
          </div>
          <StatusPill meta={stageMeta} size="sm" />
        </div>

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={derivedPct}
          aria-label={`${stageMeta.label}, ${derivedPct}% complete`}
          className="flex gap-[3px]"
        >
          {MATTER_STAGE_ORDER.map((s, i) => (
            <span
              key={s}
              className={cn('h-1.5 flex-1 rounded-full', i <= currentIndex ? fillClass : 'bg-border')}
            />
          ))}
        </div>

        {!compact ? (
          <span className="text-xs text-muted">
            Stage {currentIndex + 1} of {total} · {derivedPct}%
          </span>
        ) : null}
      </Card>
    );
  }
);

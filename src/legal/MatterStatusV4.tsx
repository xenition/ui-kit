import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  MATTER_STAGE_META,
  MATTER_STAGE_ORDER,
  clampPct,
  toneBgClass,
  activateOnKey,
} from './internal';
import type { MatterStatusProps } from './MatterStatus';

/** Drop-in for {@link MatterStatusProps} — same props, the V4 "chambers" design. */
export type MatterStatusV4Props = MatterStatusProps;

/**
 * MatterStatus — **V4** "chambers" design (web parity of the native V4), and the
 * ONE reserved gradient moment of the legal V4 "chambers" line: the header
 * (matter title, current stage glyph + word, and a frosted "Stage N of 6" chip)
 * rides a brand-gradient ground (`bg-gradient-to-br from-primary-500 to-primary-700`)
 * in near-white ink (`text-primary-50` / `text-primary-100`). The body — the
 * segmented **intake → active → discovery → trial → settlement → closed** meter —
 * stays on the plain surface: segments up to the current stage fill with the
 * stage tone token, the rest use the border token. Status is carried by glyph +
 * stage word, never color alone; exposes an ARIA `progressbar`. Reuses the base
 * `variant` (`default` / `compact`). All colors from `--xen-*` token classes /
 * gradient utilities (no literals).
 */
export const MatterStatusV4 = React.forwardRef<HTMLDivElement, MatterStatusV4Props>(
  function MatterStatusV4(
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
    const shell = 'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

    return (
      <div
        ref={ref}
        data-testid={testID}
        data-xen-matter-status=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Matter ${title ?? stageMeta.label}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          shell,
          interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        {/* Reserved gradient moment: the matter hero header. */}
        <div
          className={cn(
            'flex items-center justify-between gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 text-primary-50',
            compact ? 'px-[var(--xen-space-md)] py-[var(--xen-space-sm)]' : 'p-[var(--xen-space-lg)]'
          )}
        >
          <div className="flex min-w-0 flex-col gap-0.5">
            {title ? <span className="truncate text-base font-bold text-primary-50">{title}</span> : null}
            <span className="flex items-center gap-[var(--xen-space-xs)] text-sm font-semibold text-primary-100">
              <span aria-hidden="true">{stageMeta.glyph}</span>
              {stageMeta.label}
            </span>
            {!compact && (opened || attorney) ? (
              <span className="truncate text-xs text-primary-100">{[opened, attorney].filter(Boolean).join('  ·  ')}</span>
            ) : null}
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-xs font-bold tabular-nums text-primary-50">
            Stage {currentIndex + 1} of {total}
          </span>
        </div>

        {/* Clean body: the segmented stage meter on the plain surface. */}
        <div className="flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]">
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={derivedPct}
            aria-label={`${stageMeta.label}, ${derivedPct}% complete`}
            className="flex gap-[3px]"
          >
            {MATTER_STAGE_ORDER.map((s, i) => (
              <span key={s} className={cn('h-2 flex-1 rounded-full', i <= currentIndex ? fillClass : 'bg-border')} />
            ))}
          </div>
          {!compact ? (
            <span className="text-xs tabular-nums text-muted">
              Stage {currentIndex + 1} of {total} · {derivedPct}%
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);

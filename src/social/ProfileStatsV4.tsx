import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ProfileStatsProps } from './ProfileStats';

/** Drop-in for {@link ProfileStatsProps} — same props, the V4 "feed" design. */
export type ProfileStatsV4Props = ProfileStatsProps;

/**
 * ProfileStats — **V4** "feed" design (web parity of the native V4). The clean,
 * airy take on a profile stat row: big bold numerals stacked over muted labels,
 * generous 8-pt spacing, and a soft-primary tint on press for any tappable
 * column. Same props/behavior as {@link ProfileStatsProps} (values, labels,
 * per-column `onClick`, optional dividers); all colors from `--xen-*` token
 * classes (no literals). Renders bare so it drops into any header.
 */
export const ProfileStatsV4 = React.forwardRef<HTMLDivElement, ProfileStatsV4Props>(
  function ProfileStatsV4({ stats, dividers = false, className, ...rest }, ref) {
    return (
      <div ref={ref} role="group" className={cn('flex items-stretch', className)} {...rest}>
        {stats.map((s, i) => {
          const inner = (
            <div className="flex flex-col items-center gap-0.5 px-sm py-xs">
              <span className="text-2xl font-extrabold tracking-tight text-on-surface">{String(s.value)}</span>
              <span className="text-xs font-medium text-muted">{s.label}</span>
            </div>
          );
          return (
            <React.Fragment key={`${s.label}-${i}`}>
              {dividers && i > 0 ? (
                <div className="my-sm w-px self-stretch bg-border" aria-hidden="true" />
              ) : null}
              {s.onClick ? (
                <button
                  type="button"
                  aria-label={`${s.value} ${s.label}`}
                  onClick={s.onClick}
                  className="flex flex-1 items-center justify-center rounded-[var(--xen-radius-md)] py-xs transition-colors hover:bg-primary/10 active:bg-primary/10"
                >
                  {inner}
                </button>
              ) : (
                <div className="flex flex-1 items-center justify-center">{inner}</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';

export interface ProfileStat {
  /** Caption under the value (e.g. `Followers`). */
  label: string;
  /** Headline number/string (pre-formatted, e.g. `12.4k`). */
  value: string | number;
  /** Makes the column clickable (e.g. open the followers list). */
  onClick?: () => void;
}

export interface ProfileStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The stat columns, left to right (posts / followers / following …). */
  stats: ReadonlyArray<ProfileStat>;
  /** Draw thin dividers between columns. Default `false`. */
  dividers?: boolean;
}

/**
 * A horizontal row of value-over-label stat columns for a profile header
 * (posts, followers, following, …). Any column can be clickable. Renders bare
 * (not a card) so it drops into any header. Web parity of the native
 * `ProfileStats`; token-only.
 */
export const ProfileStats = React.forwardRef<HTMLDivElement, ProfileStatsProps>(
  function ProfileStats({ stats, dividers = false, className, ...rest }, ref) {
    return (
      <div ref={ref} role="group" className={cn('flex items-center', className)} {...rest}>
        {stats.map((s, i) => {
          const inner = (
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-lg font-bold text-on-surface">{String(s.value)}</span>
              <span className="text-xs text-muted">{s.label}</span>
            </div>
          );
          return (
            <React.Fragment key={`${s.label}-${i}`}>
              {dividers && i > 0 ? (
                <div className="my-xs w-px self-stretch bg-border" aria-hidden="true" />
              ) : null}
              {s.onClick ? (
                <button
                  type="button"
                  aria-label={`${s.value} ${s.label}`}
                  onClick={s.onClick}
                  className="flex-1 transition-opacity hover:opacity-70"
                >
                  {inner}
                </button>
              ) : (
                <div className="flex-1">{inner}</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';

/** A single celebratory stat (e.g. `{ label: 'Points', value: '89' }`). */
export interface ChampionStat {
  /** Short caption under the value (e.g. `Points`). */
  label: string;
  /** The stat value, pre-formatted by the caller (e.g. `89`). */
  value: string;
}

/** A trophy / champion celebration hero — the peak-end moment. Presentational only. */
export interface ChampionCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Celebration headline (e.g. `Champions 2024`). */
  title: string;
  /** The winning team's name (the near-white hero line under the trophy). */
  team: string;
  /** Crest/emoji glyph for the team, shown beside the name. */
  crest?: string;
  /** Competition subtitle above the title (e.g. `Premier League`). */
  subtitle?: string;
  /** One optional headline stat rendered as a frosted tile (e.g. season points). */
  stat?: ChampionStat;
  /** Fires on the share action; the CTA only renders when set. */
  onShare?: () => void;
}

/**
 * ChampionCard — the sports module's **peak-end trophy celebration** (web parity
 * of the native twin). A two-hue accent→primary "trophy glow" gradient ground
 * (`from-accent-400 to-primary-600`) with a big 🏆 glyph, the optional
 * competition subtitle, the celebration `title`, and the winning `team` (crest +
 * name) all in near-white ink, plus an optional frosted stat tile and a share
 * CTA. Presentational only: shaped data plus an optional `onShare`; nothing
 * fetches. Every color derives from the brand ramp (gradient utilities +
 * `--xen-*` classes) — no literals, dark-safe.
 */
export const ChampionCard = React.forwardRef<HTMLDivElement, ChampionCardProps>(
  function ChampionCard(
    { title, team, crest, subtitle, stat, onShare, className, ...rest },
    ref
  ) {
    const a11y = `${title}${subtitle ? `, ${subtitle}` : ''}, ${team}`;

    return (
      <div
        ref={ref}
        aria-label={a11y}
        className={cn(
          'flex flex-col items-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600 p-6 text-center text-primary-50 shadow-sm',
          className
        )}
        {...rest}
      >
        <span
          role="img"
          aria-label="Trophy"
          className="flex h-20 w-20 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-4xl"
        >
          <span aria-hidden="true">🏆</span>
        </span>

        {subtitle ? (
          <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-primary-100">
            {subtitle}
          </p>
        ) : null}

        <p className="mt-1 text-2xl font-extrabold text-primary-50">{title}</p>

        <p className="mt-2 flex items-center justify-center gap-2 text-lg font-bold text-primary-50">
          <span aria-hidden="true">{crest ?? '🛡'}</span>
          <span className="truncate">{team}</span>
        </p>

        {stat ? (
          <div className="mt-6 flex min-w-[8rem] flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-6 py-3">
            <span className="text-2xl font-extrabold text-primary-50">{stat.value}</span>
            <span className="text-xs font-semibold text-primary-100">{stat.label}</span>
          </div>
        ) : null}

        {onShare ? (
          <button
            type="button"
            aria-label="Share"
            onClick={onShare}
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-on-primary px-6 text-sm font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <span aria-hidden="true">↗</span>
            Share
          </button>
        ) : null}
      </div>
    );
  }
);

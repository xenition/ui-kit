import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { activateOnKey } from './interactive';

/** Form result for the trailing streak column. */
export type StandingsForm = 'W' | 'D' | 'L';

/** One league-table row. */
export interface StandingsRow {
  /** Stable key / team id. */
  id: string;
  /** Team display name. */
  team: string;
  /** Crest glyph or emoji. */
  crest?: string;
  /** Played. */
  played: number;
  /** Won. */
  won: number;
  /** Drawn. */
  drawn: number;
  /** Lost. */
  lost: number;
  /** Points. */
  points: number;
  /** Goal difference (rendered signed). */
  goalDiff?: number;
  /** Recent form, oldest→newest (max 5 shown). */
  form?: StandingsForm[];
}

/** Highlight band a position belongs to (promotion / relegation etc.). */
export interface StandingsZone {
  /** 1-based inclusive start position. */
  from: number;
  /** 1-based inclusive end position. */
  to: number;
  /** Semantic accent — `success` (promotion) / `danger` (relegation) / `primary`. */
  tone: 'success' | 'danger' | 'primary';
  /** Announced zone name. */
  label: string;
}

export interface StandingsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Ordered rows (top of table first). */
  rows: StandingsRow[];
  /** `full` shows W/D/L + GD; `compact` shows P and Pts only. Default `full`. */
  variant?: 'full' | 'compact';
  /** Show the trailing form streak column (full variant only). */
  showForm?: boolean;
  /** Position bands drawn as a leading accent bar. */
  zones?: StandingsZone[];
  /** Highlight this team id. */
  activeId?: string;
  /** Loading skeleton row count; when set, data is ignored. */
  loadingRows?: number;
  /** Fires with the tapped row (web parity of native `onSelectTeam`). */
  onSelectTeam?: (row: StandingsRow) => void;
  /** Rendered when there are no rows. */
  emptyLabel?: string;
}

const ZONE_BAR: Record<StandingsZone['tone'], string> = {
  success: 'bg-success',
  danger: 'bg-danger',
  primary: 'bg-primary',
};

const FORM_META: Record<StandingsForm, { text: string; border: string; label: string }> = {
  W: { text: 'text-success', border: 'border-success', label: 'win' },
  D: { text: 'text-muted', border: 'border-border', label: 'draw' },
  L: { text: 'text-danger', border: 'border-danger', label: 'loss' },
};

/**
 * A league table — the classic standings grid rendered as a semantic `<table>`.
 * Rows are selectable (`onSelectTeam`, keyboard-activated); `zones` paint
 * promotion / relegation bands as a leading accent bar reinforced by the row's
 * a11y label, so meaning never rests on color alone. Empty (via the shared
 * `EmptyState`) and loading states are built in. `compact` trims to Played +
 * Points for narrow layouts. Token-only colors.
 */
export const Standings = React.forwardRef<HTMLDivElement, StandingsProps>(
  function Standings(
    {
      rows,
      variant = 'full',
      showForm = false,
      zones = [],
      activeId,
      loadingRows,
      onSelectTeam,
      emptyLabel = 'No standings yet',
      className,
      ...rest
    },
    ref
  ) {
    const full = variant === 'full';
    const zoneFor = (pos: number): StandingsZone | undefined =>
      zones.find((z) => pos >= z.from && pos <= z.to);

    const shell = cn(
      'w-full overflow-x-auto rounded-md border border-border bg-surface',
      className
    );

    const th = (label: string, extra = 'text-right') =>
      cn('px-2 py-2 text-xs font-semibold text-muted', extra);
    const td = (extra = 'text-right') =>
      cn('px-2 py-2 text-sm text-muted', extra);

    const head = (
      <thead>
        <tr className="border-b border-border">
          <th className={th('#', 'text-center')}>#</th>
          <th className={th('Team', 'text-left')}>Team</th>
          <th className={th('P')}>P</th>
          {full ? <th className={th('W')}>W</th> : null}
          {full ? <th className={th('D')}>D</th> : null}
          {full ? <th className={th('L')}>L</th> : null}
          {full ? <th className={th('GD')}>GD</th> : null}
          <th className={th('Pts')}>Pts</th>
        </tr>
      </thead>
    );

    const colCount = full ? 8 : 4;

    if (loadingRows && loadingRows > 0) {
      return (
        <div ref={ref} aria-busy="true" aria-label="Loading standings" className={shell} {...rest}>
          <table className="w-full border-collapse">
            {head}
            <tbody>
              {Array.from({ length: loadingRows }).map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td colSpan={colCount} className="p-2">
                    <div className="h-6 rounded-sm bg-neutral-200" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (rows.length === 0) {
      return (
        <div ref={ref} className={shell} {...rest}>
          <table className="w-full border-collapse">
            {head}
            <tbody>
              <tr>
                <td colSpan={colCount} className="p-0">
                  <EmptyState
                    title={emptyLabel}
                    description="Rows appear once the table is published."
                    className="border-0"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div ref={ref} className={shell} {...rest}>
        <table className="w-full border-collapse">
          {head}
          <tbody>
            {rows.map((row, i) => {
              const pos = i + 1;
              const zone = zoneFor(pos);
              const active = row.id === activeId;
              const gd = row.goalDiff ?? row.won - row.lost;
              const gdLabel = gd > 0 ? `+${gd}` : String(gd);
              const label =
                `${pos}. ${row.team}, ${row.points} points, played ${row.played}` +
                (zone ? `, ${zone.label}` : '');
              const clickable = Boolean(onSelectTeam);

              return (
                <tr
                  key={row.id}
                  {...(clickable
                    ? {
                        role: 'button',
                        tabIndex: 0,
                        'aria-label': label,
                        'aria-pressed': active,
                        onClick: () => onSelectTeam!(row),
                        onKeyDown: activateOnKey(() => onSelectTeam!(row)),
                      }
                    : { 'aria-label': label })}
                  className={cn(
                    'border-b border-border last:border-0',
                    active ? 'bg-primary-50' : 'bg-surface',
                    clickable &&
                      'cursor-pointer outline-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-primary-300'
                  )}
                >
                  <td className="relative px-2 py-2 text-center text-sm font-semibold text-on-surface">
                    {zone ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-y-0 left-0 w-[3px]',
                          ZONE_BAR[zone.tone]
                        )}
                      />
                    ) : null}
                    {pos}
                  </td>
                  <td className="px-2 py-2 text-left">
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true" className="text-sm leading-none">
                        {row.crest ?? '🛡'}
                      </span>
                      <span className="truncate text-sm font-semibold text-on-surface">
                        {row.team}
                      </span>
                      {showForm && full && row.form && row.form.length > 0 ? (
                        <span className="ml-1 hidden gap-0.5 sm:flex">
                          {row.form.slice(-5).map((f, fi) => {
                            const fm = FORM_META[f] ?? FORM_META.D;
                            return (
                              <span
                                key={fi}
                                aria-label={fm.label}
                                className={cn(
                                  'inline-flex h-4 w-4 items-center justify-center rounded-sm border bg-neutral-100 text-xs font-bold',
                                  fm.border,
                                  fm.text
                                )}
                              >
                                {f}
                              </span>
                            );
                          })}
                        </span>
                      ) : null}
                    </span>
                  </td>
                  <td className={td()}>{row.played}</td>
                  {full ? <td className={td()}>{row.won}</td> : null}
                  {full ? <td className={td()}>{row.drawn}</td> : null}
                  {full ? <td className={td()}>{row.lost}</td> : null}
                  {full ? <td className={td()}>{gdLabel}</td> : null}
                  <td className={cn(td('text-right'), 'font-bold text-on-surface')}>
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);

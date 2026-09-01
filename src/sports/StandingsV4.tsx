import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { activateOnKey } from './interactive';
import type { StandingsProps, StandingsZone, StandingsForm } from './Standings';

/** Drop-in for {@link StandingsProps} — same props, the V4 "broadcast" design. */
export type StandingsV4Props = StandingsProps;

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
 * Standings — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a league table: an elevated `<table>` with bold rank numerals,
 * emphasized points, and soft-primary-tinted rows for the leading position and any
 * zoned band — meaning still carried by the leading accent bar + a11y label, never
 * color alone. Rows stay selectable and keyboard-activated. Same props/behavior as
 * {@link StandingsProps}; all colors from `--xen-*` token classes (no literals).
 */
export const StandingsV4 = React.forwardRef<HTMLDivElement, StandingsV4Props>(
  function StandingsV4(
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
      'w-full overflow-x-auto rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm',
      className
    );

    const th = (extra = 'text-right') =>
      cn('px-2 py-2 text-xs font-bold text-muted', extra);
    const td = (extra = 'text-right') =>
      cn('px-2 py-2 text-sm text-muted', extra);

    const head = (
      <thead>
        <tr className="border-b border-border">
          <th className={th('text-center')}>#</th>
          <th className={th('text-left')}>Team</th>
          <th className={th()}>P</th>
          {full ? <th className={th()}>W</th> : null}
          {full ? <th className={th()}>D</th> : null}
          {full ? <th className={th()}>L</th> : null}
          {full ? <th className={th()}>GD</th> : null}
          <th className={th()}>Pts</th>
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
                    <div className="h-6 rounded-sm bg-on-surface/10" />
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
              // Broadcast emphasis: the table leader gets a soft-primary tint too.
              const tinted = active || pos === 1;
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
                    tinted ? 'bg-primary/10' : 'bg-surface',
                    clickable &&
                      'cursor-pointer outline-none hover:bg-on-surface/5 focus-visible:ring-2 focus-visible:ring-primary-300'
                  )}
                >
                  <td className="relative px-2 py-2 text-center text-base font-extrabold text-on-surface tabular-nums">
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
                      <span
                        className={cn(
                          'truncate text-sm text-on-surface',
                          tinted ? 'font-extrabold' : 'font-semibold'
                        )}
                      >
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
                                  'inline-flex h-4 w-4 items-center justify-center rounded-sm border bg-on-surface/5 text-xs font-bold',
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
                  <td className={cn(td(), 'tabular-nums')}>{row.played}</td>
                  {full ? <td className={cn(td(), 'tabular-nums')}>{row.won}</td> : null}
                  {full ? <td className={cn(td(), 'tabular-nums')}>{row.drawn}</td> : null}
                  {full ? <td className={cn(td(), 'tabular-nums')}>{row.lost}</td> : null}
                  {full ? <td className={cn(td(), 'tabular-nums')}>{gdLabel}</td> : null}
                  <td className={cn(td('text-right'), 'text-base font-extrabold text-on-surface tabular-nums')}>
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

import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { activateOnKey } from './interactive';
import type { StandingsProps, StandingsForm, StandingsZone } from './Standings';

/** Same public contract as {@link Standings} — a drop-in alternate design. */
export type StandingsV2Props = StandingsProps;

const FORM: Record<StandingsForm, string> = { W: 'bg-success text-on-success', D: 'bg-neutral-300 text-on-surface', L: 'bg-danger text-on-danger' };
const ZONE_BAR: Record<StandingsZone['tone'], string> = { success: 'border-l-success', danger: 'border-l-danger', primary: 'border-l-primary' };

/**
 * Standings, redesigned (v2): a **card-row table**. Each team is a raised row with
 * a rank medallion, crest, name, a form streak of pills, and prominent points — a
 * leading accent bar marks promotion/relegation zones. Bolder than v1's grid.
 * Same props, token-only.
 */
export const StandingsV2 = React.forwardRef<HTMLDivElement, StandingsV2Props>(function StandingsV2(
  { rows, variant, showForm = true, zones, activeId, loadingRows, onSelectTeam, emptyLabel = 'No standings', className, ...rest },
  ref
) {
  void variant;
  if (loadingRows && loadingRows > 0) {
    return (
      <div ref={ref} data-xen-standings="" className={cn('flex flex-col gap-1.5', className)} {...rest}>
        {Array.from({ length: loadingRows }).map((_, i) => <div key={i} className="h-12 animate-pulse rounded-md bg-neutral-100" />)}
      </div>
    );
  }
  if (rows.length === 0) {
    return <EmptyState ref={ref} icon={<span className="text-3xl">🏆</span>} title={emptyLabel} className={className} {...rest} />;
  }

  const zoneFor = (pos: number): StandingsZone | undefined => zones?.find((z) => pos >= z.from && pos <= z.to);

  return (
    <div ref={ref} data-xen-standings="" className={cn('flex flex-col gap-1.5', className)} {...rest}>
      {rows.map((row, i) => {
        const pos = i + 1;
        const zone = zoneFor(pos);
        const active = row.id === activeId;
        const interactive = typeof onSelectTeam === 'function';
        return (
          <div
            key={row.id}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={`${pos}. ${row.team}, ${row.points} points`}
            onClick={interactive ? () => onSelectTeam?.(row) : undefined}
            onKeyDown={interactive ? activateOnKey(() => onSelectTeam?.(row)) : undefined}
            className={cn(
              'flex items-center gap-3 rounded-md border-l-4 bg-surface p-2.5 shadow-sm',
              zone ? ZONE_BAR[zone.tone] : 'border-l-transparent',
              active && 'ring-2 ring-primary',
              interactive && 'cursor-pointer transition-colors hover:bg-neutral-50'
            )}
          >
            <span className="w-6 text-center text-sm font-bold text-muted">{pos}</span>
            <span className="text-lg" aria-hidden>{row.crest ?? '⚽'}</span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{row.team}</span>
            {showForm && row.form && row.form.length > 0 ? (
              <div className="hidden gap-0.5 sm:flex">
                {row.form.slice(-5).map((f, j) => (
                  <span key={j} className={cn('flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold', FORM[f])}>{f}</span>
                ))}
              </div>
            ) : null}
            <span className="w-8 text-right text-base font-bold text-on-surface">{row.points}</span>
          </div>
        );
      })}
    </div>
  );
});

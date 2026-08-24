import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { activateOnKey } from './interactive';
import type { StandingsProps, StandingsZone } from './Standings';

/** Same public contract as {@link Standings} — a drop-in alternate design. */
export type StandingsV3Props = StandingsProps;

const ZONE_DOT: Record<StandingsZone['tone'], string> = { success: 'bg-success', danger: 'bg-danger', primary: 'bg-primary' };

/**
 * Standings, redesigned (v3): a **minimal ladder**. Position, crest + team, and
 * points only — a tiny zone dot flags promotion/relegation. The tightest possible
 * table for a sidebar. The opposite of v2's card rows. Same props, token-only.
 */
export const StandingsV3 = React.forwardRef<HTMLDivElement, StandingsV3Props>(function StandingsV3(
  { rows, variant, showForm, zones, activeId, loadingRows, onSelectTeam, emptyLabel = 'No standings', className, ...rest },
  ref
) {
  void variant;
  void showForm;
  if (loadingRows && loadingRows > 0) {
    return (
      <div ref={ref} data-xen-standings="" className={cn('flex flex-col', className)} {...rest}>
        {Array.from({ length: loadingRows }).map((_, i) => <div key={i} className="h-7 border-b border-border" />)}
      </div>
    );
  }
  if (rows.length === 0) {
    return <EmptyState ref={ref} icon={<span className="text-3xl">🏆</span>} title={emptyLabel} className={className} {...rest} />;
  }

  const zoneFor = (pos: number): StandingsZone | undefined => zones?.find((z) => pos >= z.from && pos <= z.to);

  return (
    <div ref={ref} data-xen-standings="" className={cn('flex flex-col', className)} {...rest}>
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
              'flex items-center gap-2 border-b border-border py-1.5',
              active && 'bg-primary/5',
              interactive && 'cursor-pointer transition-colors hover:bg-neutral-50'
            )}
          >
            <span className="flex items-center gap-1">
              {zone ? <span className={cn('h-2 w-2 rounded-full', ZONE_DOT[zone.tone])} aria-hidden /> : <span className="h-2 w-2" />}
              <span className="w-5 text-right text-xs tabular-nums text-muted">{pos}</span>
            </span>
            <span className="text-sm" aria-hidden>{row.crest ?? '⚽'}</span>
            <span className="min-w-0 flex-1 truncate text-sm text-on-surface">{row.team}</span>
            <span className="text-sm font-bold tabular-nums text-on-surface">{row.points}</span>
          </div>
        );
      })}
    </div>
  );
});

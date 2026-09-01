import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps, FOCUS_RING } from './interactive';

/** The three outcomes an {@link OddsBar} splits across. */
export type OddsPick = 'home' | 'draw' | 'away';

export interface OddsBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Home-win odds as a **decimal price** (e.g. `1.85`). Lower = more likely. */
  home: number;
  /** Draw odds as a **decimal price** (e.g. `3.40`). Lower = more likely. */
  draw: number;
  /** Away-win odds as a **decimal price** (e.g. `4.20`). Lower = more likely. */
  away: number;
  /** Caption under the home price. Default `"Home"`. */
  homeLabel?: string;
  /** Caption under the draw price. Default `"Draw"`. */
  drawLabel?: string;
  /** Caption under the away price. Default `"Away"`. */
  awayLabel?: string;
  /**
   * Optional select handler; receives the chosen outcome. When supplied each
   * segment becomes a keyboard-focusable button (≥44px); when omitted the bar
   * is presentational.
   */
  onSelect?: (pick: OddsPick) => void;
  /** The currently selected outcome, highlighted in primary. */
  selected?: OddsPick;
}

/** Format a decimal price for display, keeping two decimals. */
function formatPrice(v: number): string {
  return Number.isFinite(v) ? v.toFixed(2) : '—';
}

/**
 * OddsBar — **V4** "broadcast" design. A three-segment odds split (home / draw /
 * away) as an elevated, evenly-divided bar. Each segment stacks a big price
 * numeral over a caption. Odds are **decimal prices**, so the **favourite is the
 * lowest price**: it is emphasized in the single `primary` accent. A `selected`
 * pick is filled in primary; when `onSelect` is given each segment is an
 * accessible ≥44px button reflecting its pressed state. All colors from
 * `--xen-*` token classes (no literals); dark-mode safe.
 */
export const OddsBar = React.forwardRef<HTMLDivElement, OddsBarProps>(function OddsBar(
  {
    home,
    draw,
    away,
    homeLabel = 'Home',
    drawLabel = 'Draw',
    awayLabel = 'Away',
    onSelect,
    selected,
    className,
    ...rest
  },
  ref
) {
  const shell = cn(
    'flex items-stretch gap-1.5 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-1.5 text-on-surface shadow-sm',
    className
  );

  const segments: readonly { pick: OddsPick; price: number; label: string }[] = [
    { pick: 'home', price: home, label: homeLabel },
    { pick: 'draw', price: draw, label: drawLabel },
    { pick: 'away', price: away, label: awayLabel },
  ];

  // Favourite = lowest decimal price (most likely outcome).
  const min = Math.min(home, draw, away);

  return (
    <div ref={ref} role="group" aria-label="Match odds" className={shell} {...rest}>
      {segments.map(({ pick, price, label }) => {
        const isSelected = selected === pick;
        const isFav = price === min && Number.isFinite(price);

        const surface = isSelected
          ? 'bg-primary text-on-primary'
          : isFav
            ? 'bg-primary/10 text-primary'
            : 'bg-on-surface/5 text-on-surface';

        const priceCls = cn(
          'text-2xl font-extrabold leading-none',
          isSelected ? 'text-on-primary' : isFav ? 'text-primary' : 'text-on-surface'
        );
        const labelCls = cn(
          'text-xs font-bold uppercase tracking-wide',
          isSelected ? 'text-on-primary' : 'text-muted'
        );

        const a11y = `${label} ${formatPrice(price)}${isFav ? ', favourite' : ''}${
          isSelected ? ', selected' : ''
        }`;

        const body = (
          <>
            <span className={priceCls}>{formatPrice(price)}</span>
            <span className={labelCls}>{label}</span>
          </>
        );

        if (onSelect) {
          return (
            <div
              key={pick}
              className={cn(
                'flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-[var(--xen-radius-md)] px-2 py-2',
                surface,
                FOCUS_RING
              )}
              aria-pressed={isSelected}
              {...tappableProps(() => onSelect(pick), a11y)}
            >
              {body}
            </div>
          );
        }

        return (
          <div
            key={pick}
            aria-label={a11y}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 rounded-[var(--xen-radius-md)] px-2 py-2',
              surface
            )}
          >
            {body}
          </div>
        );
      })}
    </div>
  );
});

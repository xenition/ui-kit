import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export interface FeaturedSessionHeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Small uppercase kicker above the title (e.g. `'Today'` or a category). */
  eyebrow?: string;
  /** The session title — the headline of the hero. */
  title: string;
  /** A supporting line below the title. */
  subtitle?: string;
  /** Session length in minutes; shown as a frosted chip when set. */
  durationMin?: number;
  /** Large, faint decorative glyph in the top-right. Default `'🌅'`. */
  coverGlyph?: string;
  /** Fires when the play button is tapped. */
  onPlay?: () => void;
  className?: string;
}

/**
 * FeaturedSessionHero (web parity) — the home-screen centerpiece: a soft
 * primary-hue gradient ground carrying the featured session, a near-white play
 * button (`bg-on-primary` with a `text-primary` ▶), and a frosted
 * `bg-primary-500` duration chip. A large faint glyph sits behind the copy for
 * warmth. Near-white ink (`text-on-primary` / `text-primary-100`) and the
 * gradient both derive from the brand ramp — token-only colors. The single
 * vivid surface at the top of the screen.
 */
export const FeaturedSessionHero = React.forwardRef<HTMLDivElement, FeaturedSessionHeroProps>(
  function FeaturedSessionHero(
    { eyebrow, title, subtitle, durationMin, coverGlyph = '🌅', onPlay, className, ...rest },
    ref
  ) {
    const a11y = `${eyebrow ? eyebrow + ', ' : ''}${title}${subtitle ? ', ' + subtitle : ''}${
      durationMin != null ? ', ' + durationMin + ' minutes' : ''
    }`;

    return (
      <div
        ref={ref}
        data-xen-featured-session-hero=""
        className={cn(
          'relative rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden',
          className
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[var(--xen-space-md)] top-[var(--xen-space-sm)] opacity-[0.16]"
          style={{ fontSize: '4rem' }}
        >
          {coverGlyph}
        </span>

        <div role="group" aria-label={a11y} className="flex flex-col gap-0.5 pr-[var(--xen-space-xl)]">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-wide text-primary-100">{eyebrow}</p>
          ) : null}
          <p className="text-2xl font-extrabold text-on-primary">{title}</p>
          {subtitle ? <p className="mt-0.5 text-sm text-primary-100">{subtitle}</p> : null}
        </div>

        <div className="mt-[var(--xen-space-lg)] flex items-center gap-[var(--xen-space-md)]">
          <button
            type="button"
            aria-label="Play session"
            onClick={onPlay}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <Icon glyph="▶" size="lg" color="primary" />
          </button>

          {durationMin != null ? (
            <span className="rounded-full bg-primary-500 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-on-primary">
              {`${durationMin} min`}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);

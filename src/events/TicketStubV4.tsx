import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import type { TicketStubProps } from './TicketStub';
import { BADGE_V4, TABULAR_CLASS, spokenLine } from './internal/event-v4';

export interface TicketStubV4Props extends TicketStubProps {
  /** Print and speak the ticket code. Default: the code, unchanged. */
  formatCode?: (code: string) => string;
}

/** How many bars the placeholder band draws. */
const BAR_COUNT = 28;

/**
 * **V4 ticket stub** — the web twin of the native `TicketStubV4`, same props as
 * {@link TicketStub} plus `formatCode`.
 *
 * ## Four changes
 *
 * 1. **The barcode is drawn on a band that owns its own contrast.** The band
 *    was `bg-neutral-50` — a ramp step, which mirrors under
 *    `[data-theme="dark"]` — with bars inked `on-surface` over it. This twin
 *    happened to invert the right way and the native one did not (there the
 *    ramp carries its light orientation into dark mode, so a near-white ink sat
 *    on a near-white band and the stub's only scannable-looking artefact
 *    vanished). Both twins now paint the band `surface` and the bars
 *    `on-surface` and `muted` — a guaranteed pair rather than a ramp step that
 *    two platforms disagree about.
 * 2. **The stub's name lands on both twins**, and it is built from the same
 *    parts: the event, the holder, the date, the tier and the formatted code.
 * 3. **`formatCode` exists**, because a ticket code is the one string on this
 *    component a host actually wants to group — `ABCD 1234` printed, and the
 *    same grouping spoken, rather than twelve characters run together.
 * 4. **The band height and the code's tracking come from tokens**, not `h-10`
 *    and Tailwind's `tracking-widest`, and the code is tabular so its
 *    characters sit on a fixed pitch the way a printed stub's do.
 */
export const TicketStubV4 = React.forwardRef<HTMLDivElement, TicketStubV4Props>(
  function TicketStubV4(
    {
      eventTitle,
      holderName,
      dateLabel,
      fields = [],
      code,
      tier,
      variant = 'default',
      formatCode,
      className,
      ...rest
    },
    ref
  ) {
    if (!eventTitle) return null;

    const printedCode = (formatCode ?? ((c: string) => c))(code);

    // Deterministic bar widths from the code characters. The widths are bare
    // numbers on purpose: a barcode bar is hairline geometry, the same
    // exception the row family's 1px separator takes, and quantising it to the
    // spacing scale would make a 28-bar band four times too wide.
    const chars = code.length > 0 ? code.split('') : ['0'];
    const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
      const ch = chars[i % chars.length] ?? '0';
      const magnitude = (ch.charCodeAt(0) % 3) + 1;
      const dark = ch.charCodeAt(0) % 2 === 0;
      return { width: magnitude, dark };
    });

    return (
      <div
        ref={ref}
        role="group"
        aria-label={spokenLine([eventTitle, holderName, dateLabel, tier, printedCode])}
        className={cn(
          'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card',
          className
        )}
        {...rest}
      >
        <div className="flex flex-col gap-sm p-lg">
          <div className="flex items-start justify-between gap-sm">
            <h3 className="flex-1 font-heading text-lg font-bold text-on-card">{eventTitle}</h3>
            {tier ? (
              <BadgeV4 {...BADGE_V4} tone="primary">
                {tier}
              </BadgeV4>
            ) : null}
          </div>
          {holderName ? <p className="text-sm text-muted-text">{holderName}</p> : null}
          {dateLabel ? <p className="text-sm text-muted-text">{dateLabel}</p> : null}

          {variant !== 'compact' && fields.length > 0 ? (
            <div className="mt-xs flex flex-row flex-wrap gap-lg">
              {fields.map((f, i) => (
                <div key={`${f.label}-${i}`} className="flex flex-col gap-xs">
                  <span className="text-xs font-semibold text-muted-text [letter-spacing:calc(var(--xen-space-xs)_/_4)]">
                    {f.label.toUpperCase()}
                  </span>
                  <span className="text-base font-semibold text-on-card">{f.value}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Perforation-style divider — a hairline, drawn as one. */}
        <div aria-hidden="true" className="h-px bg-border" />
        <div
          aria-hidden="true"
          className="flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] items-end justify-center gap-0.5 bg-surface py-sm"
        >
          {bars.map((b, i) => (
            <span
              key={i}
              className={cn('h-full', b.dark ? 'bg-on-surface' : 'bg-muted')}
              style={{ width: b.width }}
            />
          ))}
        </div>
        <p
          className={cn(
            'bg-surface pb-sm text-center text-xs text-muted-text [letter-spacing:calc(var(--xen-space-xs)_/_2)]',
            TABULAR_CLASS
          )}
        >
          {printedCode}
        </p>
      </div>
    );
  }
);

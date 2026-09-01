import * as React from 'react';
import { cn } from '../primitives/cn';
import type { BoardingField, BoardingPassProps } from './BoardingPass';

/** Drop-in for {@link BoardingPassProps} — same props, the V4 "journey" design. */
export type BoardingPassV4Props = BoardingPassProps;

/**
 * BoardingPass — **V4** "journey" design (web parity of the native V4). The
 * signature of the boarding-pass line: a saturated brand-gradient header band
 * carrying the airline/flight and the from→gradient-plane-disc→to route in
 * near-white ink (the FlightCardV4 rail motif), the gate/seat/zone/boarding
 * fields as frosted glass tiles, then a dashed perforated tear line — notched at
 * both edges — dividing the header from a stub bearing a token-drawn barcode and
 * the passenger name / confirmation code. Same props/behavior as
 * {@link BoardingPassProps}; all colors from `--xen-*` token classes and gradient
 * utilities (no literal colors); dark-mode safe.
 */
export const BoardingPassV4 = React.forwardRef<HTMLDivElement, BoardingPassV4Props>(
  function BoardingPassV4(
    { passenger, from, to, flight, gate, seat, zone, boardingTime, extraFields = [], barcode, className, ...rest },
    ref
  ) {
    const fields: BoardingField[] = [
      gate ? { label: 'Gate', value: gate } : null,
      seat ? { label: 'Seat', value: seat } : null,
      zone ? { label: 'Zone', value: zone } : null,
      boardingTime ? { label: 'Boarding', value: boardingTime } : null,
      ...extraFields,
    ].filter((f): f is BoardingField => f != null);

    return (
      <div
        ref={ref}
        data-xen-boarding-pass=""
        aria-label={`Boarding pass for ${passenger}, ${from} to ${to}, flight ${flight}`}
        className={cn(
          'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-lg',
          className
        )}
        {...rest}
      >
        {/* Gradient header band — airline/flight, route rail in near-white ink, frosted field tiles */}
        <div className="flex flex-col gap-[var(--xen-space-md)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]">
          <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
            <span className="text-xs font-semibold tracking-[2px] text-primary-100">BOARDING PASS</span>
            <span className="text-xs font-semibold text-primary-50">{flight}</span>
          </div>

          {/* Route rail: code — line — gradient plane disc — line — code */}
          <div className="flex items-center gap-[var(--xen-space-md)]">
            <span className="text-3xl font-extrabold text-primary-50">{from}</span>
            <div className="flex flex-1 items-center">
              <div className="h-0.5 flex-1 rounded-full bg-primary-50/40" />
              <span className="mx-1.5 flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50">
                ✈
              </span>
              <div className="h-0.5 flex-1 rounded-full bg-primary-50/40" />
            </div>
            <span className="text-3xl font-extrabold text-primary-50">{to}</span>
          </div>

          {fields.length > 0 ? (
            <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
              {fields.map((f, i) => (
                <div
                  key={`${f.label}-${i}`}
                  className="flex min-w-[64px] flex-1 flex-col gap-[2px] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]"
                >
                  <span className="text-xs text-primary-100">{f.label}</span>
                  <span className="text-sm font-semibold text-primary-50">{f.value}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Dashed perforated tear line with notch circles overlapping each edge */}
        <div aria-hidden="true" className="relative h-0 border-t border-dashed border-border">
          <span className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface" />
          <span className="absolute right-0 top-0 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-surface" />
        </div>

        {/* Stub — barcode strip + passenger / confirmation code */}
        <div className="flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]">
          <div className="flex justify-between gap-[var(--xen-space-md)]">
            <div className="flex flex-col gap-[2px]">
              <span className="text-xs text-muted">Passenger</span>
              <span className="text-base font-semibold text-on-surface">{passenger}</span>
            </div>
            {barcode ? (
              <div className="flex flex-col items-end gap-[2px]">
                <span className="text-xs text-muted">Confirmation</span>
                <span className="text-base font-semibold tracking-[2px] text-on-surface">{barcode}</span>
              </div>
            ) : null}
          </div>

          <div aria-hidden="true" className="flex h-11 items-stretch gap-[2px]">
            {Array.from({ length: 40 }, (_, i) => (
              <div
                key={i}
                className={cn(i % 3 === 0 ? 'flex-[2]' : 'flex-1', i % 2 === 0 ? 'bg-on-surface' : 'bg-border')}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

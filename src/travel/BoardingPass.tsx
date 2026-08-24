import * as React from 'react';
import { cn } from '../primitives/cn';

/** A labelled field shown in the boarding-pass detail grid. */
export interface BoardingField {
  label: string;
  value: string;
}

export interface BoardingPassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Passenger full name. */
  passenger: string;
  /** Origin IATA code. */
  from: string;
  /** Destination IATA code. */
  to: string;
  /** Flight designator, e.g. `'XN 482'`. */
  flight: string;
  /** Boarding gate. */
  gate?: string;
  /** Seat assignment, e.g. `'12A'`. */
  seat?: string;
  /** Boarding zone/group. */
  zone?: string;
  /** Pre-formatted boarding time. */
  boardingTime?: string;
  /** Extra fields appended to the detail grid. */
  extraFields?: readonly BoardingField[];
  /** Barcode payload string, rendered as a token-styled placeholder (no scan lib). */
  barcode?: string;
}

/**
 * Web parity of the native `BoardingPass`: a boarding pass — passenger, the
 * from→to route, flight, and a grid of gate/seat/zone/boarding fields, capped by
 * a token-styled barcode placeholder (no barcode dependency; the `barcode`
 * string is shown beneath it). Token-only colors.
 */
export const BoardingPass = React.forwardRef<HTMLDivElement, BoardingPassProps>(
  function BoardingPass(
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
          'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
          className
        )}
        {...rest}
      >
        <div className="bg-primary p-[var(--xen-space-md)]">
          <span className="text-xs font-semibold text-on-primary">BOARDING PASS</span>
          <div className="mt-[var(--xen-space-xs)] flex items-center gap-[var(--xen-space-sm)]">
            <span className="text-2xl font-bold text-on-primary">{from}</span>
            <span aria-hidden="true" className="text-lg text-on-primary">
              ✈
            </span>
            <span className="text-2xl font-bold text-on-primary">{to}</span>
          </div>
        </div>

        <div className="flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-md)]">
          <div className="flex justify-between gap-[var(--xen-space-md)]">
            <div className="flex flex-col gap-[2px]">
              <span className="text-xs text-muted">Passenger</span>
              <span className="text-base font-semibold text-on-surface">{passenger}</span>
            </div>
            <div className="flex flex-col items-end gap-[2px]">
              <span className="text-xs text-muted">Flight</span>
              <span className="text-base font-semibold text-on-surface">{flight}</span>
            </div>
          </div>

          {fields.length > 0 ? (
            <div className="flex flex-wrap gap-[var(--xen-space-md)]">
              {fields.map((f, i) => (
                <div key={`${f.label}-${i}`} className="flex min-w-[64px] flex-col gap-[2px]">
                  <span className="text-xs text-muted">{f.label}</span>
                  <span className="text-sm font-semibold text-on-surface">{f.value}</span>
                </div>
              ))}
            </div>
          ) : null}

          <div aria-hidden="true" className="flex h-11 items-stretch gap-[2px]">
            {Array.from({ length: 32 }, (_, i) => (
              <div
                key={i}
                className={cn(i % 3 === 0 ? 'flex-[2]' : 'flex-1', i % 2 === 0 ? 'bg-on-surface' : 'bg-surface')}
              />
            ))}
          </div>
          {barcode ? (
            <span className="text-center text-xs tracking-[2px] text-muted">{barcode}</span>
          ) : null}
        </div>
      </div>
    );
  }
);

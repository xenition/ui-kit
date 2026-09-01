import * as React from 'react';
import type { TicketStubProps } from './TicketStub';
export interface TicketStubV4Props extends TicketStubProps {
    /** Print and speak the ticket code. Default: the code, unchanged. */
    formatCode?: (code: string) => string;
}
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
export declare const TicketStubV4: React.ForwardRefExoticComponent<TicketStubV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TicketStubV4.d.ts.map
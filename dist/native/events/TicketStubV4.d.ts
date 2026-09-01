import * as React from 'react';
import type { TicketStubProps } from './TicketStub';
export interface TicketStubV4Props extends TicketStubProps {
    /** How the code is printed and announced. Default: the code as given. */
    formatCode?: (code: string) => string;
}
/**
 * **V4 ticket stub** — same props as {@link TicketStub} plus `formatCode`.
 *
 * ## Four changes
 *
 * 1. **The barcode survives dark mode.** The band was
 *    `tokens.ramps.neutral[50]` and the dark bars were `colors.onSurface`, and
 *    the native ramps keep their light orientation in both schemes — so in
 *    dark mode a near-white ink was drawn on a near-white band and the stub's
 *    only scannable-looking artefact simply vanished. The web twin inverts
 *    correctly, so the two twins did not even fail the same way. The band is
 *    now the shared placeholder ground and the bars are the card's own ink.
 * 2. **The stub's name lands.** `accessibilityRole="summary"` and a label sat
 *    on a plain `View`; without `accessible` neither platform reads it, so the
 *    holder, the date, the tier and every field went unannounced.
 * 3. **The name carries the whole stub** — event, tier, holder, date, each
 *    field as "label value", and the code — rather than only the title and the
 *    code.
 * 4. **The band height and the letter-spacing come off the scale**, not from
 *    the literals `2` and `1`, so a re-scaled seed moves them with everything
 *    else. The code is tabular, which is what makes a printed reference
 *    readable a character at a time.
 *
 * **Renders nothing without an `eventTitle`.**
 */
export declare function TicketStubV4({ eventTitle, holderName, dateLabel, fields, code, tier, formatCode, variant, style, }: TicketStubV4Props): React.ReactElement | null;
//# sourceMappingURL=TicketStubV4.d.ts.map
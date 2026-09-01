import * as React from 'react';
import type { SnoozeRowProps } from './SnoozeRow';
export interface SnoozeRowV4Props extends SnoozeRowProps {
}
/**
 * **V4 snooze preset row** — the same props as {@link SnoozeRow}. Nothing to
 * add: everything wrong with this row was in how it was drawn, not in what it
 * could be told.
 *
 * ## Four changes
 *
 * 1. **Selected and pressed stopped being the same thing.** The base drew
 *    pressed as `colors.border` — a hairline token used as a fill — and
 *    selected as a hand-mixed 12% wash of `primary`. Both now come from the
 *    shared row line: `selected` is `colors.selected`, and a press composites
 *    M3's layer into whichever ground the row is already on, so holding a
 *    finger on an unselected preset never makes it look chosen.
 * 2. **The text on a selected row is that ground's guaranteed pair.** The base
 *    kept `onSurface` over a tint nobody measured it against.
 * 3. **It is a row from the row family**, so a snooze sheet, a settings screen
 *    and a notification list are one object at one height with one rhythm.
 * 4. **The check mark is decorative on both twins.** It was already hidden
 *    here and was a reader stop on the web; the pair of native flags is now
 *    the full `no-hide-descendants` spelling the rest of the V4 line uses.
 */
export declare function SnoozeRowV4({ label, when, glyph, selected, onPress, style, }: SnoozeRowV4Props): React.ReactElement;
//# sourceMappingURL=SnoozeRowV4.d.ts.map
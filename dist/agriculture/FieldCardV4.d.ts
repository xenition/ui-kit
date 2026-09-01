import * as React from 'react';
import type { FieldCardProps, FieldStatus } from './FieldCard';
export interface FieldCardV4Props extends FieldCardProps {
    /** Override the status names — four English words lived inside the component. */
    statusLabels?: Partial<Record<FieldStatus, string>>;
    /**
     * Render the area. Default is the value and its unit separated by a space.
     *
     * A prop because the separator is a locale decision: `12.4 ha`, `12,4 ha`
     * and `30.6 acres` are all correct somewhere.
     */
    formatArea?: (area: number | string, unit?: string) => string;
}
/**
 * **V4 field card** — the web twin of the native `FieldCardV4`, same props as
 * {@link FieldCard} plus `statusLabels` and `formatArea`.
 *
 * ## Four changes
 *
 * 1. **An interactive card is a `<button>`**, not a `<div>` with
 *    `role="button"`, `tabIndex` and a hand-written Enter/Space handler.
 * 2. **Hover is the shared state layer**, not a `hover:bg-neutral-50` ramp
 *    step that is near-white on a dark page.
 * 3. **Captions take `muted-text`**, the slot with a contrast promise.
 * 4. **The area is formatted, not concatenated**, and set tabular so a list of
 *    fields lines up.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare const FieldCardV4: React.ForwardRefExoticComponent<FieldCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FieldCardV4.d.ts.map
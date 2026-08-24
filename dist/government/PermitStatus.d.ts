import * as React from 'react';
import { type PermitStatusValue } from './internal/status';
export type { PermitStatusValue };
export interface PermitStatusProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Current permit lifecycle status. */
    status: PermitStatusValue;
    /** Permit / application reference number (e.g. "BLD-2026-0417"). */
    permitNumber?: string;
    /** Human permit title (e.g. "Building permit — 12 Oak St"). */
    title?: string;
    /** Localized date of the most recent status change. */
    updatedDate?: string;
    /** Show a loading placeholder instead of the tracker. */
    loading?: boolean;
}
/**
 * A permit / license application status tracker. Renders the ordered happy-path
 * stages (submitted → review → approved → issued) via the `Steps` primitive; a
 * `denied` permit branches into a `danger`-toned banner conveyed by **glyph +
 * text + color** (never color alone) and announced with `role="alert"`. Guarded
 * against unknown statuses. Token-bound throughout — no literal colors. Web
 * parity of the native `PermitStatus`.
 */
export declare const PermitStatus: React.ForwardRefExoticComponent<PermitStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PermitStatus.d.ts.map
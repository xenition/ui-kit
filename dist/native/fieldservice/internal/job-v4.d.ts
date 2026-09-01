/**
 * The `fieldservice` module's own V4 vocabulary (native) — the twin of
 * `fieldservice/internal/job-v4.ts`.
 *
 * The base module already had `internal/format.ts`, which stays untouched.
 * This file corrects the two things it got wrong and adds what the V4 line
 * needs.
 *
 * Nothing here is exported from the package.
 */
import type { XenitionNativeTheme } from '../../theme';
import { onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import { clearsHazard, hazardCount, isComplete, nextVerdict, type SafetyVerdict } from '../../../fieldservice/verdict-v4';
export { clearsHazard, hazardCount, isComplete, nextVerdict, onPair, skeletonFill, toneFill, toneInk };
export type { SafetyVerdict, ToneV4 };
/** How far a disc tint sits into the card behind it. One number, both twins. */
export declare const DISC_MIX = 0.12;
/**
 * One tint strength for the whole module, on both twins.
 *
 * The base's `withAlpha()` left the alpha to each call site: 0.10, 0.12 and
 * 0.14 all appear across the twelve components, and the web twin fixed every
 * slot at 10% while dropping `muted` to an **opaque ramp step** inside a map
 * its own doc calls "translucent". One helper, four different strengths.
 *
 * Mixing into `card` rather than laying a translucent wash over whatever
 * happens to be behind also means the disc is the same colour on a card, on a
 * sheet and on a page — which `withAlpha` never was.
 */
export declare function discGround(theme: XenitionNativeTheme, tone: ToneV4): string;
/** A tone as the contrast-corrected **ink**, for a glyph drawn on that disc. */
export declare function discInk(theme: XenitionNativeTheme, tone: ToneV4): string;
/**
 * One badge shape for the whole module.
 *
 * Web never passed `variant`/`size` and took `Badge`'s `solid`/`md` defaults
 * while native always passed `soft`, usually `sm` — across **16 call sites**.
 * The same field-service screen was a wall of saturated pills on the web and
 * soft tints on the phone.
 */
export declare const BADGE_V4: {
    readonly variant: "soft";
    readonly size: "sm";
};
/** Hours, money and any figure that stacks down a timesheet. */
export declare const TABULAR: {
    fontVariant: "tabular-nums"[];
};
/**
 * Build the one accessible name an interactive field-service row should carry.
 *
 * Eight components put a short label on the interactive root, which
 * **replaces** the subtree — and in every case what it dropped was the
 * operational payload: the priority, the defect note, the stock state, the
 * hazard flag, the money total, the ETA. A technician heard "Open" and never
 * "Emergency".
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
//# sourceMappingURL=job-v4.d.ts.map
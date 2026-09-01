"use strict";
/**
 * The product grid's column contract, shared by **both twins**.
 *
 * No React and no platform in here, so the native twin can read it without
 * dragging a web component into its bundle — the same reason `money.ts` and
 * `internal/status-v4.ts` are their own files.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLUMN_TIERS = void 0;
/**
 * Columns per breakpoint tier, `[base, sm, lg]`.
 *
 * This table is the **contract between the twins**, and writing it down is the
 * point of it: `columns` meant two different things on the two platforms. The
 * web base documented it as "max columns on the widest breakpoint" and
 * defaulted to 4; the native base treated it as a literal column count and
 * defaulted to 2, with a comment calling that "a sensible phone default vs.
 * web's 4". So: one prop, one name, two meanings and two defaults — a template
 * that swapped web for native by import path silently changed its layout.
 *
 * V4 fixes the meaning rather than the default. `columns` is the ceiling on
 * both twins, both default to `4`, and the native twin measures the window and
 * steps down through these same tiers. A phone renders two columns because it
 * is a phone, not because it imported a different file.
 *
 * The numbers are the web base's own class map read back out
 * (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` is `[2, 3, 4]`), so the web
 * layout is unchanged by the fix.
 */
exports.COLUMN_TIERS = {
    2: [1, 2, 2],
    3: [2, 2, 3],
    4: [2, 3, 4],
};
//# sourceMappingURL=grid-v4.js.map
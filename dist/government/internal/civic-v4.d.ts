/**
 * The `government` module's own V4 vocabulary (web) — the twin of
 * `native/government/internal/civic-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
import { SKELETON_CLASS, TONE_INK, TONE_ON, type ToneV4 } from '../../primitives/internal/tone-v4';
import { isAdverse, labelledId, statusSentence } from '../civic-v4';
export { isAdverse, labelledId, SKELETON_CLASS, statusSentence, TONE_INK, TONE_ON };
export type { ToneV4 };
/**
 * A tinted disc or banner, with an ink that carries a promise.
 *
 * The base module ships `internal/tint.ts`, a shared table whose every
 * foreground is a **fill token used as ink** — `text-success`, `text-warn`,
 * `text-danger`, `text-muted`, `text-primary`, `text-accent` — on grounds
 * built from ramp steps. Every component that calls it inherits both defects
 * at once.
 *
 * Its own docblock says "Mirror of the insurance module's `internal/tint.ts`",
 * and it is: the two files are byte-identical apart from that one sentence. So
 * the same table sits in a second module, and only the copy that documents
 * itself as a mirror knows the other exists.
 *
 * There is no native counterpart to either, so the twins diverge — web has a
 * fixed table, native uses `withAlpha` per call site.
 */
export declare function tintGround(tone: ToneV4): string;
/** The contrast-corrected ink for a label on that tint. */
export declare function tintInkClass(tone: ToneV4): string;
/**
 * One badge shape, and one card variant, for the whole module.
 *
 * Every badge in `government` is a filled pill on web and a soft tint on
 * native — ten components — and every card is `outlined` on web and
 * `elevated`/`interactive` on native — nine components. Neither twin passes
 * what the other passes, so the same civic screen is two different designs.
 */
export declare const BADGE_V4: {
    readonly variant: "soft";
    readonly size: "sm";
};
export declare const CARD_V4: "elevated";
/** A department, a service category and a document type are identity. */
export declare const IDENTITY_TONE: ToneV4;
/** The ground behind a skeleton — never `border`, never a ramp step. */
export declare const PLACEHOLDER_CLASS = "rounded-[var(--xen-radius-sm)] bg-[color-mix(in_srgb,var(--xen-on-card)_12%,var(--xen-card))]";
/**
 * Build the one accessible name an interactive civic row or card should carry.
 *
 * All five pressable components use a fixed three-field template that omits
 * exactly what a civic user needs: the "Unavailable" channel, the notice date
 * and venue, the next payment date and case number, the "Urgent" priority, the
 * agency and the filing date.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
//# sourceMappingURL=civic-v4.d.ts.map
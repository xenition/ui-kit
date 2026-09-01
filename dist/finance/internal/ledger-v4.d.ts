/**
 * The `finance` module's own V4 vocabulary (web) — the twin of
 * `native/finance/internal/ledger-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
import { SKELETON_CLASS, TONE_INK, TONE_ON, type ToneV4 } from '../../primitives/internal/tone-v4';
import { lineTotal, meterParts, pctText, ratePrecision, signParts } from '../money-v4';
export { lineTotal, meterParts, pctText, ratePrecision, signParts, SKELETON_CLASS, TONE_INK, TONE_ON };
export type { ToneV4 };
/**
 * Money as the contrast-corrected **ink**.
 *
 * `MoneyAmount` painted amounts `text-success` / `text-danger` — **fill**
 * tokens, which a rendered audit measured at 1.32:1 as text. The native twin
 * had already migrated to the `*Text` slots and carries a comment saying why;
 * the web twin missed the migration wholesale, and because every component in
 * the module routes its figures through `MoneyAmount`, all thirteen inherited
 * it.
 */
export declare function moneyInkClass(tone: ToneV4): string;
/**
 * An account type, a card network and a payment default are **identity**.
 *
 * `AccountCard` gave a savings account `success` — a savings account is not
 * "healthy" — and `PaymentMethodRow` gave its "Default" badge `success` too.
 * Both sat next to a `MoneyAmount` whose green means income.
 */
export declare const IDENTITY_TONE: ToneV4;
/**
 * The six slots a finance meter or category mark may take.
 *
 * The canonical union lived in `finance/internal/Meter.tsx` — a web JSX file
 * the native twin must not import — so the native components declared it twice
 * locally. Both twins import it from here instead.
 *
 * It is also **narrower than the native bases**, which typed `color` as
 * `keyof SemanticColors`: the whole palette, `border` and `onPrimary`
 * included, so a caller could paint a category bar in an ink slot.
 */
export type FinanceColorV4 = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';
/** One badge shape for the whole module. */
export declare const BADGE_V4: {
    readonly variant: "soft";
    readonly size: "sm";
};
/** Every figure in this module stacks in a column. */
export declare const TABULAR_CLASS = "tabular-nums";
/** The ground behind a skeleton — never `border`, never a ramp step. */
export declare const PLACEHOLDER_CLASS = "rounded-[var(--xen-radius-sm)] bg-[color-mix(in_srgb,var(--xen-on-card)_12%,var(--xen-card))]";
/**
 * Build the one accessible name an interactive finance row should carry.
 *
 * Six components put a short label on the interactive root, which **replaces**
 * the subtree — and in every case the pruned content was the numeric payload
 * the component exists to display. A reader heard "Whole Foods, button" and
 * never learned it was −$84.12.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
//# sourceMappingURL=ledger-v4.d.ts.map
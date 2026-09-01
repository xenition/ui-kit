/**
 * The `finance` module's own V4 vocabulary (native) — the twin of
 * `finance/internal/ledger-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
import type { XenitionNativeTheme } from '../../theme';
import { onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import { lineTotal, meterParts, pctText, ratePrecision, signParts } from '../../../finance/money-v4';
export { lineTotal, meterParts, onPair, pctText, ratePrecision, signParts, skeletonFill, toneFill, toneInk };
export type { ToneV4 };
/**
 * Money as the contrast-corrected **ink**.
 *
 * The native twin already draws money with the `*Text` slots. What it does
 * **not** do is use `mutedText`: `colors.muted` appears as a text colour in
 * thirteen native files, and `muted` carries no contrast promise — the theme
 * added `mutedText` for exactly this. `MoneyAmount`'s `tone="muted"` means a
 * real balance is drawn in it.
 */
export declare function moneyInk(theme: XenitionNativeTheme, tone: ToneV4): string;
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
export declare const TABULAR: {
    fontVariant: "tabular-nums"[];
};
/** The ground behind a skeleton — never `border`, never a ramp step. */
export declare function placeholderGround(theme: XenitionNativeTheme): string;
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
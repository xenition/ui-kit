/**
 * The `jobs` module's native-only V4 vocabulary: the pieces that need a
 * resolved native theme, plus the wording that turns
 * {@link import('../../../jobs/hiring-v4') hiring-v4}'s arithmetic into the
 * strings a component draws and announces.
 *
 * The maths itself is **not** here. `salaryParts`, `stageParts`,
 * `relativeParts` and `isAdverse` live in `src/jobs/hiring-v4.ts`, which both
 * twins import, precisely so the two halves cannot disagree about what a
 * salary band or a pipeline position *is*. What is here is the half that
 * cannot be shared: a `ViewStyle` needs `useXenitionTheme()`, and React Native
 * has no CSS variable to read a token off.
 *
 * ## Why the wording is here too
 *
 * Twelve components drew six English strings between them — `just now`,
 * `2d ago`, `From $90k/yr`, `51–200 employees` — each spelled out at the call
 * site with no override, which is what made the module unlocalisable. Every
 * one of those is now a default *inside a helper* that takes the caller's
 * formatter first, so a component's job is to pass the prop through rather
 * than to re-derive the sentence.
 *
 * Nothing in this file is exported from the package.
 */
import type { ViewStyle } from 'react-native';
import type { XenitionNativeTheme } from '../../theme';
import { metaLine, onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import type { Salary } from '../types';
export { metaLine, onPair, skeletonFill, toneFill, toneInk };
export type { ToneV4 };
/**
 * Join the fragments of a **spoken** name.
 *
 * Commas, not {@link metaLine}'s middle dot: a screen reader either says
 * "middle dot" out loud or swallows the pause entirely, and this module's
 * whole finding is that its names were never heard in the first place. Use
 * {@link metaLine} for a *visible* meta line and this for anything that ends
 * up in an `accessibilityLabel`.
 */
export declare function spokenName(parts: ReadonlyArray<string | number | null | undefined>): string;
/**
 * How long ago something happened, as a drawable string.
 *
 * `''` when the instant is missing or unparseable — the caller draws nothing
 * rather than a blank line or the literal `Invalid Date` the base's
 * `Intl.DateTimeFormat` path produced. The count comes from `relativeParts`,
 * which **floors**: the base rounded, so 25 days ago read "1mo ago" and 90
 * minutes read "2h ago", both claiming time that had not passed.
 */
export declare function relativeLabel(iso: string | undefined, format?: (iso: string) => string, now?: number): string;
/** How a caller re-words a salary band. */
export interface SalaryTextOptions {
    /** Render one bound. Default the module's compact money formatter. */
    formatMoney?: (amount: number, currency?: string) => string;
    /**
     * Cadence suffixes. `day` is deliberately absent — the spec's prop table
     * names three periods and both twins take that table verbatim, so a daily
     * band keeps the built-in `/day` rather than one twin growing a fourth key
     * the other does not have.
     */
    periodLabels?: {
        year?: string;
        hour?: string;
        month?: string;
    };
}
/** A salary band resolved to what a component draws and says about it. */
export interface SalaryTextV4 {
    /** The band, or `null` when there is nothing usable to draw. */
    text: string | null;
    /** The caller supplied the bounds the wrong way round; they were swapped. */
    inverted: boolean;
    /**
     * Bounds were supplied and **none** survived validation — `NaN`, `Infinity`,
     * a negative wage. Distinct from "no salary given", because the two deserve
     * different sentences: one is undisclosed, the other is broken data. The
     * base could not tell them apart and rendered `From $NaN/yr`.
     */
    broken: boolean;
}
/** Read a salary band into its drawable string. */
export declare function salaryText(salary: Salary | null | undefined, options?: SalaryTextOptions): SalaryTextV4;
/**
 * A free-form headcount as a chip label.
 *
 * `Company.size` is a **string** — `'51–200'` is the documented example — so a
 * `formatEmployees(n: number)` prop can only reach it when the app happens to
 * have stored a plain number. It does then, and a range keeps the base's own
 * wording rather than being dropped or mangled into a number it is not.
 * `null` when there is nothing to say.
 */
export declare function headcountLabel(size: string | undefined, format?: (count: number) => string): string | null;
/**
 * The raised card every `jobs` card is drawn on.
 *
 * `card`, not `surface`: the slot exists so a raised thing reads as raised in
 * dark mode too, where the base's `surface` card was the same colour as the
 * page behind it. `border` is a hairline here and nowhere else in the module —
 * it was being used as a **fill** for skeleton blocks, the résumé file tile and
 * the default `SkillTag` ground, which is what made every loading state the
 * colour of a divider.
 */
export declare function cardSurfaceStyle(theme: XenitionNativeTheme): ViewStyle;
/**
 * One placeholder block of a loading skeleton.
 *
 * The fill is {@link skeletonFill} — an **opaque** state mix against the card's
 * own ground. The module drew these in `colors.border`, so a loading job card
 * was a stack of divider-coloured bars that read as a broken table rather than
 * as content arriving.
 */
export declare function skeletonBarStyle(theme: XenitionNativeTheme, options: {
    width: ViewStyle['width'];
    height: number;
    round?: boolean;
}): ViewStyle;
//# sourceMappingURL=tone-v4.d.ts.map
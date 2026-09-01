/**
 * Typing an amount — **pure, and shared by both twins**, the way
 * `calendar/layout-v4.ts` and `booking/schedule-v4.ts` are. The native twin
 * imports it as `../../crypto/amount-v4`.
 *
 * Nothing here is exported from the package.
 */
/**
 * Sanitise a typed amount to something a person can actually type.
 *
 * Keeps digits and **one** decimal separator, drops everything else, and
 * caps the fraction. Crucially it returns the *text*, because a half-typed
 * amount — `"0"`, `"1."`, `"0.30"` — is not yet a number and must survive
 * until it is.
 */
export declare function sanitizeAmountText(raw: string, maxDecimals?: number): string;
/** The number a draft stands for. `"1."` and `""` are not yet amounts. */
export declare function amountValue(text: string): number;
/** Whether a draft and a committed number are the same amount. */
export declare function sameAmount(text: string, value: number): boolean;
/**
 * A numeric field that can be typed in.
 *
 * ## The bug this replaces
 *
 * `SwapForm` was fully controlled off a **number**:
 *
 * ```tsx
 * value={fromAmount === 0 ? '' : String(fromAmount)}
 * onChange={(e) => emit(parseAmount(e.target.value))}
 * ```
 *
 * `Number.parseFloat('1.')` is `1`, so the instant the user typed the decimal
 * point the parent was handed `1`, the field re-rendered as `"1"`, and the
 * point vanished from under the caret. A leading `0` collapsed to `''` and
 * disappeared outright. **Only whole token units could ever be entered** — on
 * both twins, in the one component whose submit hands a value to a chain
 * transaction. A user swapping 0.25 types `0`, sees nothing, types `.`, sees
 * nothing, types `2`, and submits **2**.
 *
 * The fix is the standard one: hold the draft as text, emit the parsed number,
 * and only overwrite the draft when the parent's value genuinely disagrees
 * with what is on screen — so an external change still wins, and the user's
 * own half-typed decimal does not get stamped on.
 */
export declare function useAmountField(value: number, onChange?: (next: number) => void, maxDecimals?: number): {
    text: string;
    setText: (raw: string) => void;
};
/**
 * Split a signed change into its three cues, so direction is never colour
 * alone **and** never contradicts itself.
 *
 * The base built its spoken label as
 * `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` `` — and
 * `formatPct` re-applies a sign, so a loss announced as **"down +3.20%"**.
 * `>= 0` also sent a flat `0` down the "up" branch while the glyph drawn
 * beside it was `•` and the tone was muted: the spoken direction contradicted
 * the drawn one.
 */
export interface ChangeParts {
    /** `'up' | 'down' | 'flat'` — never colour alone. */
    direction: 'up' | 'down' | 'flat';
    /** The word for the direction, overridable by the caller. */
    word: string;
    /** ▲ / ▼ / • */
    glyph: string;
    /** `success` / `danger` / `neutral` — the *tone*, resolved to ink by the caller. */
    tone: 'success' | 'danger' | 'neutral';
}
export declare function changeParts(delta: number | undefined, words?: {
    up?: string;
    down?: string;
    flat?: string;
}): ChangeParts;
//# sourceMappingURL=amount-v4.d.ts.map
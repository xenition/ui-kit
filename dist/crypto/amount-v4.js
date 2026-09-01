"use strict";
/**
 * Typing an amount — **pure, and shared by both twins**, the way
 * `calendar/layout-v4.ts` and `booking/schedule-v4.ts` are. The native twin
 * imports it as `../../crypto/amount-v4`.
 *
 * Nothing here is exported from the package.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeAmountText = sanitizeAmountText;
exports.amountValue = amountValue;
exports.sameAmount = sameAmount;
exports.useAmountField = useAmountField;
exports.changeParts = changeParts;
const React = __importStar(require("react"));
/**
 * Sanitise a typed amount to something a person can actually type.
 *
 * Keeps digits and **one** decimal separator, drops everything else, and
 * caps the fraction. Crucially it returns the *text*, because a half-typed
 * amount — `"0"`, `"1."`, `"0.30"` — is not yet a number and must survive
 * until it is.
 */
function sanitizeAmountText(raw, maxDecimals = 18) {
    const cleaned = raw.replace(/[^0-9.]/g, '');
    const firstDot = cleaned.indexOf('.');
    if (firstDot === -1)
        return cleaned;
    const whole = cleaned.slice(0, firstDot);
    const fraction = cleaned.slice(firstDot + 1).replace(/\./g, '').slice(0, maxDecimals);
    return `${whole}.${fraction}`;
}
/** The number a draft stands for. `"1."` and `""` are not yet amounts. */
function amountValue(text) {
    const parsed = Number.parseFloat(text);
    return Number.isFinite(parsed) ? parsed : 0;
}
/** Whether a draft and a committed number are the same amount. */
function sameAmount(text, value) {
    if (text === '' || text === '.')
        return value === 0;
    return amountValue(text) === value;
}
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
function useAmountField(value, onChange, maxDecimals = 18) {
    const [draft, setDraft] = React.useState(() => (value === 0 ? '' : String(value)));
    // Only when the parent moved somewhere the draft does not already mean.
    if (!sameAmount(draft, value)) {
        const incoming = value === 0 ? '' : String(value);
        if (incoming !== draft)
            setDraft(incoming);
    }
    const setText = React.useCallback((raw) => {
        const next = sanitizeAmountText(raw, maxDecimals);
        setDraft(next);
        onChange?.(amountValue(next));
    }, [maxDecimals, onChange]);
    return { text: draft, setText };
}
function changeParts(delta, words = {}) {
    const safe = Number.isFinite(delta) ? delta : 0;
    if (safe > 0) {
        return { direction: 'up', word: words.up ?? 'up', glyph: '▲', tone: 'success' };
    }
    if (safe < 0) {
        return { direction: 'down', word: words.down ?? 'down', glyph: '▼', tone: 'danger' };
    }
    // Flat is not "up". The base called it up and drew it muted.
    return { direction: 'flat', word: words.flat ?? 'unchanged', glyph: '•', tone: 'neutral' };
}
//# sourceMappingURL=amount-v4.js.map
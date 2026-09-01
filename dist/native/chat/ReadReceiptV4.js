"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadReceiptV4 = ReadReceiptV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const thread_v4_1 = require("./internal/thread-v4");
/**
 * **V4 read receipt** — same props as {@link ReadReceipt} plus `scale`,
 * `onRetry`, `retryLabel` and `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **A failed send is actionable.** See `onRetry` — this is the one state
 *    in the component that asks something of the user, and the base drew it
 *    exactly as passively as `sent`.
 * 2. **It reports as a status, not an image.** `accessibilityRole="image"` on
 *    a delivery state is simply the wrong role.
 * 3. **`failed` announces assertively**, the rest politely — a receipt that
 *    interrupts on every message trains a user to ignore it.
 * 4. **The ink is the contrast-corrected slot**, where the base used `muted`,
 *    which carries no promise, for three of the five states.
 */
function ReadReceiptV4({ status = 'sent', size, scale = 'sm', onRetry, retryLabel = 'Retry', statusLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const meta = thread_v4_1.RECEIPT_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const fontSize = size ?? (0, thread_v4_1.chatSize)(theme, scale) + tokens.spacing.xs;
    const failed = status === 'failed';
    const glyph = ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { allowFontScaling: false, style: { fontSize, lineHeight: fontSize * 1.2, color: (0, thread_v4_1.toneInk)(theme, meta.tone) }, children: meta.glyph }));
    if (failed && onRetry) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${word}. ${retryLabel}`, onPress: onRetry, style: ({ pressed }) => [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                    paddingHorizontal: tokens.spacing.xs,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                },
                style,
            ], children: [glyph, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "dangerText", children: retryLabel })] }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", 
        // A failed send interrupts; the other four do not. A receipt that
        // interrupts on every message teaches the user to ignore it.
        accessibilityLiveRegion: failed ? 'assertive' : 'polite', accessibilityLabel: word, style: style, children: glyph }));
}
//# sourceMappingURL=ReadReceiptV4.js.map
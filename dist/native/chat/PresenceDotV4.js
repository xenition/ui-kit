"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceDotV4 = PresenceDotV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const thread_v4_1 = require("./internal/thread-v4");
/** The ring's width, as a fraction of the dot. Geometric. */
const RING_RATIO = 0.34;
/**
 * **V4 presence dot** — same props as {@link PresenceDot} plus `scale` and
 * `showLabel`.
 *
 * ## Three changes
 *
 * 1. **It can carry its word.** See `showLabel`.
 * 2. **It always has a name.** The base announced nothing unless the caller
 *    passed `label`, so the default rendering was a decorative circle.
 * 3. **`away` stops borrowing `warn`.** Stepping away is not a caution;
 *    `busy` keeps `danger` because "do not disturb" is genuinely a stop.
 */
function PresenceDotV4({ status = 'offline', size, scale = 'sm', ring = false, label, showLabel = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const meta = thread_v4_1.PRESENCE_META[status];
    const word = label ?? meta.label;
    const diameter = size ?? (0, thread_v4_1.chatSize)(theme, scale);
    const dot = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: diameter,
            height: diameter,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, thread_v4_1.toneFill)(theme, meta.tone),
            borderWidth: ring ? Math.max(1, Math.round(diameter * RING_RATIO) / 2) : 0,
            borderColor: colors.surface,
        } }));
    if (!showLabel) {
        // Always named, even without the word: the base's default rendering was a
        // circle a screen reader skipped entirely.
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: word, style: style, children: dot }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: word, style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
            style,
        ], children: [dot, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: meta.tone === 'success' ? 'successText' : 'mutedText', children: word })] }));
}
//# sourceMappingURL=PresenceDotV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRowV3 = TokenRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./internal/format");
/** Change → contrast-safe TEXT slot (gains `successText`, losses `dangerText`). */
function changeToneTextKey(delta) {
    const safe = Number.isFinite(delta) ? delta : 0;
    if (safe > 0)
        return 'successText';
    if (safe < 0)
        return 'dangerText';
    return 'muted';
}
/**
 * TokenRow, redesigned (v3): a **dense one-line quote**. A bold ticker leads, the
 * held quantity fills the middle (fixed precision — no float drift), and the 24h
 * change is pinned right in the contrast-safe `successText`/`dangerText` slot
 * with a ▲/▼ glyph so it is never color-only. No disc, no card, no sparkline —
 * a compact ticker line that packs many rows on screen. Distinct at a glance
 * from v1's 40px-disc list and v2's card. Same props.
 */
function TokenRowV3({ symbol, amount, decimals = 4, changePct, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasChange = changePct != null;
    const textTone = changeToneTextKey(changePct ?? 0);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { width: 68, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: symbol }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    flex: 1,
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontVariant: ['tabular-nums'],
                }, children: (0, format_1.formatToken)(amount, { decimals, symbol }) }), hasChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityLabel: `${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct ?? 0))}`, style: {
                    color: colors[textTone],
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                    fontVariant: ['tabular-nums'],
                    textAlign: 'right',
                    minWidth: 78,
                }, children: [(0, format_1.changeGlyph)(changePct ?? 0), " ", (0, format_1.formatPct)(changePct ?? 0)] })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${symbol} holding`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: body }));
}
//# sourceMappingURL=TokenRowV3.js.map
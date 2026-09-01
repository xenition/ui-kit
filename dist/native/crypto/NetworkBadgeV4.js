"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkBadgeV4 = NetworkBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const market_v4_1 = require("./internal/market-v4");
/** Health is genuinely a status, so it is genuinely the status tones. */
const STATUS_TONE = {
    connected: 'success',
    congested: 'warn',
    disconnected: 'danger',
};
const STATUS_WORD = {
    connected: 'Connected',
    congested: 'Congested',
    disconnected: 'Offline',
};
/**
 * **V4 network badge** — same props as {@link NetworkBadge} plus
 * `statusLabels`, with `tone` narrowed to the union its web twin already had.
 *
 * ## Three changes
 *
 * 1. **The health word carries the health.** Native drew `Congested` in
 *    `muted` — a ramp step with no contrast promise and no meaning — so the
 *    signal lived entirely in an 8px dot, and only the web twin put it in
 *    text. The word now takes its status ink, which is the same reading on
 *    both platforms.
 * 2. **`tone` is one union across the twins.** See {@link NetworkBadgeV4Tone}.
 * 3. **Nothing is off the scale.** `paddingVertical: 2` and `gap: 3` were
 *    invented numbers; the pill is now composed from `spacing`, its ground is
 *    `card` rather than a raw ramp index, and the two dots — which say nothing
 *    a reader cannot already hear in the name — are hidden from the reader.
 */
function NetworkBadgeV4({ name, status, tone = 'primary', glyph, size = 'md', statusLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const textKey = size === 'sm' ? 'xs' : 'sm';
    // The same expression `BadgeV4` sizes its dot with, so a chain pill and a
    // status badge beside it carry the same mark rather than two near-identical
    // circles.
    const dotSize = size === 'sm' ? tokens.spacing.sm * 0.75 : tokens.spacing.sm;
    const statusWord = status ? (statusLabels?.[status] ?? STATUS_WORD[status]) : undefined;
    const statusTone = status ? STATUS_TONE[status] : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: (0, market_v4_1.spokenLine)([name, statusWord]), style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.full,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: [glyph != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: textKey, style: { color: colors[tone] }, children: glyph })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: dotSize,
                    height: dotSize,
                    borderRadius: dotSize / 2,
                    backgroundColor: colors[tone],
                } })), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: textKey, weight: "semibold", tone: "onCard", numberOfLines: 1, children: name }), statusTone !== undefined && statusWord !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            width: dotSize,
                            height: dotSize,
                            borderRadius: dotSize / 2,
                            backgroundColor: (0, market_v4_1.toneFill)(theme, statusTone),
                        } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: (0, market_v4_1.toneInk)(theme, statusTone) }, children: statusWord })] })) : null] }));
}
//# sourceMappingURL=NetworkBadgeV4.js.map
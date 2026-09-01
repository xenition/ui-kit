"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldCardV4 = FieldCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const farm_v4_1 = require("./internal/farm-v4");
/** Status → tone and default label. Domain knowledge, so it stays here. */
const STATUS_META = {
    planted: { label: 'Planted', tone: 'success' },
    fallow: { label: 'Fallow', tone: 'neutral' },
    harvested: { label: 'Harvested', tone: 'primary' },
    preparing: { label: 'Preparing', tone: 'warn' },
};
/**
 * **V4 field card** — same props as {@link FieldCard} plus `statusLabels` and
 * `formatArea`.
 *
 * ## Four changes
 *
 * 1. **Press is a state layer**, not `opacity: 0.85` on the card's content —
 *    which is the signal M3 spends 0.38 on to mean *disabled*.
 * 2. **Type comes from `TextV4`, and captions take `mutedText`** — the slot
 *    with a contrast promise, rather than the `muted` ramp step the base used
 *    as ink three times.
 * 3. **The area is formatted, not concatenated.** See `formatArea`.
 * 4. **The card is `CardV4`'s raised ground.** In a scrolling list on a dark
 *    page the base had only its border to separate it from the page.
 *
 * `variant="compact"` still drops the secondary line. **Renders nothing
 * without a `name`** (§4.5).
 */
function FieldCardV4({ name, area, areaUnit = 'ha', crop, soilType, location, status = 'planted', icon = '🗺️', variant = 'detailed', statusLabels, formatArea, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const meta = STATUS_META[status];
    const label = statusLabels?.[status] ?? meta.label;
    const detailed = variant === 'detailed';
    const format = formatArea ?? ((a, u) => (u ? `${a} ${u}` : String(a)));
    const areaText = area != null ? format(area, areaUnit) : null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: detailed ? '2xl' : 'xl' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), areaText ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", numberOfLines: 1, children: areaText })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })] }), detailed && (crop != null || soilType != null || location != null) ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: { marginTop: tokens.spacing.sm }, children: (0, farm_v4_1.metaLine)([crop, soilType, location]) })) : null] }));
    if (!onPress)
        return (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: [name, areaText, label].filter(Boolean).join(', '), onPress: onPress, style: ({ pressed }) => ({
            borderRadius: tokens.radius.lg,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body }) }));
}
//# sourceMappingURL=FieldCardV4.js.map
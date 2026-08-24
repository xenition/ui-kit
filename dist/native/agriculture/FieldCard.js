"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldCard = FieldCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    planted: { label: 'Planted', tone: 'success' },
    fallow: { label: 'Fallow', tone: 'neutral' },
    harvested: { label: 'Harvested', tone: 'primary' },
    preparing: { label: 'Preparing', tone: 'warn' },
};
function Meta({ glyph, text, color }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors[color], fontSize: tokens.typography.scale.xs }, children: [glyph, " ", text] }));
}
/**
 * A field / parcel summary card — glyph, name, an area figure, and a cultivation
 * {@link Badge} whose text label (not color alone) carries the status. The
 * `detailed` variant adds crop / soil / location meta rows; `compact` keeps just
 * the header. Tappable via `onPress` (exposed as an accessible button).
 * Token-bound throughout — no literal colors.
 */
function FieldCard({ name, area, areaUnit = 'ha', crop, soilType, location, status = 'planted', icon = '🌾', variant = 'detailed', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const detailed = variant === 'detailed';
    const Body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: onPress ? 'interactive' : 'outlined', style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "xl", color: "accent" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: name }), area != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [String(area), " ", areaUnit] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }), detailed ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md }, children: [crop != null ? (0, jsx_runtime_1.jsx)(Meta, { glyph: "\uD83C\uDF31", text: crop, color: "onSurface" }) : null, soilType != null ? (0, jsx_runtime_1.jsx)(Meta, { glyph: "\uD83E\uDEA8", text: soilType, color: "muted" }) : null, location != null ? (0, jsx_runtime_1.jsx)(Meta, { glyph: "\uD83D\uDCCD", text: location, color: "muted" }) : null] })) : null] }));
    if (!onPress)
        return Body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }], children: Body }));
}
//# sourceMappingURL=FieldCard.js.map
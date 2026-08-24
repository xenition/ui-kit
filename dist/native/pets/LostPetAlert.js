"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostPetAlert = LostPetAlert;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    lost: { label: 'Lost', tone: 'danger', slot: 'danger', glyph: '🚨' },
    sighted: { label: 'Sighted', tone: 'warn', slot: 'warn', glyph: '👀' },
    found: { label: 'Found', tone: 'success', slot: 'success', glyph: '🎉' },
    reunited: { label: 'Reunited', tone: 'success', slot: 'success', glyph: '🏠' },
};
/** Token-derived translucent tint (no literal hex; mirrors GlassPanel). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * A high-visibility lost-pet alert banner: status chip + icon, pet name, last-
 * seen location/time, reward, and a static map placeholder (a real map needs a
 * native maps dep this kit doesn't bundle). Exposes report-sighting + share
 * actions for active alerts. Uses `alert` a11y role and conveys status by icon +
 * label, not color alone. Tint is a token color at reduced alpha — no literals.
 */
function LostPetAlert({ name, status, lastSeen, lastSeenAt, reward, description, contact, showMap = true, reportLabel = 'Report sighting', onReportSighting, onShare, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const accent = colors[meta.slot];
    const active = status !== 'reunited' && status !== 'found';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${meta.label}: ${name}${lastSeen ? `, last seen ${lastSeen}` : ''}`, style: [
            {
                backgroundColor: withAlpha(accent, 0.1),
                borderColor: accent,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), lastSeenAt ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: lastSeenAt })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "solid", size: "sm", children: meta.label })] }), lastSeen ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: ["\uD83D\uDCCD Last seen: ", lastSeen] })) : null, showMap ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    height: 120,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: "\uD83D\uDDFA\uFE0F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Map preview" })] })) : null, description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, reward || contact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }, children: [reward ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: ["Reward ", reward] })) : null, contact ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: ["\u260E ", contact] })) : null] })) : null, onReportSighting || onShare ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [active && onReportSighting ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", tone: "danger", onPress: onReportSighting, children: reportLabel }) })) : null, onShare ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onPress: onShare, children: "Share" }) })) : null] })) : null] }));
}
//# sourceMappingURL=LostPetAlert.js.map
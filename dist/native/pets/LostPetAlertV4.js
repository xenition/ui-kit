"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostPetAlertV4 = LostPetAlertV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    lost: { label: 'Lost', tone: 'danger', slot: 'danger', glyph: '🚨' },
    sighted: { label: 'Sighted', tone: 'warn', slot: 'warn', glyph: '👀' },
    found: { label: 'Found', tone: 'success', slot: 'success', glyph: '🎉' },
    reunited: { label: 'Reunited', tone: 'success', slot: 'success', glyph: '🏠' },
};
/**
 * LostPetAlert — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a lost-pet alert: an elevated rounded card with a soft
 * shadow (no gradient) whose urgency is carried by a status-toned soft surface
 * accent — a token-colored left edge + reduced-alpha tint on the glyph well — plus
 * a labelled status Badge + glyph (danger for lost, etc.), never color alone. Uses
 * the `alert` a11y role, keeps the static map placeholder, and preserves the
 * report-sighting + share actions for active alerts. Same props/behavior as
 * {@link LostPetAlertProps}. Token-only colors via `useXenitionTheme()`.
 */
function LostPetAlertV4({ name, status, lastSeen, lastSeenAt, reward, description, contact, showMap = true, reportLabel = 'Report sighting', onReportSighting, onShare, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const accent = colors[meta.slot];
    const active = status !== 'reunited' && status !== 'found';
    const chipStyle = {
        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
        borderRadius: tokens.radius.full,
        paddingHorizontal: tokens.spacing.sm,
        paddingVertical: 2,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${meta.label}: ${name}${lastSeen ? `, last seen ${lastSeen}` : ''}`, style: [
            {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                borderLeftWidth: 4,
                borderLeftColor: accent,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.1),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), lastSeenAt ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: lastSeenAt })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }), lastSeen ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: ["\uD83D\uDCCD Last seen: ", lastSeen] })) : null, showMap ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    height: 120,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: "\uD83D\uDDFA\uFE0F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Map preview" })] })) : null, description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, reward || contact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: [reward ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: chipStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: ["\uD83C\uDFC5 Reward ", reward] }) })) : null, contact ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: chipStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: ["\u260E ", contact] }) })) : null] })) : null, onReportSighting || onShare ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [active && onReportSighting ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", tone: "danger", onPress: onReportSighting, children: reportLabel }) })) : null, onShare ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onPress: onShare, children: "Share" }) })) : null] })) : null] }));
}
//# sourceMappingURL=LostPetAlertV4.js.map
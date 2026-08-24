"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatterStatus = MatterStatus;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * Stage tracker for a legal matter: a segmented progress meter across the
 * intake → active → discovery → trial → settlement → closed workflow, with the
 * current stage as a glyph + word pill (never color alone). Segments up to and
 * including the current stage fill with the primary token; the rest use the
 * border token. All colors are theme tokens — no literals.
 */
function MatterStatus({ title, stage, progressPct, opened, attorney, variant = 'default', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const currentIndex = Math.max(0, internal_1.MATTER_STAGE_ORDER.indexOf(stage));
    const total = internal_1.MATTER_STAGE_ORDER.length;
    const derivedPct = (0, internal_1.clampPct)(progressPct ?? Math.round(((currentIndex + 1) / total) * 100));
    const stageMeta = internal_1.MATTER_STAGE_META[stage];
    const fillColor = (0, internal_1.toneColor)(colors, stageMeta.tone);
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title })) : null, !compact && (opened || attorney) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [opened, attorney].filter(Boolean).join(' · ') })) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: stageMeta, size: "sm" })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: derivedPct }, accessibilityLabel: `${stageMeta.label}, ${derivedPct}% complete`, style: { flexDirection: 'row', gap: 3 }, children: internal_1.MATTER_STAGE_ORDER.map((s, i) => {
                    const done = i <= currentIndex;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flex: 1,
                            height: 6,
                            borderRadius: tokens.radius.full,
                            backgroundColor: done ? fillColor : colors.border,
                        } }, s));
                }) }), !compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Stage ", currentIndex + 1, " of ", total, " \u00B7 ", derivedPct, "%"] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Matter ${title ?? stageMeta.label}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=MatterStatus.js.map
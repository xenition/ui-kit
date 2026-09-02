"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatterStatusV4 = MatterStatusV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GradientSurface_1 = require("./internal/GradientSurface");
const chambers_1 = require("./internal/chambers");
const internal_1 = require("./internal");
/**
 * MatterStatus — **V4** "chambers" design (native twin of the web V4), and the
 * ONE reserved gradient moment of the legal V4 "chambers" line: the header
 * (matter title, current stage glyph + word, and a frosted "Stage N of 6" chip)
 * rides a rounded, overflow-hidden `GradientSurface` on the brand gradient
 * (`chambersGradient`) in near-white ink (`chambersInk` / `chambersInkSoft`). The
 * body — the segmented **intake → active → discovery → trial → settlement →
 * closed** meter — stays on the plain surface: segments up to the current stage
 * fill with the stage tone token, the rest use the border token. Status is
 * carried by glyph + stage word, never color alone; exposes an ARIA
 * `progressbar`. Reuses the base `variant` (`default` / `compact`). Token-only
 * colors via `useXenitionTheme()` + the chambers ramp helpers, dark-mode safe.
 */
function MatterStatusV4({ title, stage, progressPct, opened, attorney, variant = 'default', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, chambers_1.chambersInk)(r);
    const inkSoft = (0, chambers_1.chambersInkSoft)(r);
    const compact = variant === 'compact';
    const currentIndex = Math.max(0, internal_1.MATTER_STAGE_ORDER.indexOf(stage));
    const total = internal_1.MATTER_STAGE_ORDER.length;
    const derivedPct = (0, internal_1.clampPct)(progressPct ?? Math.round(((currentIndex + 1) / total) * 100));
    const stageMeta = internal_1.MATTER_STAGE_META[stage];
    const fillColor = (0, internal_1.toneColor)(colors, stageMeta.tone);
    const shell = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        overflow: 'hidden',
    };
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [shell, style], children: [(0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, chambers_1.chambersGradient)(r), style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm, paddingHorizontal: compact ? tokens.spacing.md : tokens.spacing.lg, paddingVertical: compact ? tokens.spacing.sm : tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [title ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: stageMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: stageMeta.label })] }), !compact && (opened || attorney) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: [opened, attorney].filter(Boolean).join('  ·  ') })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: (0, chambers_1.chambersTile)(r), borderWidth: 1, borderColor: (0, chambers_1.chambersBorder)(r) }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: ["Stage ", currentIndex + 1, " of ", total] }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: derivedPct }, accessibilityLabel: `${stageMeta.label}, ${derivedPct}% complete`, style: { flexDirection: 'row', gap: 3 }, children: internal_1.MATTER_STAGE_ORDER.map((s, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 8, borderRadius: tokens.radius.full, backgroundColor: i <= currentIndex ? fillColor : colors.border } }, s))) }), !compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: ["Stage ", currentIndex + 1, " of ", total, " \u00B7 ", derivedPct, "%"] })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Matter ${title ?? stageMeta.label}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=MatterStatusV4.js.map
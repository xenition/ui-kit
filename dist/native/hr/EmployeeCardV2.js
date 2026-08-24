"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeCardV2 = EmployeeCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * EmployeeCard, design **V2** — a banner-header profile card. A tone-tinted
 * banner (derived from the employee's status, never color alone) sits above an
 * overlapping avatar; name, title and department stack below, followed by
 * employment / status word-pills and a full row of tappable contact actions.
 * Same Props as {@link EmployeeCard}, so it swaps in with no call-site change.
 * Elevated + mount-fade; token-pure (no literal colors).
 */
function EmployeeCardV2({ name, title, department, avatarUrl, employmentType, status, location, startDate, actions, loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const bannerTone = status ? (0, internal_1.toneColor)(colors, internal_1.EMPLOYEE_STATUS_META[status].tone) : colors.primary;
    const card = ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
            {
                opacity: enter.opacity,
                transform: enter.transform,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                overflow: 'hidden',
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading employee", style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 48, borderRadius: tokens.radius.md, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 52, backgroundColor: (0, color_1.withAlpha)(bannerTone, 0.16) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.md, paddingBottom: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: -26, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "xl", name: name, src: avatarUrl, ring: true, style: { borderWidth: 3, borderColor: colors.surface } }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EMPLOYEE_STATUS_META[status], size: "sm", style: { marginBottom: tokens.spacing.xs } }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), title || department ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [title, department].filter(Boolean).join(' · ') })) : null] }), employmentType || location || startDate ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }, children: [employmentType ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EMPLOYMENT_META[employmentType], variant: "soft", size: "sm" }) : null, location ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", location] })) : null, startDate ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Since ", startDate] })) : null] })) : null, actions && actions.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs / 2 }, children: actions.map((a) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a.label, onPress: a.onPress, style: ({ pressed }) => ({
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: tokens.spacing.xs / 2,
                                    paddingVertical: tokens.spacing.xs,
                                    borderRadius: tokens.radius.md,
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, pressed ? 0.2 : 0.1),
                                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: a.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: a.label })] }, a.key))) })) : null] })] })) }));
    if (onPress && !loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Employee ${name}`, onPress: onPress, testID: testID, children: card }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: card });
}
//# sourceMappingURL=EmployeeCardV2.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolunteerShift = VolunteerShift;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
/**
 * A volunteer-shift row: role, date/time/location meta, a slots-filled meter,
 * and a sign-up / cancel action. Capacity fill is guarded against a zero
 * capacity and clamped. Full shifts are badged and the action is disabled;
 * signed-up state is announced via `accessibilityState.selected` on the button —
 * not color alone. All colors come from the compiled theme tokens — no literal
 * colors.
 */
function VolunteerShift({ role, date, time, location, filled = 0, capacity = 0, signedUp = false, onSignUp, onCancel, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasCapacity = capacity > 0;
    const isFull = hasCapacity && filled >= capacity && !signedUp;
    const pct = (0, internal_1.goalPct)(filled, capacity);
    const metaLine = [date, time].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: role }), signedUp ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: "Signed up" }) : isFull ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "danger", children: "Full" }) : null] }), metaLine ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDDD3\uFE0F", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaLine })] })) : null, location ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCCD", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: location })] })) : null, hasCapacity ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: capacity, now: Math.min(filled, capacity) }, accessibilityLabel: `${filled} of ${capacity} volunteers`, style: { width: '100%', height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: `${pct}%`, backgroundColor: isFull ? colors.danger : colors.primary, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${filled} of ${capacity} spots filled` })] })) : null, signedUp ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", tone: "danger", loading: loading, accessibilityState: { selected: true }, onPress: onCancel, children: "Cancel shift" })) : ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", disabled: isFull, loading: loading, accessibilityState: { selected: false }, onPress: onSignUp, children: isFull ? 'Shift full' : 'Sign up' }))] }));
}
//# sourceMappingURL=VolunteerShift.js.map
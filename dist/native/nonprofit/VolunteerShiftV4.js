"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolunteerShiftV4 = VolunteerShiftV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * VolunteerShift — **V4** "rally" design. The warm, mission-driven take on a
 * volunteer-shift row: an elevated rounded row (soft shadow, clean surface — no
 * gradient) with a leading calendar glyph in a soft-primary well, a bold role
 * title, muted date/time/location meta, a slots-filled meter, and a primary
 * sign-up / outline cancel CTA. Status is read via a glyph + a labelled Badge +
 * token color (never color alone): a signed-up viewer gets a success "Signed
 * up" badge, a full shift a danger "Full" badge with the action disabled; the
 * signed-up state is also announced via `accessibilityState.selected` on the
 * button. Honors every prop of {@link VolunteerShiftProps}; capacity fill is
 * guarded and clamped. Token-only colors via `useXenitionTheme()`.
 */
function VolunteerShiftV4({ role, date, time, location, filled = 0, capacity = 0, signedUp = false, onSignUp, onCancel, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasCapacity = capacity > 0;
    const isFull = hasCapacity && filled >= capacity && !signedUp;
    const pct = (0, internal_1.goalPct)(filled, capacity);
    const metaLine = [date, time].filter(Boolean).join(' · ');
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDE4C", size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: role }), signedUp ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: "Signed up" }) : isFull ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "danger", children: "Full" }) : null] }), metaLine ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDDD3\uFE0F", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaLine })] })) : null, location ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCCD", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: location })] })) : null, hasCapacity ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: capacity, now: Math.min(filled, capacity) }, accessibilityLabel: `${filled} of ${capacity} volunteers`, style: { width: '100%', height: 6, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.15), overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: `${pct}%`, backgroundColor: isFull ? colors.danger : colors.primary, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${filled} of ${capacity} spots filled` })] })) : null, signedUp ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", tone: "danger", loading: loading, accessibilityState: { selected: true }, onPress: onCancel, children: "Cancel shift" })) : ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", disabled: isFull, loading: loading, accessibilityState: { selected: false }, onPress: onSignUp, children: isFull ? 'Shift full' : 'Sign up' }))] })] }));
}
//# sourceMappingURL=VolunteerShiftV4.js.map
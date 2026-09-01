"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderCard = ReminderCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const Icon_1 = require("../primitives/Icon");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
/**
 * ReminderCard — a single daily reminder on a clean card: a small gradient clock
 * badge (the one spot of color), the reminder label and its time, and a `Switch`
 * to arm or silence it. The card itself stays calm (surface + border); the
 * badge's gradient and near-white ink both derive from the brand ramp. On/off
 * is carried by the switch's own state, not by color. Token-only colors.
 */
function ReminderCard({ label, time, enabled = false, onToggle, glyph = '⏰', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", style: { color: (0, calm_1.calmInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: time })] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: enabled, onChange: (next) => onToggle?.(next), accessibilityLabel: `${label} reminder at ${time}` })] }));
}
//# sourceMappingURL=ReminderCard.js.map
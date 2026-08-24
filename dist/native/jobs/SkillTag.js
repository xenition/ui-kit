"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillTag = SkillTag;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** [background, foreground] semantic slots per variant — tokens only. */
const VARIANT = {
    default: ['border', 'onSurface'],
    matched: ['success', 'onSuccess'],
    missing: ['danger', 'onDanger'],
};
/** A non-color signal so variant is not conveyed by color alone. */
const MARKER = {
    default: '',
    matched: '✓ ',
    missing: '! ',
};
/**
 * A skill / keyword chip for job cards and résumé matching. Mirrors the
 * primitive `Tag` shape but adds a jobs-specific `variant` axis (`matched` /
 * `missing`) that pairs a token color with a leading glyph marker — so the
 * meaning survives for color-blind users and in monochrome. Optionally pressable
 * (`onPress`) and removable (`onRemove`). No literal colors.
 */
function SkillTag({ label, variant = 'default', selected = false, onPress, onRemove, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [bg, fg] = VARIANT[variant];
    const marker = MARKER[variant];
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: colors[bg],
                borderRadius: tokens.radius.sm,
                borderWidth: selected ? 2 : 0,
                borderColor: selected ? colors.primary : 'transparent',
                paddingVertical: 3,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: [marker, label] }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${label}`, onPress: onRemove, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "\u00D7" }) })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=SkillTag.js.map
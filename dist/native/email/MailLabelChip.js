"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailLabelChip = MailLabelChip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const tint_1 = require("./tint");
const TONE_SLOT = {
    neutral: 'muted',
    primary: 'primary',
    accent: 'accent',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
const ON_SLOT = {
    primary: 'onPrimary',
    accent: 'onAccent',
    success: 'onSuccess',
    warn: 'onWarn',
    danger: 'onDanger',
};
/**
 * A colored label / category chip for mail (Gmail-style labels). `tone` selects
 * a semantic slot and `variant` picks a fill: `soft` tints the tone, `solid`
 * fills it, `outline` rings it — every color resolved from a token (soft fills
 * use a token-derived alpha). Optionally removable via `onRemove`. No literal
 * colors.
 */
function MailLabelChip({ label, tone = 'neutral', variant = 'soft', glyph, onRemove, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = colors[TONE_SLOT[tone]];
    const onAccent = colors[ON_SLOT[tone] ?? 'onSurface'];
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const bg = solid ? accent : outline ? 'transparent' : (0, tint_1.withAlpha)(accent, 0.16);
    const fg = solid ? onAccent : accent;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                alignSelf: 'flex-start',
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.full,
                backgroundColor: bg,
                borderWidth: outline ? 1 : 0,
                borderColor: outline ? accent : 'transparent',
            },
            style,
        ], children: [glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xs", color: solid ? (ON_SLOT[tone] ?? 'onSurface') : TONE_SLOT[tone] }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove label ${label}`, onPress: onRemove, hitSlop: 6, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u00D7", size: "sm", color: solid ? (ON_SLOT[tone] ?? 'onSurface') : TONE_SLOT[tone] }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Label ${label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }));
    }
    return body;
}
//# sourceMappingURL=MailLabelChip.js.map
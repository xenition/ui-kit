"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = Tag;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Every tone pairs a background with the `on*` colour compiled for THAT
 * background.
 *
 * This map used to carry `onPrimary` as the foreground for success, warn and
 * danger, kept for historical reasons. The compiler only guarantees WCAG AA
 * between a colour and its own partner — `onPrimary` on `primary`, `onDanger`
 * on `danger` — so pairing `onPrimary` with `danger` guarantees nothing, and a
 * rendered audit measured it at 2.30:1 against the danger fill.
 *
 * `warn` was also filled with `accent` rather than `warn`, which made the
 * warning tone render in the brand's secondary colour. A semantic colour has to
 * mean what it says.
 *
 * Badge's identical map already had all of this right; the two now agree.
 */
const TONE = {
    neutral: { solidBg: 'border', solidFg: 'onSurface', accent: 'onSurface', text: 'onSurface' },
    primary: { solidBg: 'primary', solidFg: 'onPrimary', accent: 'primary', text: 'primaryText' },
    success: { solidBg: 'success', solidFg: 'onSuccess', accent: 'success', text: 'successText' },
    warn: { solidBg: 'warn', solidFg: 'onWarn', accent: 'warn', text: 'warnText' },
    danger: { solidBg: 'danger', solidFg: 'onDanger', accent: 'danger', text: 'dangerText' },
    accent: { solidBg: 'accent', solidFg: 'onAccent', accent: 'accent', text: 'accentText' },
};
const SIZE = {
    sm: { padV: 1, padKey: 'xs', text: 'xs' },
    md: { padV: 2, padKey: 'sm', text: 'xs' },
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
 * Removable chip/tag — the native mirror of the web `Tag`. Token-bound per tone;
 * the default (`neutral`, `solid`, `md`) renders exactly as before. Additive:
 * `accent` tone, `soft`/`outline` variants, `sm` size, a leading `dot`, and a
 * `removable` flag (× also shows whenever `onRemove` is set). No literal colors.
 */
function Tag({ tone = 'neutral', variant = 'solid', size = 'md', removable = false, dot = false, onRemove, style, children, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const slots = TONE[tone];
    const accentColor = colors[slots.accent];
    const textColor = colors[slots.text];
    const sz = SIZE[size];
    let bg;
    let fg;
    let borderWidth = 0;
    let borderColor = 'transparent';
    if (variant === 'solid') {
        bg = colors[slots.solidBg];
        fg = colors[slots.solidFg];
    }
    else if (variant === 'soft') {
        bg = withAlpha(accentColor, 0.14);
        fg = textColor;
    }
    else {
        bg = 'transparent';
        fg = textColor;
        borderWidth = 1;
        borderColor = accentColor;
    }
    const showRemove = removable || onRemove != null;
    const dotSize = size === 'sm' ? 6 : 8;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: bg,
                borderWidth,
                borderColor,
                borderRadius: tokens.radius.sm,
                paddingVertical: sz.padV,
                paddingHorizontal: tokens.spacing[sz.padKey],
            },
            style,
        ], children: [dot ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: dotSize,
                    height: dotSize,
                    borderRadius: dotSize / 2,
                    backgroundColor: fg,
                } })) : null, typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale[sz.text], fontWeight: '500' }, children: children })) : (children), showRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Remove", onPress: onRemove, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale[sz.text], fontWeight: '500' }, children: "\u00D7" }) })) : null] }));
}
//# sourceMappingURL=Tag.js.map
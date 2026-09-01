"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChordChipV4 = ChordChipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * ChordChip — **V4** "session" design (native parity of the web V4). The clean,
 * tactile chord chip: a rounded token pill where `solid` is a strong accent fill
 * with on-accent text, `soft` is a soft accent tint, and `outline` is a bordered
 * surface. `size` (`sm` / `md` / `lg`) scales padding + text on its own chip
 * scale. A selected chip adds an accent ring (border) + a leading `♪` marker
 * (never color alone) and heavier weight. Tappable when `onPress` is given
 * (fires with the chord), static otherwise. Identical props/behavior to
 * {@link ChordChipProps}; the accent is preserved via `colors[color]` slot
 * resolution + `withAlpha` tints (no literal colors, no gradient).
 */
const SIZE = {
    sm: { padV: 2, padKey: 'xs', text: 'xs', marker: 'xs' },
    md: { padV: 4, padKey: 'sm', text: 'sm', marker: 'sm' },
    lg: { padV: 6, padKey: 'md', text: 'base', marker: 'base' },
};
function ChordChipV4({ chord, variant = 'soft', size = 'md', selected = false, color = 'primary', disabled = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const accent = colors[color];
    const sz = SIZE[size];
    const label = (0, types_1.chordLabel)(chord);
    let bg = 'transparent';
    let fg = accent;
    let borderColor = 'transparent';
    let borderWidth = 0;
    if (variant === 'solid') {
        bg = accent;
        fg = colors.onPrimary;
    }
    else if (variant === 'soft') {
        bg = (0, types_1.withAlpha)(accent, selected ? 0.28 : 0.14);
        fg = accent;
    }
    else {
        borderWidth = selected ? 2 : 1;
        borderColor = accent;
        bg = colors.surface;
        fg = accent;
    }
    // Selected adds an accent ring (border) on the tinted / solid variants too.
    if (selected && variant !== 'outline') {
        borderWidth = 2;
        borderColor = accent;
    }
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: sz.padV,
                alignSelf: 'flex-start',
                paddingVertical: sz.padV,
                paddingHorizontal: tokens.spacing[sz.padKey],
                borderRadius: tokens.radius.lg,
                backgroundColor: bg,
                borderWidth,
                borderColor,
                opacity: disabled ? 0.5 : 1,
            },
            style,
        ], children: [selected ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: sz.marker, color: variant === 'solid' ? 'onPrimary' : color })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: fg,
                    fontSize: tokens.typography.scale[sz.text],
                    fontWeight: '700',
                }, children: label })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Chord ${label}${selected ? ', selected' : ''}`, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Chord ${label}`, accessibilityState: { selected, disabled }, disabled: disabled, onPress: () => onPress(chord), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: content }));
}
//# sourceMappingURL=ChordChipV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChordChip = ChordChip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const SIZE = {
    sm: { padV: 2, padKey: 'xs', text: 'xs' },
    md: { padV: 4, padKey: 'sm', text: 'sm' },
    lg: { padV: 6, padKey: 'md', text: 'base' },
};
/**
 * A chord label chip — a UI shell only. Renders a chord's label (from
 * `chord.label` or `root`+`quality`) as a pill; tappable when `onPress` is
 * given (fires with the chord), static otherwise. `selected` is surfaced in
 * the a11y `selected` state and a heavier ring/weight, not color alone. Accent
 * comes from a semantic token slot; no literal colors.
 */
function ChordChip({ chord, variant = 'soft', size = 'md', selected = false, color = 'primary', disabled = false, onPress, style, }) {
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
        fg = accent;
    }
    if (selected && variant !== 'outline') {
        borderWidth = 2;
        borderColor = accent;
    }
    const content = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                paddingVertical: sz.padV,
                paddingHorizontal: tokens.spacing[sz.padKey],
                borderRadius: tokens.radius.md,
                backgroundColor: bg,
                borderWidth,
                borderColor,
                opacity: disabled ? 0.5 : 1,
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                color: variant === 'solid' ? fg : fg,
                fontSize: tokens.typography.scale[sz.text],
                fontWeight: '700',
            }, children: label }) }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Chord ${label}${selected ? ', selected' : ''}`, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Chord ${label}`, accessibilityState: { selected, disabled }, disabled: disabled, onPress: () => onPress(chord), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: content }));
}
//# sourceMappingURL=ChordChip.js.map
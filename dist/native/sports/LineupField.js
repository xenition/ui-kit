"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineupField = LineupField;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * A starting-XI pitch — a STATIC, dependency-free placeholder built entirely
 * from styled `View`s: a token-bordered field with a halfway line + center
 * circle, and player tokens positioned by fractional (x, y) coordinates. No
 * image / SVG / native dependency; it renders anywhere. Home/away tint from the
 * primary/accent slots, reinforced by the shirt number + name label so a token
 * is identifiable without color. Empty `players` shows a labelled empty pitch.
 * Token-only colors.
 */
function LineupField({ players = [], formation, height = 320, onSelectPlayer, emptyLabel = 'Lineup not announced', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const pitch = {
        height,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: tokens.ramps.neutral[50],
        overflow: 'hidden',
    };
    const token = (p) => {
        const bg = p.side === 'away' ? colors.accent : colors.primary;
        const fg = p.side === 'away' ? colors.onAccent : colors.onPrimary;
        const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: 56 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: bg,
                        borderWidth: 1,
                        borderColor: colors.surface,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: p.number ?? '·' }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                        marginTop: 2,
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '600',
                        textAlign: 'center',
                    }, children: p.name })] }));
        const wrapper = {
            position: 'absolute',
            left: `${clamp01(p.x) * 100}%`,
            top: `${clamp01(p.y) * 100}%`,
            transform: [{ translateX: -28 }, { translateY: -15 }],
        };
        const a11y = `${p.name}${p.number !== undefined ? `, number ${p.number}` : ''}, ${p.side ?? 'home'}`;
        return onSelectPlayer ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: () => onSelectPlayer(p), style: wrapper, children: inner }, p.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: wrapper, children: inner }, p.id));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [formation ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: ["Formation ", formation] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Lineup pitch${formation ? `, ${formation}` : ''}`, style: pitch, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: '50%', left: 0, right: 0, height: 1, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: 64,
                            height: 64,
                            marginLeft: -32,
                            marginTop: -32,
                            borderRadius: 32,
                            borderWidth: 1,
                            borderColor: colors.border,
                        } }), players.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) })) : (players.map(token))] })] }));
}
//# sourceMappingURL=LineupField.js.map
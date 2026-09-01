"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineupFieldV4 = LineupFieldV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * LineupField — **V4** "broadcast" design. The starting XI as a matchday
 * graphic: the pitch is a soft, token-derived tinted surface (a `success` wash —
 * the grass token, never a literal green) carrying a halfway line + center
 * circle, and player tokens sit on it as bold **primary** (home) / accent (away)
 * dots with shirt number + name so a token is legible without color. Formation
 * caption and per-player tap are preserved. Same props/behavior as
 * {@link LineupFieldProps}; token-only colors via `useXenitionTheme()`.
 */
function LineupFieldV4({ players = [], formation, height = 320, onSelectPlayer, emptyLabel = 'Lineup not announced', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    // Grass — a soft-success wash derived from the token, not a literal green.
    const grassLine = (0, color_1.withAlpha)(colors.success, 0.3);
    const pitch = {
        height,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: (0, color_1.withAlpha)(colors.success, 0.1),
        overflow: 'hidden',
    };
    const token = (p) => {
        const away = p.side === 'away';
        const bg = away ? colors.accent : colors.primary;
        const fg = away ? colors.onAccent : colors.onPrimary;
        const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: 56 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: bg,
                        borderWidth: 2,
                        borderColor: colors.surface,
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: colors.onSurface,
                        shadowOpacity: 0.15,
                        shadowRadius: 3,
                        shadowOffset: { width: 0, height: 1 },
                        elevation: 2,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: p.number ?? '·' }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                        marginTop: 2,
                        paddingHorizontal: 4,
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, color_1.withAlpha)(colors.surface, 0.8),
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '700',
                        textAlign: 'center',
                        overflow: 'hidden',
                    }, children: p.name })] }));
        const wrapper = {
            position: 'absolute',
            left: `${clamp01(p.x) * 100}%`,
            top: `${clamp01(p.y) * 100}%`,
            transform: [{ translateX: -28 }, { translateY: -16 }],
        };
        const a11y = `${p.name}${p.number !== undefined ? `, number ${p.number}` : ''}, ${p.side ?? 'home'}`;
        return onSelectPlayer ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: () => onSelectPlayer(p), style: wrapper, children: inner }, p.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: wrapper, children: inner }, p.id));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [formation ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: ["Formation ", formation] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Lineup pitch${formation ? `, ${formation}` : ''}`, style: pitch, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: '50%', left: 0, right: 0, height: 1, backgroundColor: grassLine } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: 64,
                            height: 64,
                            marginLeft: -32,
                            marginTop: -32,
                            borderRadius: 32,
                            borderWidth: 1,
                            borderColor: grassLine,
                        } }), players.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) })) : (players.map(token))] })] }));
}
//# sourceMappingURL=LineupFieldV4.js.map
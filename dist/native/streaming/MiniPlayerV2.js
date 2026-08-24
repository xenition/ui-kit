"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniPlayerV2 = MiniPlayerV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * **MiniPlayer — design V2 (floating pill).** A rounded, heavily-elevated bar
 * that hovers above content, with a rounded top progress line tucked inside the
 * radius and a subtle press-scale on the whole surface. The play control's
 * accessible label reflects `state`. Same `MiniPlayerProps`; token-pure;
 * a11y-complete.
 */
function MiniPlayerV2({ track, state = 'paused', progress = 0, onPlayToggle, onNext, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const isPlaying = state === 'playing';
    const isBuffering = state === 'buffering';
    const frac = clamp01(progress);
    const press = (0, motion_1.usePressScale)(0.98);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.full,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                overflow: 'hidden',
                transform: [{ scale: press.scale }],
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: colors.border }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 3, width: `${frac * 100}%`, backgroundColor: colors.primary } }) }), track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: track.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: 44, height: 44, borderRadius: tokens.radius.full, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "base", color: "onAccent" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: track.artist })) : null] }), isBuffering ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', accessibilityState: { selected: isPlaying }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 8, style: ({ pressed }) => ({
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "onPrimary" }) })), onNext ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", onPress: onNext, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "lg", color: "onSurface" }) })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Now playing: ${track.title}. Expand`, onPress: () => onPress(track), onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }));
}
//# sourceMappingURL=MiniPlayerV2.js.map
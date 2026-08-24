"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackPadV2 = TrackPadV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const types_1 = require("./types");
/**
 * TrackPad, redesigned (v2): a **big glowing pad grid** on an elevated card.
 * Each cell is a large, tappable square with an oversized glyph; a lit pad
 * (`activePadIds`) grows a soft glow halo, a thick accent ring, a filled corner
 * beacon **and** a "LIVE" caption — the playing state never rides on color
 * alone. Empty slots render dimmed and inert. Pads spring on press and the
 * board fades in on mount. Accents trace to semantic token slots; no literals.
 * Distinct at a glance from v1's flat bordered grid. Same props.
 */
function TrackPadV2({ pads, columns = 4, variant = 'grid', activePadIds, label, emptyLabel = 'No pads assigned', onPadPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    if (pads.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83E\uDD41", size: "3xl", color: "muted", accessibilityLabel: "Pads" }), title: emptyLabel, style: style }));
    }
    const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
    const active = new Set(activePadIds ?? []);
    const gap = tokens.spacing.sm;
    const minHeight = variant === 'compact' ? 60 : 92;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                ...(0, elevation_1.shadow)('lg', tokens),
                opacity: enter.opacity,
                transform: enter.transform,
            },
            style,
        ], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap }, children: pads.map((pad, i) => {
                    const accentKey = pad.color ?? (0, types_1.padAccentKey)(i);
                    const accent = colors[accentKey];
                    const isEmpty = pad.empty === true;
                    const isActive = active.has(pad.id);
                    const name = pad.label ?? pad.note ?? `Pad ${i + 1}`;
                    const widthPct = `${100 / cols}%`;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: widthPct, padding: gap / 2 }, children: (0, jsx_runtime_1.jsx)(GlowPad, { name: name, glyph: pad.glyph, accent: accent, accentKey: accentKey, isEmpty: isEmpty, isActive: isActive, minHeight: minHeight, disabled: isEmpty || !onPadPress, onPress: () => onPadPress?.(pad, i) }) }, pad.id));
                }) })] }));
}
function GlowPad({ name, glyph, accent, accentKey, isEmpty, isActive, minHeight, disabled, onPress, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)(0.94);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: [isActive ? (
            // Soft glow halo behind the lit pad (a shape cue, not color-only).
            (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    top: -3,
                    left: -3,
                    right: -3,
                    bottom: -3,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: (0, types_1.withAlpha)(accent, 0.3),
                } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isEmpty ? `${name}, empty` : isActive ? `${name}, live` : name, accessibilityState: { disabled, selected: isActive }, disabled: disabled, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({
                    minHeight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    borderRadius: tokens.radius.lg,
                    borderWidth: isActive ? 2.5 : 1,
                    borderColor: isEmpty ? colors.border : isActive ? accent : (0, types_1.withAlpha)(accent, 0.45),
                    backgroundColor: isEmpty
                        ? colors.surface
                        : (0, types_1.withAlpha)(accent, pressed || isActive ? 0.34 : 0.16),
                    opacity: isEmpty ? 0.45 : 1,
                }), children: [isActive ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                            position: 'absolute',
                            top: 6,
                            right: 6,
                            width: 9,
                            height: 9,
                            borderRadius: tokens.radius.full,
                            backgroundColor: accent,
                        } })) : null, glyph ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "2xl", color: isEmpty ? 'muted' : accentKey ?? 'onSurface' })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: isEmpty ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: isActive ? '800' : '600',
                        }, children: isEmpty ? '—' : name }), isActive ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }, children: "LIVE" })) : null] })] }));
}
//# sourceMappingURL=TrackPadV2.js.map
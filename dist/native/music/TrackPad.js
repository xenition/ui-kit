"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackPad = TrackPad;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * A drum / sample pad grid — a UI shell only, it triggers no audio. Renders
 * `pads` as a wrapped grid of tappable cells; `activePadIds` lights a pad's
 * "playing" state via a border + a filled corner dot (never color alone), and
 * `empty` pads render dimmed and non-triggering. Hitting a live pad fires
 * `onPadPress(pad, index)`. Renders an `EmptyState` when there are no pads.
 * Pad accents come from semantic token slots (position-derived or `pad.color`);
 * no literal colors.
 */
function TrackPad({ pads, columns = 4, variant = 'grid', activePadIds, label, emptyLabel = 'No pads assigned', onPadPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (pads.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83E\uDD41", size: "2xl", color: "muted", accessibilityLabel: "Pads" }), title: emptyLabel, style: style }));
    }
    const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
    const active = new Set(activePadIds ?? []);
    const gap = tokens.spacing.xs;
    const minHeight = variant === 'compact' ? 44 : 64;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap }, children: pads.map((pad, i) => {
                    const accentKey = pad.color ?? (0, types_1.padAccentKey)(i);
                    const accent = colors[accentKey];
                    const isEmpty = pad.empty === true;
                    const isActive = active.has(pad.id);
                    const name = pad.label ?? pad.note ?? `Pad ${i + 1}`;
                    // Percentage width so the row wraps into `cols` columns, gap-aware.
                    const widthPct = `${100 / cols}%`;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: widthPct, padding: gap / 2 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isEmpty ? `${name}, empty` : name, accessibilityState: { disabled: isEmpty, selected: isActive }, disabled: isEmpty || !onPadPress, onPress: () => onPadPress?.(pad, i), style: ({ pressed }) => ({
                                minHeight,
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                borderRadius: tokens.radius.md,
                                borderWidth: isActive ? 2 : 1,
                                borderColor: isEmpty ? colors.border : isActive ? accent : (0, types_1.withAlpha)(accent, 0.4),
                                backgroundColor: isEmpty
                                    ? colors.surface
                                    : (0, types_1.withAlpha)(accent, pressed || isActive ? 0.3 : 0.14),
                                opacity: isEmpty ? 0.45 : 1,
                            }), children: [isActive ? (
                                // Non-color "playing" affordance: a filled corner dot.
                                (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        position: 'absolute',
                                        top: 4,
                                        right: 4,
                                        width: 6,
                                        height: 6,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: accent,
                                    } })) : null, pad.glyph ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: pad.glyph, size: "lg", color: isEmpty ? 'muted' : accentKey })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                        color: isEmpty ? colors.muted : colors.onSurface,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: isActive ? '700' : '500',
                                    }, children: isEmpty ? '—' : name })] }) }, pad.id));
                }) })] }));
}
//# sourceMappingURL=TrackPad.js.map
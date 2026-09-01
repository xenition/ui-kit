"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackPadV4 = TrackPadV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * TrackPad — **V4** "session" design. The tactile take on a drum / sample pad
 * grid: pads are rounded token tiles carrying their per-cell accent
 * (position-derived or `pad.color`) as a soft tint, and an `activePadIds` pad
 * lights with a stronger accent fill + a heavier accent ring + a filled corner
 * dot + bold label (never color alone). No gradient — performance surfaces stay
 * clean and tactile; ≥44px tap targets. Honors both `variant`s (`grid` /
 * `compact`), the empty-cell state and `onPadPress(pad, index)` behavior
 * identical to {@link TrackPadProps}. Renders an `EmptyState` when there are no
 * pads. Token-only colors via `useXenitionTheme()`.
 */
function TrackPadV4({ pads, columns = 4, variant = 'grid', activePadIds, label, emptyLabel = 'No pads assigned', onPadPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (pads.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83E\uDD41", size: "2xl", color: "muted", accessibilityLabel: "Pads" }), title: emptyLabel, style: style }));
    }
    const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
    const active = new Set(activePadIds ?? []);
    const gap = tokens.spacing.xs;
    const minHeight = variant === 'compact' ? 44 : 64;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap }, children: pads.map((pad, i) => {
                    // Preserve the per-cell accent exactly as the base: explicit
                    // `pad.color`, else position-derived, resolved to a token color.
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
                                padding: tokens.spacing.xs,
                                borderRadius: tokens.radius.md,
                                borderWidth: isActive ? 2 : 1,
                                borderStyle: isEmpty ? 'dashed' : 'solid',
                                borderColor: isEmpty ? colors.border : isActive ? accent : (0, types_1.withAlpha)(accent, 0.4),
                                backgroundColor: isEmpty
                                    ? colors.surface
                                    : (0, types_1.withAlpha)(accent, pressed || isActive ? 0.3 : 0.14),
                                opacity: isEmpty ? 0.45 : 1,
                            }), children: [isActive ? (
                                // Non-color "playing" affordance: a filled accent corner dot.
                                (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        position: 'absolute',
                                        top: 4,
                                        right: 4,
                                        width: 8,
                                        height: 8,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: accent,
                                    } })) : null, pad.glyph ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: pad.glyph, size: "lg", color: isEmpty ? 'muted' : accentKey })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                        color: isEmpty ? colors.muted : colors.onSurface,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: isActive ? '700' : '600',
                                    }, children: isEmpty ? '—' : name })] }) }, pad.id));
                }) })] }));
}
//# sourceMappingURL=TrackPadV4.js.map
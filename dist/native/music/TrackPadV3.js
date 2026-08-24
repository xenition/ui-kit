"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackPadV3 = TrackPadV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * TrackPad, redesigned (v3): a **compact minimal grid** of small flat cells —
 * no card, no shadow, hairline separators only. A lit pad (`activePadIds`)
 * reads through a tiny filled beacon plus a bolder label (never color alone);
 * empty slots dim out and stop responding. Built for a tight strip above a
 * timeline. Accents trace to semantic token slots; no literals. Distinct at a
 * glance from v1's larger labelled squares. Same props.
 */
function TrackPadV3({ pads, columns = 4, variant = 'grid', activePadIds, label, emptyLabel = 'No pads assigned', onPadPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (pads.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83E\uDD41", size: "lg", color: "muted", accessibilityLabel: "Pads" }), title: emptyLabel, style: style }));
    }
    const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
    const active = new Set(activePadIds ?? []);
    const gap = 4;
    const minHeight = variant === 'compact' ? 30 : 40;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.5 }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap }, children: pads.map((pad, i) => {
                    const accentKey = pad.color ?? (0, types_1.padAccentKey)(i);
                    const accent = colors[accentKey];
                    const isEmpty = pad.empty === true;
                    const isActive = active.has(pad.id);
                    const name = pad.label ?? pad.note ?? `Pad ${i + 1}`;
                    const widthPct = `${100 / cols}%`;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: widthPct, padding: gap / 2 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isEmpty ? `${name}, empty` : isActive ? `${name}, live` : name, accessibilityState: { disabled: isEmpty, selected: isActive }, disabled: isEmpty || !onPadPress, onPress: () => onPadPress?.(pad, i), style: ({ pressed }) => ({
                                minHeight,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4,
                                paddingHorizontal: tokens.spacing.xs,
                                borderRadius: tokens.radius.sm,
                                borderWidth: 1,
                                borderColor: isEmpty ? colors.border : isActive ? accent : (0, types_1.withAlpha)(accent, 0.35),
                                backgroundColor: isEmpty
                                    ? 'transparent'
                                    : (0, types_1.withAlpha)(accent, pressed || isActive ? 0.22 : 0.08),
                                opacity: isEmpty ? 0.4 : 1,
                            }), children: [isActive ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 5,
                                        height: 5,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: accent,
                                    } })) : null, pad.glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: pad.glyph, size: "xs", color: isEmpty ? 'muted' : accentKey }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                        color: isEmpty ? colors.muted : colors.onSurface,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: isActive ? '800' : '500',
                                    }, children: isEmpty ? '—' : name })] }) }, pad.id));
                }) })] }));
}
//# sourceMappingURL=TrackPadV3.js.map
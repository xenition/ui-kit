"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymptomSelector = SymptomSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A multi-select symptom chip grid for intake / triage flows: tap to toggle
 * each symptom on or off. Fully controlled — `value` is the list of selected
 * ids and `onChange` receives the next list. Selected chips are marked with a
 * check glyph as well as a filled tone so selection never relies on color
 * alone. Renders an empty note when there are no options. Informational UI only
 * — not a medical device. Token-only colors.
 */
function SymptomSelector({ options, value, onChange, title, emptyLabel = 'No symptoms to choose from', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const selected = new Set(value);
    const toggle = (id) => {
        const next = new Set(selected);
        if (next.has(id)) {
            next.delete(id);
        }
        else {
            next.add(id);
        }
        onChange(options.filter((o) => next.has(o.id)).map((o) => o.id));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title })) : null, options.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: options.map((opt) => {
                    const on = selected.has(opt.id);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: on }, accessibilityLabel: opt.label, onPress: () => toggle(opt.id), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: on ? colors.primary : colors.border,
                            backgroundColor: on ? colors.primary : colors.surface,
                            opacity: pressed ? 0.75 : 1,
                        }), children: [on ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : opt.glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: opt.glyph })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: on ? colors.onPrimary : colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: on ? '700' : '500',
                                }, children: opt.label })] }, opt.id));
                }) }))] }));
}
//# sourceMappingURL=SymptomSelector.js.map
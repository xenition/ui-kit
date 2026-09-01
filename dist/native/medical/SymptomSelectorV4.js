"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymptomSelectorV4 = SymptomSelectorV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * SymptomSelector — **V4** "clinic" design. A multi-select symptom chip grid
 * for intake / triage flows, presented inside a calm, elevated rounded card
 * with a soft shadow. Tap a pill to toggle a symptom; fully controlled via
 * `value` + `onChange`. A selected chip reads with a soft-primary → primary
 * fill **and** a ✓ marker, so selection never relies on color alone. Each chip
 * is a `role="checkbox"` (≥44px tap target). Renders an empty note when there
 * are no options. Identical props/behavior to {@link SymptomSelectorProps}.
 * Token-only colors via `useXenitionTheme()`. Informational UI only — not a
 * medical device.
 */
function SymptomSelectorV4({ options, value, onChange, title, emptyLabel = 'No symptoms to choose from', style, }) {
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
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [shell, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title })) : null, options.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: options.map((opt) => {
                    const on = selected.has(opt.id);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: on }, accessibilityLabel: opt.label, onPress: () => toggle(opt.id), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            minHeight: 44,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: on ? colors.primary : colors.border,
                            backgroundColor: on ? colors.primary : (0, color_1.withAlpha)(colors.primary, 0.1),
                            opacity: pressed ? 0.75 : 1,
                        }), children: [on ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "xs", style: { color: colors.onPrimary } })) : opt.glyph ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: opt.glyph, size: "sm" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: on ? colors.onPrimary : colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: on ? '700' : '500',
                                }, children: opt.label })] }, opt.id));
                }) }))] }));
}
//# sourceMappingURL=SymptomSelectorV4.js.map
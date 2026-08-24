"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSVPButton = RSVPButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const OPTIONS = [
    { status: 'going', label: 'Going', glyph: '✓', tone: 'success', onTone: 'onSuccess' },
    { status: 'maybe', label: 'Maybe', glyph: '?', tone: 'warn', onTone: 'onWarn' },
    { status: 'declined', label: "Can't go", glyph: '✕', tone: 'danger', onTone: 'onDanger' },
];
/**
 * Segmented RSVP control with `going` / `maybe` / `declined` states. The
 * selected state is communicated three ways — a filled background, a distinct
 * glyph (✓ / ? / ✕), and `accessibilityState.selected` — so it is never
 * conveyed by color alone (WCAG 1.4.1). Colors come from the compiled theme
 * tokens; no literal colors.
 */
function RSVPButton({ value, onChange, size = 'md', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const padV = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;
    const fontSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: [
            {
                flexDirection: 'row',
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                overflow: 'hidden',
                opacity: disabled ? 0.5 : 1,
            },
            style,
        ], children: OPTIONS.map((opt, i) => {
            const selected = value === opt.status;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: opt.label, disabled: disabled, onPress: () => onChange?.(opt.status), style: ({ pressed }) => ({
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: padV,
                    paddingHorizontal: tokens.spacing.sm,
                    borderLeftWidth: i === 0 ? 0 : 1,
                    borderLeftColor: colors.border,
                    backgroundColor: selected ? colors[opt.tone] : pressed ? tokens.ramps.neutral[100] : colors.surface,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: selected ? colors[opt.onTone] : colors.muted, fontSize, fontWeight: '700' }, children: opt.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: selected ? colors[opt.onTone] : colors.onSurface,
                            fontSize,
                            fontWeight: selected ? '700' : '500',
                        }, children: opt.label })] }, opt.status));
        }) }));
}
//# sourceMappingURL=RSVPButton.js.map
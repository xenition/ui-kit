"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceMenuItem = ServiceMenuItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const money_1 = require("../commerce/money");
const CATEGORY_META = {
    hair: { glyph: '💇', label: 'Hair', color: 'primary' },
    nails: { glyph: '💅', label: 'Nails', color: 'accent' },
    skin: { glyph: '✨', label: 'Skin', color: 'success' },
    massage: { glyph: '💆', label: 'Massage', color: 'primary' },
    makeup: { glyph: '💄', label: 'Makeup', color: 'danger' },
    brows: { glyph: '👁️', label: 'Brows', color: 'accent' },
    waxing: { glyph: '🕯️', label: 'Waxing', color: 'warn' },
    spa: { glyph: '🧖', label: 'Spa', color: 'success' },
};
/**
 * A single salon/spa service-menu row: category icon + tag, name, optional
 * description, a duration chip, and a right-aligned price (integer cents via
 * {@link formatMoney}). `popular` adds a soft marker; `unavailable` dims the row
 * and blocks the press. The whole row is one `button` when interactive with a
 * spoken label carrying the price/duration. Token-only colors.
 */
function ServiceMenuItem({ name, priceCents, currency = 'USD', category = 'spa', durationMin, description, popular = false, unavailable = false, pricePrefix, formatMoney: format = money_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = CATEGORY_META[category] ?? CATEGORY_META.spa;
    const priceText = `${pricePrefix ? `${pricePrefix} ` : ''}${format(priceCents, currency)}`;
    const interactive = !unavailable && !!onPress;
    const a11yLabel = `${name}, ${meta.label}${durationMin != null ? `, ${durationMin} minutes` : ''}, ${priceText}${unavailable ? ', unavailable' : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: interactive ? 'button' : undefined, accessibilityLabel: a11yLabel, accessibilityState: { disabled: unavailable }, disabled: !interactive, onPress: interactive ? onPress : undefined, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                opacity: unavailable ? 0.5 : pressed ? 0.9 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors[meta.color], 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }, children: name }), popular ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    borderRadius: tokens.radius.sm,
                                    paddingHorizontal: tokens.spacing.xs,
                                    paddingVertical: 1,
                                    backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.16),
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Popular" }) })) : null] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, durationMin != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [durationMin, " min"] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: priceText })] }));
}
//# sourceMappingURL=ServiceMenuItem.js.map
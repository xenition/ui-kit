"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManifestRow = ManifestRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const STATE_META = {
    pending: { glyph: '○', label: 'Pending', slot: 'muted' },
    checked: { glyph: '✓', label: 'Checked', slot: 'success' },
    missing: { glyph: '✕', label: 'Missing', slot: 'danger' },
};
/**
 * A single manifest / checklist line for goods-in or load verification: item +
 * SKU, a `scanned / quantity` counter, and a tappable check control. State is
 * carried by a glyph + word (checkmark/cross/circle) and an
 * `accessibilityState.checked`, never color alone. Pressing the control cycles
 * pending → checked and fires `onToggle`. All colors are theme tokens.
 */
function ManifestRow({ item, sku, quantity, scanned, state = 'pending', onToggle, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const accent = colors[meta.slot];
    const complete = quantity != null && scanned != null ? scanned >= quantity : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: state === 'checked' }, accessibilityLabel: `${meta.label}: ${item}`, disabled: !onToggle, onPress: () => onToggle?.(state === 'checked' ? 'pending' : 'checked'), testID: testID, style: {
                    width: 26,
                    height: 26,
                    borderRadius: tokens.radius.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: state === 'checked' ? 0 : 1.5,
                    borderColor: colors.border,
                    backgroundColor: state === 'checked' ? accent : 'transparent',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: state === 'checked' ? colors.surface : accent }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: item }), sku ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: sku })) : null] }), quantity != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                    color: complete === false ? colors.warn : complete ? colors.success : colors.onSurface,
                }, children: scanned != null ? `${scanned}/${quantity}` : `×${quantity}` })) : null] }));
}
//# sourceMappingURL=ManifestRow.js.map
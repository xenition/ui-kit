"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManifestRowV4 = ManifestRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const STATE_META = {
    pending: { glyph: '○', label: 'Pending', slot: 'muted' },
    checked: { glyph: '✓', label: 'Checked', slot: 'success' },
    missing: { glyph: '✕', label: 'Missing', slot: 'danger' },
};
/**
 * ManifestRow — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a load-verification line: an elevated
 * rounded row with a soft shadow, a large check control (`role="checkbox"`,
 * ≥44px tap target) whose meaning is carried by a glyph + `accessibilityState`,
 * the item + SKU, a labelled state word (never color alone), and a
 * `scanned / quantity` counter that greens on completion and warns when short.
 * Pressing the control cycles pending → checked and fires `onToggle`. Honors the
 * V4 `variant` — `full` (default) and `compact` (a denser single line). Token-only
 * colors via `useXenitionTheme()`.
 */
function ManifestRowV4({ item, sku, quantity, scanned, state = 'pending', variant = 'full', onToggle, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const accent = colors[meta.slot];
    const checked = state === 'checked';
    const complete = quantity != null && scanned != null ? scanned >= quantity : undefined;
    const compact = variant === 'compact';
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const size = compact ? 32 : 44;
    const control = ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked }, accessibilityLabel: `${meta.label}: ${item}`, disabled: !onToggle, onPress: () => onToggle?.(checked ? 'pending' : 'checked'), testID: testID, style: { width: size, height: size, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', borderWidth: checked ? 0 : 1.5, borderColor: colors.border, backgroundColor: checked ? accent : 'transparent' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, color: checked ? colors.surface : accent }, children: meta.glyph }) }));
    const counter = quantity != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'], color: complete === false ? colors.warn : complete ? colors.success : colors.onSurface }, children: scanned != null ? `${scanned}/${quantity}` : `×${quantity}` })) : null;
    const layout = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: compact ? tokens.spacing.sm : tokens.spacing.md,
        minHeight: compact ? 44 : 56,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [shell, layout, style], children: [control, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: compact ? tokens.typography.scale.sm : tokens.typography.scale.base, fontWeight: '600', color: colors.onSurface }, children: item }), !compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }, children: meta.label }), sku ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `· ${sku}` }) : null] })) : null] }), counter] }));
}
//# sourceMappingURL=ManifestRowV4.js.map
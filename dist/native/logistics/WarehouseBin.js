"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseBin = WarehouseBin;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
const BIN_META = {
    empty: { glyph: '▫', label: 'Empty', slot: 'muted' },
    partial: { glyph: '▤', label: 'Partial', slot: 'primary' },
    full: { glyph: '■', label: 'Full', slot: 'success' },
    reserved: { glyph: '⏳', label: 'Reserved', slot: 'accent' },
    blocked: { glyph: '⛔', label: 'Blocked', slot: 'danger' },
};
/**
 * A warehouse bin / storage-location tile: the bin code + zone, a token fill
 * bar sized to `fill`, an item count, and an occupancy chip carried by a
 * glyph + word. Exposes a `progressbar` role with `accessibilityValue` for the
 * fill so fullness is announced, not color-inferred. Tappable when `onPress` is
 * set. All colors are theme tokens.
 */
function WarehouseBin({ code, zone, fill, itemCount, state = 'partial', selected = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = BIN_META[state] ?? BIN_META.partial;
    const accent = colors[meta.slot];
    const pct = (0, internal_1.clampPct)(fill);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Bin ${code}, ${meta.label}, ${pct}% full`, accessibilityValue: { min: 0, max: 100, now: pct }, accessibilityState: { selected }, disabled: !onPress, onPress: onPress, testID: testID, style: [
            {
                gap: tokens.spacing.xs,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }, children: code }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: accent }, children: meta.glyph })] }), zone ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: zone })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 6, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: accent } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }, children: meta.label }), itemCount != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `${itemCount} ${itemCount === 1 ? 'item' : 'items'}` })) : null] })] }));
}
//# sourceMappingURL=WarehouseBin.js.map
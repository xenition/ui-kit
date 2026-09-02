"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseBinV4 = WarehouseBinV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
const BIN_META = {
    empty: { glyph: '▫', label: 'Empty', slot: 'muted' },
    partial: { glyph: '▤', label: 'Partial', slot: 'primary' },
    full: { glyph: '■', label: 'Full', slot: 'success' },
    reserved: { glyph: '⏳', label: 'Reserved', slot: 'accent' },
    blocked: { glyph: '⛔', label: 'Blocked', slot: 'danger' },
};
/**
 * WarehouseBin — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a storage-location tile: an elevated
 * rounded card with a soft shadow, the bin code + zone, a big legible
 * **tabular-nums** fill percentage, a token fill bar sized to `fill`, an item
 * count, and an occupancy chip carried by a glyph + word (never color alone).
 * Exposes a `progressbar` role with `accessibilityValue` so fullness is
 * announced, not color-inferred. Tappable when `onPress` is set. Token-only
 * colors via `useXenitionTheme()`.
 */
function WarehouseBinV4({ code, zone, fill, itemCount, state = 'partial', selected = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = BIN_META[state] ?? BIN_META.partial;
    const accent = colors[meta.slot];
    const pct = (0, internal_1.clampPct)(fill);
    const shell = {
        backgroundColor: colors.card,
        borderColor: selected ? colors.primary : colors.border,
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
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }, children: code }), zone ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: zone }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xl, fontWeight: '700', color: accent, fontVariant: ['tabular-nums'] }, children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: accent } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '700', color: accent }, children: meta.label })] }), itemCount != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }, children: `${itemCount} ${itemCount === 1 ? 'item' : 'items'}` })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Bin ${code}, ${meta.label}, ${pct}% full`, accessibilityValue: { min: 0, max: 100, now: pct }, accessibilityState: { selected }, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, { opacity: pressed ? 0.9 : 1 }, style], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: `Bin ${code}, ${meta.label}, ${pct}% full`, accessibilityValue: { min: 0, max: 100, now: pct }, accessibilityState: { selected }, testID: testID, style: [shell, style], children: body }));
}
//# sourceMappingURL=WarehouseBinV4.js.map
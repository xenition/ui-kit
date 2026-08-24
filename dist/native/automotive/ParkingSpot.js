"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSpot = ParkingSpot;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Status → tone + spelled-out word + glyph (never color alone). */
const STATUS = {
    available: { tone: 'success', word: 'Available', glyph: 'P' },
    occupied: { tone: 'danger', word: 'Occupied', glyph: '✕' },
    reserved: { tone: 'warn', word: 'Reserved', glyph: '★' },
    disabled: { tone: 'muted', word: 'Out of service', glyph: '—' },
};
function formatMoney(cents, currency) {
    try {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
    }
    catch {
        return `$${(cents / 100).toFixed(2)}`;
    }
}
/**
 * A single parking spot — its id, level, availability status, hourly price, and
 * an optional EV-charging marker. The status carries a glyph plus a spelled-out
 * word and an a11y label, so meaning never rests on color; only `available`
 * spots are selectable and non-selectable spots expose a disabled a11y state.
 * Data + `onSelect` only; nothing fetches. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `variant="row"` renders a list line.
 */
function ParkingSpot({ spotId, level, status = 'available', priceCentsPerHour, currency = 'USD', distanceLabel, evCharging = false, variant = 'tile', onSelect, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const s = STATUS[status] ?? STATUS.available;
    const selectable = status === 'available' && Boolean(onSelect);
    const row = variant === 'row';
    const a11y = `Spot ${spotId}${level ? `, ${level}` : ''}, ${s.word}${typeof priceCentsPerHour === 'number' ? `, ${formatMoney(priceCentsPerHour, currency)} per hour` : ''}${evCharging ? ', EV charging' : ''}`;
    const badge = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: row ? 40 : 44,
            height: row ? 40 : 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (0, color_1.withAlpha)(colors[s.tone], 0.16),
            borderWidth: 1,
            borderColor: (0, color_1.withAlpha)(colors[s.tone], 0.4),
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[s.tone], fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: s.glyph }) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
        }, children: [badge, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: spotId }), evCharging ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "primary", variant: "soft", size: "sm", children: "\u26A1 EV" })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [level, s.word, distanceLabel].filter(Boolean).join(' · ') })] }), typeof priceCentsPerHour === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: formatMoney(priceCentsPerHour, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "/ hr" })] })) : null] }));
    const containerStyle = {
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: selectable ? (0, color_1.withAlpha)(colors.success, 0.5) : colors.border,
        backgroundColor: colors.surface,
        padding: tokens.spacing.md,
    };
    if (!onSelect) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [containerStyle, style], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessible: true, accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { disabled: !selectable }, disabled: !selectable, onPress: selectable ? onSelect : undefined, style: ({ pressed }) => [containerStyle, style, { opacity: !selectable ? 0.6 : pressed ? 0.9 : 1 }], children: body }));
}
//# sourceMappingURL=ParkingSpot.js.map
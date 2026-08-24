"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionCardV3 = AdoptionCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    available: { label: 'Available', tone: 'success', slot: 'success' },
    pending: { label: 'Pending', tone: 'warn', slot: 'warn' },
    adopted: { label: 'Adopted', tone: 'neutral', slot: 'muted' },
    fostered: { label: 'In foster', tone: 'accent', slot: 'accent' },
};
/**
 * Horizontal media-left row — a compact list alternate to {@link AdoptionCard}.
 * A square photo (or emoji placeholder) leads the row; name, meta, shelter, a
 * status chip and the fee + apply action stack on the right, with an optional
 * favorite heart in the top corner. Availability reads via a labelled chip. Same
 * `AdoptionCardProps`. Token-pure.
 */
function AdoptionCardV3({ name, breed, age, sex, shelter, photoUrl, glyph = '🐾', fee, status, favorited = false, applyLabel = 'Apply', onApply, onFavorite, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const statusMeta = STATUS_META[status];
    const meta = [age, sex, breed].filter(Boolean).join(' · ');
    const showApply = onApply != null && status !== 'adopted';
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.md,
                padding: tokens.spacing.sm,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: 84,
                    height: 84,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    backgroundColor: tokens.ramps.neutral[100] ?? colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: [!photoUrl ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "2xl" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 4, left: 4 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "solid", size: "sm", children: statusMeta.label }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), onFavorite ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: favorited }, accessibilityLabel: favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`, onPress: onFavorite, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }, children: favorited ? '♥' : '♡' }) })) : null] }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null, shelter ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", shelter] })) : null, fee || showApply ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [fee ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: fee })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), showApply ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onApply, children: applyLabel })) : null] })) : null] })] }));
    const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.92 : 1 }), children: inner }));
}
//# sourceMappingURL=AdoptionCardV3.js.map
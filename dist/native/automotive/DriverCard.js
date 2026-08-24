"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverCard = DriverCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * A driver identity block — avatar, name, star rating, trip count, the assigned
 * vehicle and plate, an online/offline state, and an optional ETA. Availability
 * is conveyed by a text-labelled badge (not color alone). Data +
 * `onMessage`/`onCall`/`onPress` callbacks only; nothing fetches. Colors come
 * from semantic tokens and `withAlpha` tints — no literal colors.
 * `variant="assigned"` highlights the ETA; `variant="compact"` tightens it.
 */
function DriverCard({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online, variant = 'default', onMessage, onCall, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const assigned = variant === 'assigned';
    const pad = compact ? tokens.spacing.md : tokens.spacing.lg;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading driver", style: [
                {
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    padding: pad,
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    alignItems: 'center',
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, height: 44, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] })] }));
    }
    const statusWord = online === undefined ? undefined : online ? 'Online' : 'Offline';
    const a11y = `Driver ${name}${typeof rating === 'number' ? `, rated ${rating} stars` : ''}${vehicle ? `, ${vehicle}` : ''}${etaLabel ? `, ETA ${etaLabel}` : ''}${statusWord ? `, ${statusWord}` : ''}`;
    const Container = onPress ? react_native_1.Pressable : react_native_1.View;
    return ((0, jsx_runtime_1.jsxs)(Container, { accessible: true, accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: a11y, onPress: onPress, style: onPress
            ? ({ pressed }) => [containerStyle(), style, { opacity: pressed ? 0.92 : 1 }]
            : [containerStyle(), style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: avatarUrl, name: name, size: compact ? 'sm' : 'lg' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), statusWord ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: online ? 'success' : 'neutral', variant: "soft", size: "sm", dot: true, children: statusWord })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_2.Rating, { value: rating, size: "sm", showValue: true }) : null, typeof tripCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [tripCount.toLocaleString(), " trips"] })) : null] })] }), assigned && etaLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: etaLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "ETA" })] })) : null] }), vehicle || plate ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [vehicle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["\uD83D\uDE97 ", vehicle] })) : null, plate ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            borderRadius: tokens.radius.sm,
                            borderWidth: 1,
                            borderColor: colors.border,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.xs,
                            backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.1),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }, children: plate }) })) : null, !assigned && etaLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["\u00B7 ETA ", etaLabel] })) : null] })) : null, onMessage || onCall ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onMessage ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "outline", size: "sm", onPress: onMessage, accessibilityLabel: `Message ${name}`, children: "Message" }) })) : null, onCall ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "soft", size: "sm", onPress: onCall, accessibilityLabel: `Call ${name}`, children: "Call" }) })) : null] })) : null] }));
    function containerStyle() {
        return {
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: pad,
            gap: compact ? tokens.spacing.sm : tokens.spacing.md,
        };
    }
}
//# sourceMappingURL=DriverCard.js.map
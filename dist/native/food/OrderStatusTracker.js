"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusTracker = OrderStatusTracker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const ORDER = ['placed', 'preparing', 'out-for-delivery', 'delivered'];
const DEFAULT_LABELS = {
    placed: 'Order placed',
    preparing: 'Preparing',
    'out-for-delivery': 'Out for delivery',
    delivered: 'Delivered',
};
/** Announced words per state — a11y must not rely on color alone. */
const STATE_WORD = {
    complete: 'completed',
    current: 'in progress',
    upcoming: 'upcoming',
};
/**
 * A four-stage delivery progress tracker: placed → preparing → out for delivery
 * → delivered. Completed steps show a check glyph, the current step a filled
 * dot, upcoming steps a hollow ring — and every step is *also* announced with
 * its state word ("completed" / "in progress" / "upcoming") so status is never
 * conveyed by color alone. `variant` switches horizontal vs. vertical. When
 * `cancelled`, the current step reads as failed. Token-only.
 */
function OrderStatusTracker({ status, variant = 'horizontal', labels, timestamps, cancelled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const currentIndex = Math.max(0, ORDER.indexOf(status));
    const vertical = variant === 'vertical';
    const stepState = (index) => {
        if (index < currentIndex)
            return 'complete';
        if (index === currentIndex)
            return 'current';
        return 'upcoming';
    };
    const markerColors = (state, failed) => {
        if (failed)
            return { bg: colors.danger, fg: colors.onDanger, border: colors.danger };
        if (state === 'complete')
            return { bg: colors.success, fg: colors.onSuccess, border: colors.success };
        if (state === 'current')
            return { bg: colors.primary, fg: colors.onPrimary, border: colors.primary };
        return { bg: colors.surface, fg: colors.muted, border: colors.border };
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 1, max: ORDER.length, now: currentIndex + 1 }, style: [
            {
                flexDirection: vertical ? 'column' : 'row',
                alignItems: vertical ? 'stretch' : 'flex-start',
            },
            style,
        ], children: ORDER.map((stage, index) => {
            const state = stepState(index);
            const failed = cancelled && state === 'current';
            const { bg, fg, border } = markerColors(state, failed);
            const label = labels?.[stage] ?? DEFAULT_LABELS[stage];
            const time = timestamps?.[stage];
            const glyph = failed ? '✕' : state === 'complete' ? '✓' : state === 'current' ? '●' : '○';
            const stateWord = failed ? 'cancelled' : STATE_WORD[state];
            const isLast = index === ORDER.length - 1;
            const marker = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 28,
                    height: 28,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: border,
                    backgroundColor: bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "xs", style: { color: fg } }) }));
            const textBlock = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: state === 'upcoming' ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: state === 'current' ? '700' : '500',
                            textAlign: vertical ? 'left' : 'center',
                        }, children: label }), time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            textAlign: vertical ? 'left' : 'center',
                        }, children: time })) : null] }));
            // A track segment is "filled" once the step it leads into is reached.
            const leftFilled = index <= currentIndex;
            const rightFilled = index < currentIndex;
            if (vertical) {
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${label}: ${stateWord}${time ? `, ${time}` : ''}`, style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [marker, !isLast ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 2,
                                        flex: 1,
                                        minHeight: tokens.spacing.lg,
                                        backgroundColor: rightFilled ? colors.success : colors.border,
                                    } })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, paddingBottom: isLast ? 0 : tokens.spacing.lg }, children: textBlock })] }, stage));
            }
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${label}: ${stateWord}${time ? `, ${time}` : ''}`, style: { flex: 1, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', width: '100%' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: 2,
                                    flex: 1,
                                    backgroundColor: index === 0 ? 'transparent' : leftFilled ? colors.success : colors.border,
                                } }), marker, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: 2,
                                    flex: 1,
                                    backgroundColor: isLast ? 'transparent' : rightFilled ? colors.success : colors.border,
                                } })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs, paddingHorizontal: 2 }, children: textBlock })] }, stage));
        }) }));
}
//# sourceMappingURL=OrderStatusTracker.js.map
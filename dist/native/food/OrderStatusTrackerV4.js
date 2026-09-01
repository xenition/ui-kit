"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusTrackerV4 = OrderStatusTrackerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const menu_v4_1 = require("./internal/menu-v4");
const ORDER = ['placed', 'preparing', 'out-for-delivery', 'delivered'];
const DEFAULT_LABELS = {
    placed: 'Order placed',
    preparing: 'Preparing',
    'out-for-delivery': 'Out for delivery',
    delivered: 'Delivered',
};
/** Announced words per state — status must never be carried by colour alone. */
const STATE_WORD = {
    complete: 'completed',
    current: 'in progress',
    upcoming: 'upcoming',
};
/**
 * **V4 order status tracker** — same props as {@link OrderStatusTracker} plus
 * `stageLabels` and `unknownLabel`.
 *
 * ## Five changes
 *
 * 1. **The stages can be read again.** The root was
 *    `accessibilityRole="progressbar"`, which is children-presentational — so
 *    every stage label, every timestamp and every per-step state word inside
 *    it was pruned, and with no name of its own the whole component announced
 *    an unattributed "1 of 4". The value now sits on an element that contains
 *    nothing, and the steps are read.
 * 2. **An unknown status says so.** `Math.max(0, indexOf(status))` mapped a
 *    miss onto stage 1, so a typo or a stage the backend added rendered a
 *    confident, wrong "Order placed, in progress". `stageIndex()` returns
 *    `undefined` and this renders `unknownLabel`.
 * 3. **A cancelled order does not report as progressing.** It counted up like
 *    any other order while one step wore a ✕. There is no progress value at
 *    all when an order is cancelled — the summary says what happened instead.
 * 4. **Markers and rails are hidden from the reader.** They are ✓ / ● / ○
 *    glyphs and 2px rules that restate the step's own state word, so they were
 *    reader stops that said nothing.
 * 5. **Timestamps are tabular and inked `mutedText`**, not the promise-free
 *    `muted` ramp step.
 */
function OrderStatusTrackerV4({ status, variant = 'horizontal', labels, stageLabels, timestamps, cancelled = false, unknownLabel = 'Order status unavailable', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const vertical = variant === 'vertical';
    const currentIndex = (0, menu_v4_1.stageIndex)(status);
    // Change 2: a status we do not recognise gets a sentence, not stage 1.
    if (currentIndex === undefined) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: unknownLabel, style: style, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: unknownLabel }) }));
    }
    const labelOf = (stage) => stageLabels?.[stage] ?? labels?.[stage] ?? DEFAULT_LABELS[stage];
    const stepState = (index) => {
        if (index < currentIndex)
            return 'complete';
        if (index === currentIndex)
            return 'current';
        return 'upcoming';
    };
    const markerTone = (state, failed) => {
        if (failed)
            return 'danger';
        if (state === 'complete')
            return 'success';
        if (state === 'current')
            return 'primary';
        return null;
    };
    const currentStage = ORDER[currentIndex] ?? ORDER[0];
    const summary = (0, menu_v4_1.spokenLine)([
        currentStage != null ? labelOf(currentStage) : null,
        cancelled ? 'cancelled' : `step ${currentIndex + 1} of ${ORDER.length}`,
    ]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: vertical ? 'column' : 'row',
                alignItems: vertical ? 'stretch' : 'flex-start',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: cancelled ? 'text' : 'progressbar', accessibilityLabel: summary, accessibilityValue: cancelled ? undefined : { min: 1, max: ORDER.length, now: currentIndex + 1 }, style: {
                    position: 'absolute',
                    top: 0,
                    start: 0,
                    width: '100%',
                    height: tokens.spacing.xs,
                } }), ORDER.map((stage, index) => {
                const state = stepState(index);
                const failed = cancelled && state === 'current';
                const tone = markerTone(state, failed);
                const label = labelOf(stage);
                const time = timestamps?.[stage];
                const glyph = failed ? '✕' : state === 'complete' ? '✓' : state === 'current' ? '●' : '○';
                const stateWord = failed ? 'cancelled' : STATE_WORD[state];
                const isLast = index === ORDER.length - 1;
                const marker = ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                        width: tokens.spacing.xl,
                        height: tokens.spacing.xl,
                        borderRadius: tokens.radius.full,
                        borderWidth: 2,
                        borderColor: tone ? (0, menu_v4_1.toneFill)(theme, tone) : colors.border,
                        backgroundColor: tone ? (0, menu_v4_1.toneFill)(theme, tone) : colors.card,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "xs", style: { color: tone ? (0, menu_v4_1.onPair)(theme, tone) : colors.mutedText } }) }));
                const textBlock = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: state === 'current' ? 'bold' : 'medium', tone: state === 'upcoming' ? 'mutedText' : 'onSurface', align: vertical ? 'left' : 'center', children: label }), time ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", align: vertical ? 'left' : 'center', children: time })) : null] }));
                // A track segment is "filled" once the step it leads into is reached.
                const leftFilled = index <= currentIndex;
                const rightFilled = index < currentIndex;
                const rail = (filled) => (filled ? colors.success : colors.border);
                if (vertical) {
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, menu_v4_1.spokenLine)([label, stateWord, time]), style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { alignItems: 'center' }, children: [marker, !isLast ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: 2,
                                            flex: 1,
                                            minHeight: tokens.spacing.lg,
                                            backgroundColor: rail(rightFilled),
                                        } })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, paddingBottom: isLast ? 0 : tokens.spacing.lg }, children: textBlock })] }, stage));
                }
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, menu_v4_1.spokenLine)([label, stateWord, time]), style: { flex: 1, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', alignItems: 'center', width: '100%' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        height: 2,
                                        flex: 1,
                                        backgroundColor: index === 0 ? 'transparent' : rail(leftFilled),
                                    } }), marker, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        height: 2,
                                        flex: 1,
                                        backgroundColor: isLast ? 'transparent' : rail(rightFilled),
                                    } })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: textBlock })] }, stage));
            })] }));
}
//# sourceMappingURL=OrderStatusTrackerV4.js.map
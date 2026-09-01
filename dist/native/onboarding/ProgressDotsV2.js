"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressDotsV2 = ProgressDotsV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** §10.1 geometry: the track's thickness, and the counter's minimum width. */
const TRACK = 4;
const COUNTER_WIDTH = 44;
/**
 * Paged progress — V2, the editorial line: **one continuous track with a
 * spoken position beside it**, "2 of 5", instead of a row of segments.
 *
 * The idea the base and V3 cannot express: on a long flow — eight steps, ten —
 * segments stop being countable and the header turns into a row of tick marks
 * nobody reads. A single filled track plus the number says the same thing at
 * any length, and the number is the part a user actually uses to decide
 * whether to keep going.
 *
 * The counter is `tabular` and fixed-width so the track does not resize as the
 * step number changes, which would make the bar appear to jump backwards on
 * step 10 of 12.
 *
 * `onDotPress` is accepted and **ignored**: there are no dots to press. A
 * continuous track has no discrete targets, and inventing invisible ones is
 * worse than not offering navigation at all. An app that needs step navigation
 * wants the base line.
 *
 * Same props as {@link ProgressDots}. Token-pure.
 */
function ProgressDotsV2({ count, activeIndex, size = 'md', accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(0, Math.floor(count));
    const position = Math.min(Math.max(0, activeIndex + 1), total);
    const fraction = total === 0 ? 0 : position / total;
    const thickness = size === 'sm' ? TRACK : TRACK * 1.5;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 1, max: Math.max(1, total), now: position }, accessibilityLabel: accessibilityLabel ?? `Step ${position} of ${total}`, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'stretch',
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flex: 1,
                    height: thickness,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.border,
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: `${fraction * 100}%`,
                        height: '100%',
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                    } }) }), (0, jsx_runtime_1.jsxs)(primitives_1.Text, { size: "sm", weight: "semibold", tone: "mutedText", style: { minWidth: COUNTER_WIDTH, textAlign: 'right' }, children: [position, " / ", total] })] }));
}
//# sourceMappingURL=ProgressDotsV2.js.map
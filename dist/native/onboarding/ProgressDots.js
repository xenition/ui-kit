"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressDots = ProgressDots;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Dot diameter per size — geometric, not a spacing token (spec §10.1). */
const DOT = { sm: 6, md: 8 };
/** Segment thickness for `'bars'` — geometric, same rule as {@link DOT}. */
const BAR = { sm: 4, md: 6 };
/**
 * Paged-progress indicator — two treatments of the same idea, chosen with
 * `variant`.
 *
 * `'dots'` (the default, and everything that shipped before this prop existed)
 * is a slide-position indicator: a row of token-bound dots where the active
 * step is a widened "pill" in the primary color and the rest are muted.
 *
 * `'bars'` is the onboarding step indicator the design spec calls for (§2):
 * equal-width segments spanning the header, filled up to and including the
 * current step, `radius.full`, `spacing.xs` apart. It carries no numbers and no
 * captions on purpose — the numbered circles it replaces were the single worst
 * offender on the shipped screens, cramped at the top with labels too small to
 * read.
 *
 * Both treatments are decorative unless `onDotPress` is supplied, in which case
 * each step becomes a labelled button. An empty or negative `count` renders an
 * empty row rather than crashing, and a `count` of one renders a single full
 * bar. No literal colors.
 */
function ProgressDots({ count, activeIndex, size = 'md', variant = 'dots', onDotPress, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(0, Math.floor(count));
    const bars = variant === 'bars';
    const thickness = bars ? BAR[size] : DOT[size];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: Math.max(0, total - 1), now: activeIndex }, accessibilityLabel: accessibilityLabel ?? `Step ${Math.min(activeIndex + 1, total)} of ${total}`, style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
            bars ? { alignSelf: 'stretch' } : null,
            style,
        ], children: Array.from({ length: total }, (_, i) => {
            const active = i === activeIndex;
            // In `'bars'` a step already walked past stays filled — the bar reads as
            // "how far through am I", not "which one is selected".
            const filled = bars ? i <= activeIndex : active;
            const segment = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    // Bars share the row equally; dots keep their fixed diameter and
                    // the active one stretches into a pill.
                    width: bars ? undefined : active ? thickness * 2.5 : thickness,
                    alignSelf: bars ? 'stretch' : undefined,
                    height: thickness,
                    borderRadius: tokens.radius.full,
                    backgroundColor: filled ? colors.primary : colors.border,
                } }));
            if (!onDotPress) {
                return bars ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: segment }, i)) : ((0, jsx_runtime_1.jsx)(React.Fragment, { children: segment }, i));
            }
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Go to step ${i + 1}`, accessibilityState: { selected: active }, hitSlop: tokens.spacing.sm, onPress: () => onDotPress(i), style: bars ? { flex: 1 } : undefined, children: segment }, i));
        }) }));
}
//# sourceMappingURL=ProgressDots.js.map
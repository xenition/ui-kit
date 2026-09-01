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
exports.ProgressDotsV3 = ProgressDotsV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** §10.1 geometry: the ring's diameter and its stroke. */
const RING = 8;
const STROKE = 2;
/**
 * Paged progress — V3, the compact line: **rings**. Every step is an outlined
 * circle; the ones already walked are filled solid, the current one keeps its
 * outline and gains the brand fill, the rest stay hollow.
 *
 * Where it earns its place: over artwork. The base's filled bars and V2's
 * track both need a quiet ground to read against, and an onboarding whose hero
 * runs to the top edge does not have one — hollow rings with a stroke survive a
 * busy photograph in a way a low-contrast bar does not.
 *
 * Denser than the base at the same count, because a ring reads at a smaller
 * size than a bar does, which is the other half of "compact".
 *
 * `variant` is accepted and ignored: this line has one treatment, and a
 * `'bars'` request here is an app asking for the base line.
 *
 * Same props as {@link ProgressDots}. Token-pure.
 */
function ProgressDotsV3({ count, activeIndex, size = 'md', onDotPress, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(0, Math.floor(count));
    const diameter = size === 'sm' ? RING : RING * 1.5;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: {
            min: 1,
            max: Math.max(1, total),
            now: Math.min(activeIndex + 1, total),
        }, accessibilityLabel: accessibilityLabel ?? `Step ${Math.min(activeIndex + 1, total)} of ${total}`, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: Array.from({ length: total }, (_, i) => {
            const walked = i < activeIndex;
            const current = i === activeIndex;
            const ring = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: diameter,
                    height: diameter,
                    borderRadius: tokens.radius.full,
                    borderWidth: STROKE,
                    borderColor: walked || current ? colors.primary : colors.border,
                    backgroundColor: walked || current ? colors.primary : 'transparent',
                    // The current step keeps a hairline of surface inside its fill,
                    // so "here" and "done" are distinguishable without colour alone.
                    opacity: current ? 1 : walked ? 0.55 : 1,
                } }));
            if (!onDotPress)
                return (0, jsx_runtime_1.jsx)(React.Fragment, { children: ring }, i);
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Go to step ${i + 1}`, accessibilityState: { selected: current }, hitSlop: tokens.spacing.md, onPress: () => onDotPress(i), children: ring }, i));
        }) }));
}
//# sourceMappingURL=ProgressDotsV3.js.map
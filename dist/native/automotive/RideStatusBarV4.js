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
exports.RideStatusBarV4 = RideStatusBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const fleet_v4_1 = require("./internal/fleet-v4");
/** The stages, in order. Domain knowledge, so it stays here. */
const STAGES = [
    { key: 'requested', label: 'Requested', glyph: '🔍' },
    { key: 'arriving', label: 'Arriving', glyph: '🚗' },
    { key: 'in-trip', label: 'In trip', glyph: '🧭' },
    { key: 'completed', label: 'Completed', glyph: '🏁' },
];
/** How far a cancelled band's ground travels from the card toward `danger`. */
const CANCELLED_TINT = 0.1;
/** The connector's thickness. A hairline is 1; a rail wants two. */
const RAIL = 2;
/**
 * **V4 ride status bar** — same props as {@link RideStatusBar} plus
 * `stageLabels`, `cancelledLabel` and `formatStep`.
 *
 * ## Four changes
 *
 * 1. **A walked stage stays filled.** The base marked only the *current*
 *    stage, so the bar answered "which one is selected" when the question a
 *    rider is asking is "how far through am I".
 * 2. **The cancelled band's ink is contrast-corrected.** `colors.danger` on a
 *    10%-danger ground is the fill slot used as text at the one moment the
 *    user most needs to read it.
 * 3. **The connector reports progress**, with `accessibilityRole="progressbar"`
 *    and a real value, instead of being decorative.
 * 4. **Every stage word is a prop**, and the step position is spoken.
 */
function RideStatusBarV4({ stage, detail, cancelled = false, variant = 'stepper', stageLabels, cancelledLabel = 'Cancelled', formatStep, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (cancelled) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "alert", accessibilityLabel: [cancelledLabel, detail].filter(Boolean).join(', '), style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: (0, v4_depth_1.mixToken)(colors.card, colors.danger, CANCELLED_TINT),
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "base", style: { color: (0, fleet_v4_1.toneInk)(theme, 'danger') } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "dangerText", children: cancelledLabel }), detail ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: detail })) : null] })] }));
    }
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
    const current = STAGES[activeIndex] ?? STAGES[0];
    const currentLabel = stageLabels?.[current.key] ?? current.label;
    const step = (formatStep ?? ((n, of) => `step ${n} of ${of}`))(activeIndex + 1, STAGES.length);
    const spoken = [currentLabel, step, detail].filter(Boolean).join(', ');
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityValue: { min: 1, max: STAGES.length, now: activeIndex + 1 }, accessibilityLabel: spoken, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: current.glyph, size: "base" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", style: { flex: 1 }, children: currentLabel }), detail ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: detail })) : null] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityValue: { min: 1, max: STAGES.length, now: activeIndex + 1 }, accessibilityLabel: spoken, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center' }, children: STAGES.map((s, i) => {
                    // A stage already walked stays filled: the bar answers "how far
                    // through am I", not "which one is selected".
                    const walked = i <= activeIndex;
                    const tone = walked ? 'primary' : 'neutral';
                    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    flex: 1,
                                    height: RAIL,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: walked ? colors.primary : colors.border,
                                } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: tokens.spacing.lg,
                                    height: tokens.spacing.lg,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: walked ? (0, fleet_v4_1.toneFill)(theme, tone) : colors.muted,
                                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: (0, fleet_v4_1.onPair)(theme, walked ? 'primary' : 'neutral') }, children: s.glyph }) })] }, s.key));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", style: { flex: 1 }, children: currentLabel }), detail ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: detail })) : null] })] }));
}
//# sourceMappingURL=RideStatusBarV4.js.map
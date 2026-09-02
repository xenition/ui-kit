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
exports.BodyMetricCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SparklineV4_1 = require("../charts/SparklineV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const goal_v4_1 = require("./goal-v4");
const tone_v4_2 = require("./internal/tone-v4");
/** Identity only. A body metric is a subject, not a status. */
const BODY_META = {
    weight: { glyph: '⚖️', label: 'Weight', unit: 'kg' },
    bmi: { glyph: '📊', label: 'BMI', unit: '' },
    'body-fat': { glyph: '📉', label: 'Body fat', unit: '%' },
    muscle: { glyph: '💪', label: 'Muscle mass', unit: 'kg' },
    waist: { glyph: '📏', label: 'Waist', unit: 'cm' },
    'blood-sugar': { glyph: '🩸', label: 'Blood sugar', unit: 'mg/dL' },
};
/**
 * **V4 body metric card** — same props as {@link BodyMetricCard} plus `range`,
 * `label`, `rangeLabels` and `appearance` (`unit` was already there).
 *
 * ## Five changes
 *
 * 1. **The drop the card exists to show never reached a screen reader.** The
 *    delta was computed, tinted and drawn, and then left out of the accessible
 *    name — and because the whole card was a `role="button"`, that name
 *    *replaced* its contents. So "▼ 1.2 kg", the entire point of a weight card,
 *    was sighted-only.
 * 2. **A fasting glucose of 260 mg/dL rendered identically to 95.** There was
 *    no way to express a normal band at all. Pass a `range` and the reading
 *    takes its tone and a word from `rangeVerdict`; with none, nothing changes.
 * 3. **The sparkline is a sibling, not a descendant.** Inside `role="button"`
 *    it was pruned along with everything else, so the trend it draws had no
 *    name of its own. It now sits beside the activation and keeps one.
 * 4. **The activation is a real `<button>` that clears 44.** `div` +
 *    `role="button"` + `tabIndex` + a hand-written Enter/Space handler is three
 *    approximations of a button.
 * 5. **Press is a state layer and the ink is the corrected slot.**
 *    `hover:opacity-90` is M3's disabled band spent on hover, and
 *    `text-success` is a fill token doing a text colour's job.
 */
exports.BodyMetricCardV4 = React.forwardRef(function BodyMetricCardV4({ variant, value, unit, delta, lowerIsBetter = false, trend, onPress, range, label, rangeLabels, appearance = 'classic', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const meta = BODY_META[variant];
    const resolvedUnit = unit ?? meta.unit;
    const resolvedLabel = label ?? meta.label;
    const numeric = typeof value === 'number' ? value : Number(String(value));
    const verdict = Number.isFinite(numeric) ? (0, goal_v4_1.rangeVerdict)(numeric, range) : undefined;
    const verdictWord = verdict ? (rangeLabels?.[verdict] ?? tone_v4_2.VERDICT_LABEL[verdict]) : undefined;
    // A delta's direction genuinely is good or bad news, so this is a status
    // colour spent on a status — unlike the variant tints change 2 retires.
    const change = delta != null && delta !== 0 ? delta : undefined;
    const good = change === undefined ? false : lowerIsBetter ? change < 0 : change > 0;
    const deltaText = change === undefined
        ? undefined
        : `${change > 0 ? '+' : '−'}${Math.abs(change)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`;
    const name = (0, tone_v4_2.spokenLine)([
        resolvedLabel,
        `${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`,
        verdictWord,
        deltaText,
    ]);
    const head = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-base leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: resolvedLabel })] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl font-bold', verdict ? tone_v4_1.TONE_INK[tone_v4_2.VERDICT_TONE[verdict]] : 'text-on-card'), children: value }), resolvedUnit ? (0, jsx_runtime_1.jsx)("span", { className: "text-base text-muted-text", children: resolvedUnit }) : null] }), verdictWord ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', tone_v4_1.TONE_INK[tone_v4_2.VERDICT_TONE[verdict]]), children: verdictWord })) : null, deltaText ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold', good ? tone_v4_1.TONE_INK.success : tone_v4_1.TONE_INK.danger), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: change !== undefined && change > 0 ? '▲ ' : '▼ ' }), deltaText] })) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_2.HEALTH_CARD_CLASS, (0, tone_v4_2.appearanceClass)(appearance), className), ...rest, children: [onPress ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: onPress, "data-xen-v4-state": "", style: (0, tone_v4_2.appearanceStateVars)(appearance), className: (0, cn_1.cn)('flex flex-col gap-xs rounded-[var(--xen-radius-md)] bg-transparent text-left', chrome_v4_1.MIN_TAP_CLASS, tone_v4_2.FOCUS_RING_CLASS), children: head })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex flex-col gap-xs", children: head })), trend && trend.length > 0 ? ((0, jsx_runtime_1.jsx)(SparklineV4_1.SparklineV4, { data: trend, tone: change === undefined ? undefined : good ? 'success' : 'danger', "aria-label": `${resolvedLabel} trend over ${trend.length} readings` })) : null] }));
});
//# sourceMappingURL=BodyMetricCardV4.js.map
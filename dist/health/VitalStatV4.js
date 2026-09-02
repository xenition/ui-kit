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
exports.VitalStatV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const goal_v4_1 = require("./goal-v4");
const tone_v4_2 = require("./internal/tone-v4");
/**
 * Identity only — glyph, name and unit.
 *
 * The base's fourth field was a `color`, and dropping it is change 1: a
 * discipline, a category or a vital sign is *not* a status, and spending
 * `danger` on "this tile is about the heart" leaves nothing to say when the
 * heart rate is actually dangerous.
 */
const VITAL_META = {
    'heart-rate': { glyph: '❤️', label: 'Heart rate', unit: 'bpm' },
    steps: { glyph: '👟', label: 'Steps', unit: '' },
    calories: { glyph: '🔥', label: 'Calories', unit: 'kcal' },
    distance: { glyph: '📍', label: 'Distance', unit: 'km' },
    oxygen: { glyph: '🫁', label: 'Blood oxygen', unit: '%' },
    'blood-pressure': { glyph: '🩺', label: 'Blood pressure', unit: 'mmHg' },
    temperature: { glyph: '🌡️', label: 'Temperature', unit: '°C' },
    respiration: { glyph: '💨', label: 'Respiration', unit: 'br/min' },
};
/**
 * **V4 vital stat** — same props as {@link VitalStat} plus `range`,
 * `rangeLabels` and `appearance` (`label` and `unit` were already there).
 *
 * ## Five changes
 *
 * 1. **A resting 58 bpm and a dangerous 190 bpm rendered identically.** The
 *    tone was fixed by `variant` — `heart-rate` was permanently `danger`,
 *    `temperature` permanently `warn` — so the status vocabulary was spent on
 *    *identity* and had nothing left to say about the reading. The glyph now
 *    carries the identity; pass a `range` and `success`/`warn`/`danger` mean
 *    what they say, with a word beside them so nothing rests on colour. With no
 *    `range` the tile behaves exactly as it did.
 * 2. **The delta reached sighted users only.** The card computed it, coloured
 *    it and drew it — and then left it out of the accessible name, which, once
 *    the tile was a `role="button"`, *replaced* its contents. The one number
 *    that says whether the reading is moving was silently dropped.
 * 3. **The activation is a real `<button>` and clears 44.** `div` +
 *    `role="button"` + `tabIndex` + a hand-written Enter/Space handler is three
 *    approximations of a button, and it sat inside a tile with no minimum
 *    height.
 * 4. **Press is a state layer.** `hover:opacity-80` dims the tile's own
 *    content, which is M3's *disabled* signal.
 * 5. **The value is inked with the corrected slot**, not the fill token — the
 *    largest number on the tile was drawn in `var(--xen-danger)`, measured as
 *    low as 1.32:1 against the card.
 */
exports.VitalStatV4 = React.forwardRef(function VitalStatV4({ variant, value, unit, label, delta, onPress, range, rangeLabels, appearance = 'classic', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const meta = VITAL_META[variant];
    const resolvedUnit = unit ?? meta.unit;
    const resolvedLabel = label ?? meta.label;
    // `Number(value)` because `value` is a ReactNode: a tile showing "120/80" has
    // no single reading to classify, and `rangeVerdict` on NaN is honest about it.
    const numeric = typeof value === 'number' ? value : Number(String(value));
    const verdict = Number.isFinite(numeric) ? (0, goal_v4_1.rangeVerdict)(numeric, range) : undefined;
    const verdictWord = verdict ? (rangeLabels?.[verdict] ?? tone_v4_2.VERDICT_LABEL[verdict]) : undefined;
    const deltaWord = delta == null || delta === 0 ? undefined : `${delta > 0 ? '+' : '−'}${Math.abs(delta)}`;
    const deltaInk = delta == null || delta === 0 ? 'text-muted-text' : delta > 0 ? tone_v4_1.TONE_INK.success : tone_v4_1.TONE_INK.danger;
    const name = (0, tone_v4_2.spokenLine)([
        resolvedLabel,
        `${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`,
        verdictWord,
        deltaWord,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-base leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs text-muted-text", children: resolvedLabel })] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold', verdict ? tone_v4_1.TONE_INK[tone_v4_2.VERDICT_TONE[verdict]] : 'text-on-card'), children: value }), resolvedUnit ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: resolvedUnit }) : null] }), verdictWord ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', tone_v4_1.TONE_INK[tone_v4_2.VERDICT_TONE[verdict]]), children: verdictWord })) : null, deltaWord ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', deltaInk), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: delta != null && delta > 0 ? '▲ ' : '▼ ' }), deltaWord] })) : null] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-xs', tone_v4_2.HEALTH_TILE_CLASS, (0, tone_v4_2.appearanceClass)(appearance), className), ...rest, children: onPress ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: onPress, "data-xen-v4-state": "", style: (0, tone_v4_2.appearanceStateVars)(appearance), className: (0, cn_1.cn)('flex flex-col gap-xs rounded-[var(--xen-radius-sm)] bg-transparent text-left', chrome_v4_1.MIN_TAP_CLASS, tone_v4_2.FOCUS_RING_CLASS), children: body })) : (body) }));
});
//# sourceMappingURL=VitalStatV4.js.map
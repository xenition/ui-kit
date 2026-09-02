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
exports.StreakCounterV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const goal_v4_1 = require("./goal-v4");
const tone_v4_2 = require("./internal/tone-v4");
/**
 * **V4 streak counter** — same props as {@link StreakCounter} plus
 * `unitPlural`, `emptyLabel`, `bestLabel`, `formatCount` and `appearance`.
 *
 * ## Four changes
 *
 * 1. **`unit="día"` rendered "díass".** The base appended `'s'` unconditionally,
 *    so every non-English unit was wrong and every irregular English one too
 *    ("2 weeklys"). `pluralizeUnit` keeps the `'s'` default for callers who
 *    never said otherwise and lets everyone else pass `unitPlural`.
 * 2. **Four English strings are now props.** "Start your streak" and "Best:"
 *    were baked in, which meant a localised app could not use the component at
 *    all without forking it.
 * 3. **The number is inked with the corrected slot.** `TEXT_CLASS` maps
 *    `warn` — the default tone — to `text-warn`, which is `var(--xen-warn)`: a
 *    **fill**, with no contrast promise as text. The streak count is the
 *    largest thing on the component and was the least readable.
 * 4. **The record line is part of the name.** "Best: 40" sat outside the
 *    `group`'s label, so the one number that gives the current streak its
 *    meaning was sighted-only.
 */
exports.StreakCounterV4 = React.forwardRef(function StreakCounterV4({ count, unit = 'day', label = 'streak', tone = 'warn', best, unitPlural, emptyLabel = 'Start your streak', bestLabel = 'Best', formatCount, appearance = 'classic', className, ...rest }, ref) {
    const safe = Math.max(Math.floor(count), 0);
    const show = formatCount ?? ((value) => String(value));
    const unitWord = (0, goal_v4_1.pluralizeUnit)(safe, unit, unitPlural);
    const record = best != null && best > 0 ? Math.max(Math.floor(best), 0) : undefined;
    const recordLine = record != null ? `${bestLabel}: ${show(record)}` : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": (0, tone_v4_2.spokenLine)([
            safe === 0 ? emptyLabel : `${show(safe)} ${unitWord} ${label}`,
            recordLine,
        ]), className: (0, cn_1.cn)('flex flex-col items-center gap-xs', (0, tone_v4_2.frameClass)(appearance), className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-2xl leading-none", children: safe === 0 ? '🌱' : '🔥' }), safe === 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl font-bold leading-none', tone_v4_1.TONE_INK[tone]), children: show(safe) }), (0, jsx_runtime_1.jsx)("span", { className: "text-base text-muted-text", children: unitWord })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-card", children: label })] })), recordLine ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: recordLine }) : null] }));
});
//# sourceMappingURL=StreakCounterV4.js.map
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
exports.CountdownBadgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const event_v4_1 = require("./internal/event-v4");
/**
 * Fill and its guaranteed ink, per tone.
 *
 * `neutral` was `bg-border` with `text-on-surface` on it — a hairline token
 * used as a surface, carrying an ink the compiler never paired it with. Every
 * tone now takes the shared table's fill and the ink that table guarantees
 * against it.
 */
const TONE_CHIP = {
    primary: `${tone_v4_1.TONE_BG.primary} ${tone_v4_1.TONE_ON.primary}`,
    accent: `${tone_v4_1.TONE_BG.accent} ${tone_v4_1.TONE_ON.accent}`,
    neutral: `${tone_v4_1.TONE_BG.neutral} ${tone_v4_1.TONE_ON.neutral}`,
};
/** The elapsed and unknown chips: the neutral fill and its paired ink. */
const NEUTRAL_CHIP = `${tone_v4_1.TONE_BG.neutral} ${tone_v4_1.TONE_ON.neutral}`;
const pad = (n) => String(n).padStart(2, '0');
/**
 * **V4 countdown badge** — the web twin of the native `CountdownBadgeV4`, same
 * props as {@link CountdownBadge} plus `unitLabels` and `unknownLabel`.
 *
 * ## Four changes
 *
 * 1. **It stops announcing "Started" about an event nobody dated.** With
 *    neither `remainingMs` nor `target` the base fell through to `ms = 0`, and
 *    a zero delta reports elapsed — so a badge that had been told nothing
 *    confidently said the event had already begun. `countdownParts` returns
 *    `known: false` for that case and the badge renders `unknownLabel`.
 * 2. **The announcement is pluralised and actually lands.** It said "1 days 1
 *    hours 1 minutes", and it said it through `aria-label` on a role-less
 *    `div`, where a label is ignored outright. `countdownSentence()` fixes the
 *    grammar; `role="timer"` gives the label somewhere to attach.
 * 3. **The elapsed chip stops pairing `on-surface` ink with a `border` fill.**
 *    A hairline colour has no contrast promise as a surface. The elapsed and
 *    unknown chips take the neutral tone's fill and the ink the shared tone
 *    table guarantees against it — a pill, not a tag, so it keeps its radius.
 * 4. **The figures are tabular and the tiles are one token wide**, so a
 *    countdown does not jitter sideways as each digit ticks over, and the two
 *    twins compose the same width instead of `3rem` and `48`. `font-extrabold`
 *    is off the kit's weight scale.
 */
exports.CountdownBadgeV4 = React.forwardRef(function CountdownBadgeV4({ target, remainingMs, now, label, elapsedLabel = 'Started', variant = 'inline', tone = 'primary', unitLabels, unknownLabel = 'Date to be announced', className, ...rest }, ref) {
    // `undefined` where the base wrote `0`: "it has started" and "nobody told
    // me when it starts" are different answers and must not share a value.
    const ms = typeof remainingMs === 'number'
        ? remainingMs
        : target
            ? target.getTime() - (now ?? new Date()).getTime()
            : undefined;
    const parts = (0, event_v4_1.countdownParts)(ms);
    const chip = TONE_CHIP[tone];
    if (!parts.known) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "timer", "aria-label": unknownLabel, className: (0, cn_1.cn)('inline-flex self-start rounded-full px-md py-xs', NEUTRAL_CHIP, className), ...rest, children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold", children: unknownLabel }) }));
    }
    if (parts.elapsed) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "timer", "aria-label": elapsedLabel, className: (0, cn_1.cn)('inline-flex self-start rounded-full px-md py-xs', NEUTRAL_CHIP, className), ...rest, children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold", children: elapsedLabel }) }));
    }
    const spoken = (0, event_v4_1.spokenLine)([label, (0, event_v4_1.countdownSentence)(parts, unitLabels ?? {})]);
    if (variant === 'blocks') {
        const blocks = [
            { value: pad(parts.days), unit: 'DAY' },
            { value: pad(parts.hours), unit: 'HR' },
            { value: pad(parts.minutes), unit: 'MIN' },
        ];
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "timer", "aria-label": spoken, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [label ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: label }) : null, (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex flex-row gap-xs", children: blocks.map((b) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-[var(--xen-space-2xl)] flex-col items-center rounded-[var(--xen-radius-md)] px-sm py-sm', chip), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-bold', event_v4_1.TABULAR_CLASS), children: b.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs", children: b.unit })] }, b.unit))) })] }));
    }
    const compact = `${parts.days > 0 ? `${parts.days}d ` : ''}${pad(parts.hours)}h ${pad(parts.minutes)}m`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "timer", "aria-label": spoken, className: (0, cn_1.cn)('inline-flex flex-row items-center gap-xs self-start rounded-full px-md py-xs', chip, className), ...rest, children: [label ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-semibold", children: label })) : null, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm font-bold', event_v4_1.TABULAR_CLASS), children: compact })] }));
});
//# sourceMappingURL=CountdownBadgeV4.js.map
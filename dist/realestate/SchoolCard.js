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
exports.SchoolCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Map a 0–10 rating to its tier: high (≥7) → success, mid (≥4) → warn,
 * low (<4) → danger. The score reads by BOTH number and color.
 */
function scoreTier(rating) {
    if (rating >= 7)
        return 'success';
    if (rating >= 4)
        return 'warn';
    return 'danger';
}
const DISC_BG = {
    success: 'bg-success/15',
    warn: 'bg-warn/15',
    danger: 'bg-danger/15',
};
const DISC_TEXT = {
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
};
/**
 * SchoolCard — **V4** "listing" design. A nearby-school rating card: the 0–10
 * rating in a score-tinted disc (high → success, mid → warn, low → danger) on
 * the left, the school name as the headline, the level + distance beneath, and
 * an optional grades footnote. The score is legible by BOTH its big numeral and
 * its color. Editorial, rounded elevated card, 8-pt spacing. Presentational
 * only — all colors from `--xen-*` token classes, no literals; dark-mode safe.
 * When `onPress` is set the card is a keyboard-activatable button.
 */
exports.SchoolCard = React.forwardRef(function SchoolCard({ name, rating, level, distanceLabel, gradesLabel, onPress, className, ...rest }, ref) {
    const clamped = Math.max(0, Math.min(10, rating));
    const tier = scoreTier(clamped);
    const scoreText = Number.isInteger(clamped) ? String(clamped) : clamped.toFixed(1);
    const meta = [level, distanceLabel].filter(Boolean).join(' · ');
    const label = `${name}, rated ${scoreText} out of 10${meta ? `, ${meta}` : ''}${gradesLabel ? `, grades ${gradesLabel}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, onClick: onPress, className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md', onPress &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...(0, internal_1.clickableProps)(onPress, label), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-[var(--xen-radius-md)]', DISC_BG[tier]), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold leading-none tabular-nums', DISC_TEXT[tier]), children: scoreText }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-[10px] font-semibold leading-none', DISC_TEXT[tier]), children: "/ 10" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: meta }) : null, gradesLabel ? (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted", children: ["Grades ", gradesLabel] }) : null] })] }));
});
//# sourceMappingURL=SchoolCard.js.map
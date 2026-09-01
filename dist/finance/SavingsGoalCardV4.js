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
exports.SavingsGoalCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const card_ground_v4_1 = require("../primitives/internal/card-ground-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const ProgressRing_1 = require("../charts/ProgressRing");
const money_1 = require("../commerce/money");
const ledger_v4_1 = require("./internal/ledger-v4");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
/** The words after a positive remainder. */
const TO_GO_LABEL = 'to go';
/** The ring's diameter and stroke — the base's own numbers, kept. */
const RING_SIZE = 84;
const RING_THICKNESS = 9;
/**
 * **V4 savings goal card** — the web twin of the native `SavingsGoalCardV4`,
 * same props as {@link SavingsGoalCard} plus `overLabel`.
 *
 * ## Four changes
 *
 * 1. **Beating the goal is visible.** `Math.min(saved / target, 1)` and
 *    `Math.max(target - saved, 0)` floored the overshoot twice over, so
 *    $12,000 against a $10,000 goal rendered identically to landing exactly on
 *    target — a full ring, "100%", and "$0.00 to go". The ring still fills
 *    once, because a ring cannot say 120%, but the figure beside it now does.
 * 2. **The ring is a `progressbar` with a value.** It was a `role="img"` on
 *    both twins, so the one number the card exists to report reached a reader
 *    as a picture. `aria-valuenow` is the clamped ratio the ring draws and
 *    `aria-valuetext` is the true percentage.
 * 3. **The ring's own centred readout is off, and the percentage is written
 *    out instead.** `ProgressRing` clamps what it prints, so leaving it on
 *    would have put "100%" inside a card whose text says 120% — the same
 *    disagreement change 1 removes.
 * 4. **The card is on `card` and its captions on `muted-text`**, where it
 *    painted `surface` (the page colour, so it read flat in dark mode) and
 *    inked its captions with `muted`, a ramp step with no contrast promise.
 */
exports.SavingsGoalCardV4 = React.forwardRef(function SavingsGoalCardV4({ title, savedCents, targetCents, currency = 'USD', deadline, color = 'success', formatMoney: format = money_1.formatMoney, overLabel = 'saved over goal', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(card_ground_v4_1.V4_CARD_GROUND_STYLE_ID, card_ground_v4_1.V4_CARD_GROUND_CSS);
    }, []);
    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
    const { ratio, percent, over } = (0, ledger_v4_1.meterParts)(saved, target);
    const gap = target - saved; // negative once the goal is beaten
    const percentText = `${new Intl.NumberFormat().format(percent)}%`;
    const gapText = `${format(Math.abs(gap), currency)} ${over ? overLabel : TO_GO_LABEL}`;
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, ...card_ground_v4_1.V4_CARD_GROUND_ATTR, variant: "outlined", radius: "lg", padding: "lg", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-lg", children: [(0, jsx_runtime_1.jsx)(ProgressRing_1.ProgressRing, { role: "progressbar", "aria-label": (0, ledger_v4_1.spokenLine)([title, percentText]), "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(ratio * 100), "aria-valuetext": percentText, value: ratio * 100, max: 100, size: RING_SIZE, thickness: RING_THICKNESS, color: color, showValue: false }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-card", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: saved, currency: currency, formatMoney: format, tone: "neutral", size: "md" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-muted-text', ledger_v4_1.TABULAR_CLASS), children: `/ ${format(target, currency)}` })] }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs text-muted-text', ledger_v4_1.TABULAR_CLASS), children: (0, tone_v4_1.metaLine)([percentText, gapText, deadline != null ? `by ${deadline}` : undefined]) })] })] }) }));
});
//# sourceMappingURL=SavingsGoalCardV4.js.map
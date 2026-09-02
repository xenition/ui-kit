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
exports.LeaveBalanceV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const ProgressV4_1 = require("../primitives/ProgressV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const workforce_v4_1 = require("./workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * The default for {@link LeaveBalanceV4Props.overdrawnLabel} — what an
 * over-drawn balance says instead of a negative number.
 *
 * A balance past its entitlement is the one figure here a person acts on, and
 * "−2 days" is arithmetic rather than an answer: it reads as a quantity of
 * leave the employee has, spelled oddly.
 */
const OVERDRAWN = 'Over entitlement';
/**
 * **V4 leave balance** — a new component, so it has no base to extend.
 *
 * ## Why it exists
 *
 * `LeaveRequest` asks for `days` and the module has nowhere to say what those
 * days are being taken **out of**. An employee looking at "3 days — Pending"
 * cannot tell whether that is a third of what they have left or more than they
 * are owed, and a manager approving it is in the same position. Every other
 * quantity in `hr` has its context beside it — gross against net, overtime
 * against hours worked, goals against a target — and the one number an
 * employee actually plans around had none.
 *
 * ## Four things it is careful about
 *
 * 1. **The entitlement is accrued *plus* carryover.** Carried-over days are
 *    spendable; a balance that meters against the accrual alone tells someone
 *    they are out of leave while five carried days sit unused.
 * 2. **Remaining never goes negative.** Payroll systems do let a balance go
 *    under — a taken figure past the entitlement is real — so the meter fills
 *    to 100% and the overage is stated as a word rather than drawn as a bar
 *    running off its own track.
 * 3. **The meter is a real `progressbar`** with its value exposed, and it is a
 *    sibling of any activation rather than a child of it: inside a
 *    `role="button"` a `progressbar`'s value is presentational and dropped.
 * 4. **The overage word is a prop.** Every other visible string here is
 *    {@link LeaveBalanceV4Props.accruedLabel} and its neighbours, and this one
 *    sits on the figure a person acts on, so it is
 *    {@link LeaveBalanceV4Props.overdrawnLabel} rather than an English literal
 *    a caller cannot reach — and it reaches the spoken name too, which used to
 *    say "Remaining 0 days" and stop there.
 */
exports.LeaveBalanceV4 = React.forwardRef(function LeaveBalanceV4({ type, label, accruedDays, takenDays, carryoverDays = 0, periodLabel, variant = 'default', formatDays, accruedLabel = 'Accrued', takenLabel = 'Taken', remainingLabel = 'Remaining', carryoverLabel = 'Carryover', overdrawnLabel = OVERDRAWN, onClick, testID, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const compact = variant === 'compact';
    const typeMeta = type ? tone_v4_1.LEAVE_TYPE_META_V4[type] : undefined;
    const name = label ?? typeMeta?.label;
    // A balance with nothing to name is a meter measuring an unlabelled thing.
    if (!name)
        return null;
    const days = (value) => Math.max(0, Number.isFinite(value) ? value : 0);
    const accrued = days(accruedDays);
    const carryover = days(carryoverDays);
    const taken = days(takenDays);
    const entitlement = accrued + carryover;
    const remaining = Math.max(0, entitlement - taken);
    const overdrawn = taken > entitlement;
    const fmt = formatDays ?? ((n) => (0, workforce_v4_1.pluralizeCount)(n, 'day'));
    const pct = (0, tone_v4_1.clampPercent)(entitlement > 0 ? (taken / entitlement) * 100 : 0) ?? 0;
    const interactive = onClick != null;
    const heading = ((0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 items-center gap-xs text-left", children: [typeMeta ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: typeMeta.glyph }) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-card", children: name }), periodLabel ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted-text", children: periodLabel })) : null] }));
    const meterName = `${name}, ${remainingLabel}`;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-sm", children: interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([
                        name,
                        periodLabel,
                        `${remainingLabel} ${fmt(remaining)}`,
                        // Otherwise the name stops at "Remaining 0 days", which is the
                        // one reading of an over-drawn balance that is not true.
                        overdrawn ? overdrawnLabel : undefined,
                        `${takenLabel} ${fmt(taken)}`,
                        `${accruedLabel} ${fmt(accrued)}`,
                        carryover > 0 ? `${carryoverLabel} ${fmt(carryover)}` : undefined,
                    ]), onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: heading })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center", children: heading })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold text-on-card', tone_v4_1.TABULAR_CLASS), children: fmt(remaining) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: remainingLabel })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, max: 100, size: "sm", "aria-label": meterName, "aria-valuetext": `${fmt(taken)} / ${fmt(entitlement)}` }), overdrawn ? (
            // The bar cannot run past its own track, so the overage is a word.
            (0, jsx_runtime_1.jsxs)("p", { className: "text-xs font-semibold text-warn-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u26A0 " }), (0, tone_v4_1.metaLine)([overdrawnLabel, `${takenLabel} ${fmt(taken)} / ${fmt(entitlement)}`])] })) : null, !compact ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-lg", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: accruedLabel }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm font-semibold text-on-card', tone_v4_1.TABULAR_CLASS), children: fmt(accrued) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: takenLabel }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm font-semibold text-on-card', tone_v4_1.TABULAR_CLASS), children: fmt(taken) })] }), carryover > 0 ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: carryoverLabel }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm font-semibold text-on-card', tone_v4_1.TABULAR_CLASS), children: fmt(carryover) })] })) : null] })) : null] }));
});
//# sourceMappingURL=LeaveBalanceV4.js.map
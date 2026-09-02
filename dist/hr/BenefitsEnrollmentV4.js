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
exports.BenefitsEnrollmentV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const ButtonV4_1 = require("../primitives/ButtonV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const money_1 = require("../commerce/money");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/**
 * **V4 benefits enrollment** — the web twin of the native
 * `BenefitsEnrollmentV4`, same props as {@link BenefitsEnrollment} plus
 * `enrollLabel`, `formatMoney`, `formatEnrollBy` and `testID`.
 *
 * ## Five changes
 *
 * 1. **Enrolling from the keyboard actually enrolls.** Enroll was a
 *    `<Button>` inside a `<Card role="button">` with its own Enter/Space
 *    handler. Its click was guarded with `stopPropagation`; its keydown was
 *    not, and the card's `preventDefault()` on the bubbled Enter cancels the
 *    button's own activation — so an employee tabbing to Enroll during open
 *    enrollment opened the plan detail and enrolled in nothing, before a
 *    deadline. The card is a plain container now and Enroll is a **sibling**
 *    of its activation.
 * 2. **The card is one accessible name.** `Benefit PPO Gold, Eligible`
 *    dropped the coverage tier, the cost and the enrollment deadline — the
 *    three facts the decision is made on.
 * 3. **Benefit type stops spending a status colour.** `retirement: success`
 *    and `dental: accent` made a plan list read as a scoreboard; the glyph
 *    already says what kind of plan it is.
 * 4. **Enroll is drawn the same way on both twins.** Web passed
 *    `variant="secondary"` and native `variant="soft"`, so the same action had
 *    two weights. Both are `soft`, and it clears 44.
 * 5. **Money is overridable and column-aligned.** `formatMoney`'s third
 *    `locale` argument was unreachable from any prop.
 */
exports.BenefitsEnrollmentV4 = React.forwardRef(function BenefitsEnrollmentV4({ planName, type, status, coverage, costCents, costPeriod = '/mo', currency = 'USD', enrollBy, actionable = false, variant = 'default', onEnroll, onClick, enrollLabel, formatMoney = money_1.formatMoney, formatEnrollBy, testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    // A plan with no name is a bordered box around a price.
    if (!planName)
        return null;
    const compact = variant === 'compact';
    const typeMeta = tone_v4_1.BENEFIT_TYPE_META_V4[type];
    const statusMeta = internal_1.BENEFIT_STATUS_META[status];
    const showAction = actionable && (status === 'eligible' || status === 'pending');
    const enrolled = status === 'enrolled';
    const interactive = onClick != null;
    const cost = costCents != null ? formatMoney(costCents, currency) : undefined;
    const deadline = !compact && enrollBy && !enrolled
        ? (formatEnrollBy ?? ((d) => `Enroll by ${d}`))(enrollBy)
        : undefined;
    const actionWord = enrollLabel ?? (status === 'pending' ? 'Complete enrollment' : 'Enroll');
    const summary = ((0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base", children: typeMeta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-card", children: planName })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: typeMeta.label })] }));
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-sm", children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([
                            'Benefit',
                            planName,
                            typeMeta.label,
                            statusMeta.label,
                            coverage,
                            cost ? `${cost}${costPeriod}` : undefined,
                            deadline,
                        ]), onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-start gap-sm rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-start gap-sm", children: summary })), (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", "aria-hidden": interactive || undefined })] }), !compact && coverage ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: coverage }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-sm", children: [cost ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-bold text-on-card', tone_v4_1.TABULAR_CLASS), children: cost }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: costPeriod })] })) : ((0, jsx_runtime_1.jsx)("span", {})), deadline ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: deadline }) : null] }), showAction ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "soft", className: tone_v4_1.MIN_TAP_CLASS, onClick: onEnroll, children: actionWord })) : null] }));
});
//# sourceMappingURL=BenefitsEnrollmentV4.js.map
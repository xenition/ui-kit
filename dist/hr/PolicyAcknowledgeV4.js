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
exports.PolicyAcknowledgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CheckboxV4_1 = require("../primitives/CheckboxV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const StatusPillV4_1 = require("./StatusPillV4");
const workforce_v4_1 = require("./workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/**
 * **V4 policy acknowledgement** — the web twin of the native
 * `PolicyAcknowledgeV4`, same props as {@link PolicyAcknowledge} plus
 * `dueDate`, a controlled `acknowledged`, `acknowledgeLabel`,
 * `formatEffective`, `formatDue` and `testID`.
 *
 * ## Five changes
 *
 * 1. **A server-side rejection can clear the tick.** Consent was uncontrolled
 *    `useState`. A caller that posted the acknowledgement, had it refused, and
 *    set `acknowledged={false}` again could not un-tick the box the employee
 *    was looking at — so the card said the policy had been agreed to and the
 *    record said it had not. The tick now follows the prop.
 * 2. **The consent checkbox is a 44 target.** It was a bare 16px `<input>` on
 *    the one control that turns a policy into a signed record.
 * 3. **The consent line is named once.** `aria-label={consentLabel}` on the
 *    input *and* the same sentence as the `<label>`'s visible text meant a
 *    reader was handed the sentence twice. The label names the input; the
 *    input carries no second name.
 * 4. **An overdue policy says when it was due.** See `dueDate`.
 * 5. **The status words are inked with ink slots.** "✓ Acknowledged" was drawn
 *    in `text-success` — a **fill** token, guaranteed readable only *under*
 *    `on-success`, not as text.
 */
exports.PolicyAcknowledgeV4 = React.forwardRef(function PolicyAcknowledgeV4({ title, version, effectiveDate, summary, status, acknowledged = false, acknowledgedDate, consentLabel = 'I have read and agree to this policy', variant = 'default', onToggle, onAcknowledge, dueDate, acknowledgeLabel = 'Acknowledge', formatEffective, formatDue, testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const [consented, setConsented] = React.useState(acknowledged);
    // The whole point of change 1: when the caller flips `acknowledged` back —
    // a rejected submission, a fresh policy version — the tick follows it
    // instead of stranding the employee with a box they cannot clear.
    React.useEffect(() => {
        setConsented(acknowledged);
    }, [acknowledged]);
    // A card with no policy on it is a consent box for nothing.
    if (!title)
        return null;
    const compact = variant === 'compact';
    const derivedStatus = status ?? (acknowledged ? 'acknowledged' : 'pending');
    const statusMeta = internal_1.POLICY_STATUS_META[derivedStatus];
    const effective = effectiveDate
        ? (formatEffective ?? ((d) => `Effective ${d}`))(effectiveDate)
        : null;
    const meta = (0, tone_v4_1.metaLine)([version, effective]);
    const overdue = (0, workforce_v4_1.isAdverse)(derivedStatus);
    const dueLine = dueDate ? (formatDue ?? ((d) => `Due ${d}`))(dueDate) : undefined;
    const handleToggle = (next) => {
        setConsented(next);
        onToggle?.(next);
    };
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-base font-bold text-on-card", children: title }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: meta }) : null] }), (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm" })] }), dueLine ? ((0, jsx_runtime_1.jsxs)("p", { className: (0, cn_1.cn)('text-xs font-semibold', overdue ? (0, tone_v4_1.toneInkClass)('danger') : 'text-muted-text'), children: [overdue ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u26A0 " }) : null, dueLine] })) : null, !compact && summary ? ((0, jsx_runtime_1.jsx)("p", { className: "line-clamp-4 text-sm text-muted-text", children: summary })) : null, acknowledged ? ((0, jsx_runtime_1.jsxs)("p", { className: (0, cn_1.cn)('text-xs font-semibold', (0, tone_v4_1.toneInkClass)('success')), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2713 " }), acknowledgedDate ? `Acknowledged on ${acknowledgedDate}` : 'Acknowledged'] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex cursor-pointer items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', tone_v4_1.MIN_TAP_SQUARE_CLASS), children: (0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: consented, onChange: (e) => handleToggle(e.target.checked) }) }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-xs text-on-card", children: consentLabel })] }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "primary", disabled: !consented, onClick: onAcknowledge, className: (0, cn_1.cn)(tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: acknowledgeLabel })] }))] }));
});
//# sourceMappingURL=PolicyAcknowledgeV4.js.map
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
exports.PolicyAcknowledgeV4 = PolicyAcknowledgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const CheckboxV4_1 = require("../primitives/CheckboxV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 policy acknowledgement** — same props as {@link PolicyAcknowledge} plus
 * `dueDate`, `acknowledgeLabel`, `formatEffective` and `formatDue`, and with
 * `acknowledged` finally honoured as a controlled input.
 *
 * ## Five changes
 *
 * 1. **A rejected acknowledgement can be cleared.** Consent lived in an
 *    uncontrolled `useState` that nothing outside the component could reach, so
 *    a caller whose server refused the acknowledgement — a stale version, a
 *    signature that failed to record — had no way to untick the box. The user
 *    saw a ticked consent and a policy that was still outstanding. Passing
 *    `acknowledged={false}` now clears the tick.
 * 2. **An overdue policy says when it was due.** `overdue` was one of six
 *    adverse statuses in the module with nowhere to say why, and for this one
 *    the reason is a date the component was never given.
 * 3. **The consent box is a target.** A 20pt checkbox with no wrapper is under
 *    half the 44pt floor, and it is the control that gates the whole card.
 * 4. **The confirmation line is inked with ink.** `colors.success` is a
 *    **fill** slot used as a text colour — measured as low as 1.32:1 in the
 *    audit that produced the `*Text` tokens.
 * 5. **The copy is props.** "Acknowledge", "Effective" and the "Due" line were
 *    hard-coded English on a legal consent, and the card now announces the
 *    whole thing — title, version, effective date, due date and status —
 *    instead of leaving five loose text nodes for the reader to assemble.
 *
 * The acknowledge button is `variant="primary"` on both twins, which is what
 * the native base rendered by default and what the web base asked for by name.
 *
 * **Renders nothing without a `title`.**
 */
function PolicyAcknowledgeV4({ title, version, effectiveDate, summary, status, acknowledged = false, acknowledgedDate, consentLabel = 'I have read and agree to this policy', variant = 'default', dueDate, acknowledgeLabel = 'Acknowledge', formatEffective, formatDue, onToggle, onAcknowledge, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [consented, setConsented] = React.useState(false);
    /*
      `acknowledged` is a controlled input now. When a caller drops it back to
      false — the server refused the signature, the policy was re-issued — the
      tick has to go with it, or the user is looking at consent they did not
      successfully give.
    */
    React.useEffect(() => {
        if (!acknowledged)
            setConsented(false);
    }, [acknowledged]);
    if (!title)
        return null;
    const compact = variant === 'compact';
    const derived = status ?? (acknowledged ? 'acknowledged' : 'pending');
    const statusMeta = tone_v4_1.POLICY_STATUS_V4[derived];
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const effective = effectiveDate
        ? (formatEffective ?? ((d) => `Effective ${d}`))(effectiveDate)
        : null;
    const due = dueDate ? (formatDue ?? ((d) => `Due ${d}`))(dueDate) : null;
    const caption = (0, tone_v4_1.metaLine)([version, effective, due]);
    const confirmation = acknowledged
        ? `✓ ${statusMeta.label}${acknowledgedDate ? ` on ${acknowledgedDate}` : ''}`
        : null;
    /*
      The card has no activation of its own, so there is nothing to carry the
      status word for the pill. It speaks for itself and the heading leaves it
      out, rather than both saying it.
    */
    const spoken = (0, tone_v4_1.spokenLine)([title, version, effective, due, confirmation]);
    const handleToggle = (next) => {
        setConsented(next);
        onToggle?.(next);
    };
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 2, children: title }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: caption })) : null] }), (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm" })] }), !compact && summary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 4, children: summary })) : null, confirmation ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: colors.successText }, children: confirmation })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tap, height: tap, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: consented, onCheckedChange: handleToggle, accessibilityLabel: consentLabel }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onCard", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flex: 1 }, children: consentLabel })] }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "primary", disabled: !consented, onPress: onAcknowledge, accessibilityLabel: `${acknowledgeLabel}: ${title}`, style: { minHeight: tap }, children: acknowledgeLabel })] }))] }));
}
//# sourceMappingURL=PolicyAcknowledgeV4.js.map
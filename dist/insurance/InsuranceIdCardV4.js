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
exports.InsuranceIdCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const status_1 = require("./internal/status");
const tone_v4_1 = require("./internal/tone-v4");
/** Term/definition, in the one register the whole card uses. */
function Fact({ term, value }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("dt", { className: "text-xs uppercase tracking-wide text-muted-text", children: term }), (0, jsx_runtime_1.jsx)("dd", { className: (0, cn_1.cn)('truncate text-sm font-semibold text-on-card', tone_v4_1.TABULAR_CLASS), children: value })] }));
}
/**
 * **V4 insurance ID card** — proof of insurance: carrier, policy number,
 * insured, what is covered and the cover period. New in V4; there is no base.
 * The web twin of the native `InsuranceIdCardV4`, whose prop shape is the
 * canonical one.
 *
 * ## Why it exists, and the three things it does that the module did not
 *
 * `PolicyDocumentRow`'s `kind` union already carries `'id-card'`, so the module
 * could list the document and had nothing to render when someone opened it —
 * and in an auto app this is the most-opened screen there is, produced at the
 * roadside with a phone in one hand.
 *
 * 1. **It is a list of labelled facts, not a picture of a card.** Every field
 *    is a `<dt>`/`<dd>` pair, so a reader gets "Policy number, AUTO-4821-93"
 *    rather than two unrelated strings — which is the failure mode of every
 *    card in this module, where a name on the container replaced the content
 *    inside it. Nothing here carries an `aria-label` at all; the content *is*
 *    the reading.
 * 2. **Carrier and policy number are required, and a card missing either
 *    renders nothing.** A frame with blanks in it is read as "the app says I
 *    am covered" by the one person who most needs it to be true. Effective and
 *    expiry are separate facts rather than one joined range, because a card
 *    that knows only when cover started still says something worth reading.
 * 3. **The figures are tabular.** A policy number and a VIN are compared
 *    character by character by someone reading them off a screen; proportional
 *    digits make that measurably harder.
 */
exports.InsuranceIdCardV4 = React.forwardRef(function InsuranceIdCardV4({ carrier, policyNumber, insured, subject, issuerCode, effectiveDate, expiryDate, variant = 'auto', labels, testID, className, ...rest }, ref) {
    // Proof of insurance with the insurer or the policy missing is not proof.
    if (!carrier || !policyNumber)
        return null;
    const vd = (0, status_1.policyVariant)(variant);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-xl', 'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', 'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'), style: (0, tone_v4_1.toneGroundStyle)('primary'), children: vd.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "truncate text-base font-bold text-on-card", children: carrier }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted-text", children: vd.label })] })] }), (0, jsx_runtime_1.jsxs)("dl", { className: "grid grid-cols-2 gap-md", children: [(0, jsx_runtime_1.jsx)(Fact, { term: labels?.policyNumber ?? 'Policy number', value: policyNumber }), insured != null ? ((0, jsx_runtime_1.jsx)(Fact, { term: labels?.insured ?? 'Insured', value: insured })) : null, subject != null ? (0, jsx_runtime_1.jsx)(Fact, { term: labels?.subject ?? 'Covered', value: subject }) : null, effectiveDate != null ? ((0, jsx_runtime_1.jsx)(Fact, { term: labels?.effective ?? 'Effective', value: effectiveDate })) : null, expiryDate != null ? ((0, jsx_runtime_1.jsx)(Fact, { term: labels?.expires ?? 'Expires', value: expiryDate })) : null, issuerCode != null ? ((0, jsx_runtime_1.jsx)(Fact, { term: labels?.issuerCode ?? 'Issuer code', value: issuerCode })) : null] })] }));
});
//# sourceMappingURL=InsuranceIdCardV4.js.map
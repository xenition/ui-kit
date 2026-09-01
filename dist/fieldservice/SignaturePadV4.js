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
exports.SignaturePadV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const job_v4_1 = require("./internal/job-v4");
/**
 * **V4 signature pad** — the web twin of the native `SignaturePadV4`, same
 * props as {@link SignaturePad} plus `confirmClearLabel` and `signLabel`.
 *
 * ## Four changes
 *
 * 1. **Clear asks first.** The signature is the legally meaningful artefact of
 *    the visit and one press destroyed it — no confirmation, no undo, and no
 *    prop through which a host app could require either. The first press arms
 *    the button and renames it through `confirmClearLabel`; the second calls
 *    `onClear`.
 * 2. **Clear stops being the loudest thing on the card.** It was a filled
 *    `danger` button on the web and a quiet ghost text button on the phone, so
 *    the riskiest control in the module shouted on one platform and whispered
 *    on the other. Both twins now take the quieter treatment — a `danger`-toned
 *    ghost — and pay for the safety with the confirming press instead of with
 *    a red slab.
 * 3. **One prompt on both twins.** The web said "click to sign" and the phone
 *    "tap to sign", so a shared test, a shared translation and a voice command
 *    each matched exactly one of the two. `signLabel` is one string.
 * 4. **Clear clears 44**, and the pad answers a pointer with a state layer
 *    rather than dimming itself toward the band that means disabled.
 */
exports.SignaturePadV4 = React.forwardRef(function SignaturePadV4({ label, signed = false, signerName, signedAt, onSign, onClear, disabled = false, confirmClearLabel = 'Confirm clear', signLabel = 'Tap to sign', className, style, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [armed, setArmed] = React.useState(false);
    const header = label != null ? ((0, jsx_runtime_1.jsx)("span", { className: "mb-xs block text-xs font-semibold text-muted-text", children: label })) : null;
    if (signed) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, style: style, children: [header, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm rounded-[var(--xen-radius-md)] border border-border p-md", style: { background: (0, job_v4_1.discGround)('success') }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-h-[var(--xen-space-2xl)] flex-col justify-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-xl font-semibold italic text-on-card", children: signerName ?? 'Signed' }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "mt-xs block h-px w-full bg-border" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-md", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2713", size: "sm", className: "text-success-text" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: (0, job_v4_1.spokenLine)(['Captured', signedAt]) })] }), onClear ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", tone: "danger", size: "md", disabled: disabled, onClick: () => {
                                        if (!armed) {
                                            setArmed(true);
                                            return;
                                        }
                                        setArmed(false);
                                        onClear();
                                    }, 
                                    // Walking away disarms, so a captured signature is never one
                                    // stray press from being destroyed.
                                    onBlur: () => setArmed(false), children: armed ? confirmClearLabel : 'Clear' })) : null] })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, style: style, children: [header, (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": label != null ? `${label}: ${signLabel}` : signLabel, disabled: disabled || onSign == null, onClick: onSign, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex w-full flex-col items-center justify-center gap-xs rounded-[var(--xen-radius-md)]', 'border border-dashed border-border bg-surface px-md py-xl', 'disabled:pointer-events-none disabled:opacity-[0.38]'), children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u270D", size: "2xl", className: "text-muted-text" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-muted-text", children: signLabel }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "mt-sm block h-px w-4/5 bg-border" })] })] }));
});
//# sourceMappingURL=SignaturePadV4.js.map
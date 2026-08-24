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
exports.ClaimStatusTracker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Steps_1 = require("../primitives/Steps");
const Icon_1 = require("../primitives/Icon");
const status_1 = require("./internal/status");
/** Happy-path stages, in order. `denied` branches off `review`. */
const HAPPY_PATH = [
    { title: 'Filed' },
    { title: 'In review' },
    { title: 'Approved' },
    { title: 'Paid' },
];
/**
 * A stage tracker for a single claim. The happy path (Filed → In review →
 * Approved → Paid) reuses the `Steps` primitive, with `current` derived from the
 * status descriptor (`paid` marks every stage done). A `denied` claim branches
 * off the review stage and renders a distinct `danger`-toned banner conveyed by
 * **glyph + text + color** — never color alone. Token-bound throughout. Web
 * parity of the native `ClaimStatusTracker`.
 */
exports.ClaimStatusTracker = React.forwardRef(function ClaimStatusTracker({ status, updated, className, ...rest }, ref) {
    const sd = (0, status_1.claimStatus)(status);
    if (status === 'denied') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { "aria-label": "Claim denied", className: "flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-danger bg-danger/10 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: sd.glyph, color: "danger", "aria-label": "Denied" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-danger", children: "Claim denied" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Reviewed after filing. Contact your agent to appeal." })] })] }), updated != null ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["Updated ", updated] }) : null] }));
    }
    // `paid` (step 3) marks the final stage done too → current past the last index.
    const current = status === 'paid' ? HAPPY_PATH.length : sd.step;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Steps_1.Steps, { steps: HAPPY_PATH, current: current }), (0, jsx_runtime_1.jsxs)("p", { "aria-label": `Claim status: ${sd.label}`, className: "text-center text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label, updated != null ? ` · Updated ${updated}` : ''] })] }));
});
//# sourceMappingURL=ClaimStatusTracker.js.map
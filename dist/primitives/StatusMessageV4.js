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
exports.StatusMessageV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const feedback_v4_1 = require("./internal/feedback-v4");
const SpinnerV4_1 = require("./SpinnerV4");
const DEFAULTS = {
    loading: 'Loading…',
    empty: 'Nothing here yet.',
    error: 'Something went wrong.',
};
/** The failure panel: the `danger` tone at 10%, opaque, behind a neutral edge. */
const ERROR_PANEL = `bg-[${(0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.danger.fill)}]`;
/**
 * **V4 status message** — the web twin of the native `StatusMessageV4`, same
 * props as {@link StatusMessage}, a different design line.
 *
 * One component covering three of the states `design.md` §14 says every screen
 * owes the user. V4 treats them as three different jobs rather than three
 * colours of the same centred line of small grey text.
 *
 * ## `loading` — say only what is known
 *
 * `SpinnerV4` replaces the hand-rolled ring this component injected for itself,
 * so there is one spinner in the kit instead of two that drift. It stays
 * indeterminate: §36.7 forbids fabricating precision, and this component has a
 * message and nothing else — no fraction, no stages. A bar here would be
 * inventing a number.
 *
 * ## `empty` — an empty state that whispers is one the eye skips
 *
 * §15 is emphatic that an empty state must help the user progress: what belongs
 * here, why it matters, what to do next. The base rendered that copy in
 * `text-muted-text` at `text-sm` — the *quietest* type in the kit for the one screen
 * whose entire purpose is to be read. V4 promotes it to `text-on-surface` at
 * `text-base`. Nothing else changes, because nothing else can: **these props
 * carry no action.** When an empty state has a next step, `ResultV4` is the
 * component — it takes `actionLabel`, and §15 is really a demand for a button.
 *
 * ## `error` — a failure needs a body
 *
 * The base drew red text in the middle of a void. Red text alone reads as a
 * caption; §38 asks an error to help recovery and it cannot do that unnoticed.
 * V4 gives it the feedback line's tinted panel — the `danger` tone mixed into
 * `surface` at 10%, opaque so it holds its colour on any ground, behind the
 * neutral hairline that says "container" (the tint already says which kind).
 * The label is the compiler's contrast-safe `danger-text`, not the raw fill.
 */
exports.StatusMessageV4 = React.forwardRef(function StatusMessageV4({ state, message, className, ...rest }, ref) {
    const base = (0, cn_1.cn)('flex flex-col items-center justify-center text-center', 'gap-[var(--xen-space-sm)] py-[var(--xen-space-xl)]', className);
    if (state === 'loading') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "status", "aria-live": "polite", "aria-busy": "true", "data-xen-v4-status-message": "loading", className: base, ...rest, children: [(0, jsx_runtime_1.jsx)(SpinnerV4_1.SpinnerV4, { size: "md", role: undefined, "aria-label": undefined, "aria-hidden": "true" }), message ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: message }) : null] }));
    }
    if (state === 'error') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "alert", "data-xen-v4-status-message": "error", className: base, ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full rounded-[var(--xen-radius-md)] border border-border', 'px-[var(--xen-space-lg)] py-[var(--xen-space-md)]', 'text-sm text-danger-text', ERROR_PANEL), children: message ?? DEFAULTS.error }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-status-message": "empty", className: base, ...rest, children: (0, jsx_runtime_1.jsx)("span", { className: "text-base text-on-surface", children: message ?? DEFAULTS.empty }) }));
});
//# sourceMappingURL=StatusMessageV4.js.map
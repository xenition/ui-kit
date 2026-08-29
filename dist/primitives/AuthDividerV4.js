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
exports.AuthDividerV4 = AuthDividerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const TextV4_1 = require("./TextV4");
/**
 * Is this node nothing a user could see?
 *
 * `[]`, `null`, `undefined`, `false`, whitespace and a fragment of those all
 * count — `providers.map(…)` over an empty list produces the first of them,
 * and a caller who wrote `{providers.length > 0 && row}` produces the third.
 */
function isEmptyNode(node) {
    if (node === null || node === undefined || typeof node === 'boolean')
        return true;
    if (Array.isArray(node))
        return node.every(isEmptyNode);
    if (typeof node === 'string')
        return node.trim() === '';
    if (React.isValidElement(node) && node.type === React.Fragment) {
        return isEmptyNode(node.props.children);
    }
    return false;
}
/**
 * A single hairline. `1` physical pixel is the one bare number §10.1 names
 * outright, and `flex-1` is a flex factor, which is geometry rather than a
 * spacing decision.
 */
function Rule() {
    return (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "h-px flex-1 bg-border" });
}
/**
 * **V4 auth divider** — the "or continue with" separator of `ONBOARDING-DESIGN-SPEC.md`
 * §9, in the V4 design line. Web twin of the native `AuthDividerV4`.
 *
 * Two things separate it from {@link AuthDivider}.
 *
 * **1. The rule is drawn either side of the label, not underneath it.** The
 * base runs one absolutely-positioned rule the full width and knocks a
 * `surface`-coloured patch out of it behind the label. That only works when
 * the divider is actually sitting on `surface` — and §1 explicitly allows an
 * auth screen to take a warmer ground (`ramps.neutral[50]`, `primary[50]`), at
 * which point the patch becomes a visible white smear across the hairline.
 * Here the rule is two flex segments with the label between them, so it is
 * ground-independent by construction and there is nothing to knock out.
 *
 * **2. It owns the empty state.** See {@link AuthDividerV4Props.children} —
 * handing the provider row to the divider is what makes `providers={[]}`
 * render nothing at all instead of a rule introducing a void.
 *
 * The hairline stays a hairline: `h-px` and `bg-border`, never a `2px` rule or
 * a `neutral` step used as a line. The label steps up from the base's `xs` to
 * `sm` — this line is a consumer mobile surface, and `xs` on a phone is below
 * the size at which incidental copy is comfortably read.
 */
function AuthDividerV4({ label, align = 'center', className, children, ...rest }) {
    // `undefined` means "no slot given" — the base's always-draw behaviour.
    // Anything else means the caller handed us their content, so its emptiness
    // is ours to answer for (§9, §10.6).
    const slotted = children !== undefined;
    if (slotted && isEmptyNode(children))
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full items-center gap-md", children: label ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [align === 'start' ? null : (0, jsx_runtime_1.jsx)(Rule, {}), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "muted", children: label }), align === 'end' ? null : (0, jsx_runtime_1.jsx)(Rule, {})] })) : (
                // No label is not two half-rules with a gap where the words would
                // have been — it is one unbroken hairline. §10.6: the empty state has
                // to look composed, not like something failed to load.
                (0, jsx_runtime_1.jsx)(Rule, {})) }), slotted ? (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-sm", children: children }) : null] }));
}
//# sourceMappingURL=AuthDividerV4.js.map
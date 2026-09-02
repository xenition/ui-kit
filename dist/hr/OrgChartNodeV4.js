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
exports.OrgChartNodeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const AvatarV4_1 = require("../primitives/AvatarV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const workforce_v4_1 = require("./workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 org chart node** — the web twin of the native `OrgChartNodeV4`, same
 * props as {@link OrgChartNode} plus `formatReports`, `expandLabel`,
 * `collapseLabel` and `testID`.
 *
 * ## Six changes
 *
 * 1. **Pressing Enter on the disclosure no longer opens the person instead.**
 *    The chevron was a `<button>` inside a `<Card role="button">` carrying its
 *    own Enter/Space handler. Its click was guarded with `stopPropagation`;
 *    its keydown was not, and the card's `preventDefault()` cancels the
 *    button's own activation. So a keyboard user trying to open a branch was
 *    navigated to the manager's profile and the tree never expanded — which,
 *    on a tree, means the rest of the org is simply unreachable. The card is a
 *    plain container now and the disclosure is a **sibling** of the
 *    activation.
 * 2. **The disclosure is a 44 target.** It was 28 square — the smallest
 *    control in the module, on the affordance the whole component is for.
 * 3. **The indent is a spacing token.** `style={{ width: level * 24 }}` — a
 *    raw pixel literal in a file whose own docstring claims "no literals", and
 *    24 is not a step on the scale, so a seed that retuned its rhythm indented
 *    at the old pitch and the rail stopped lining up with anything around it.
 * 4. **`highlighted` uses the selected pair.** `bg-primary-50` is a ramp step:
 *    it mirrors under `[data-theme="dark"]`, so the focused person was a pale
 *    plate on a dark page — and the text on it kept `on-surface`, a pairing
 *    nobody had measured. `selected`/`on-selected` is the compiler's slot for
 *    exactly this and ships as a guaranteed pair.
 * 5. **The node is one accessible name.** `Org node Ada Lovelace` replaced the
 *    subtree, so the title, the department and the report count went unspoken.
 * 6. **"report"/"reports", "Expand" and "Collapse" are props.** The count
 *    pluralised by appending `'s'`, which is wrong in every language the kit
 *    is otherwise ready for.
 */
exports.OrgChartNodeV4 = React.forwardRef(function OrgChartNodeV4({ name, title, avatarUrl, department, directReports = 0, depth = 0, expandable = false, expanded = false, variant = 'default', onToggle, onClick, formatReports, expandLabel = 'Expand', collapseLabel = 'Collapse', testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    // A node with nobody on it is a card with a rail beside it.
    if (!name)
        return null;
    const compact = variant === 'compact';
    const highlighted = variant === 'highlighted';
    const level = Math.max(0, Math.floor(Number.isFinite(depth) ? depth : 0));
    const reports = Math.max(0, Math.floor(Number.isFinite(directReports) ? directReports : 0));
    const isManager = reports > 0;
    const reportsText = isManager
        ? (formatReports ?? ((n) => (0, workforce_v4_1.pluralizeCount)(n, 'report')))(reports)
        : undefined;
    const subtitle = (0, tone_v4_1.metaLine)([title, department]);
    const interactive = onClick != null;
    const identity = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-card", children: name }), subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: subtitle }) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex items-stretch', className), children: [level > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-end", style: { width: (0, tone_v4_1.indentWidth)(level) }, "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("div", { className: "w-px bg-border" }) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: (0, jsx_runtime_1.jsxs)(Card_1.Card, { className: (0, cn_1.cn)('flex items-center gap-sm', highlighted && 'border-primary bg-selected text-on-selected'), children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([name, title, department, reportsText]), onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-sm rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: identity })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-sm", children: identity })), reportsText ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs font-semibold text-muted-text", "aria-hidden": interactive || undefined, children: reportsText })) : null, expandable ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${expanded ? collapseLabel : expandLabel} ${name}`, "aria-expanded": expanded, onClick: () => onToggle?.(!expanded), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', 'text-on-card', tone_v4_1.MIN_TAP_SQUARE_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: expanded ? '▾' : '▸' }) })) : null] }) })] }));
});
//# sourceMappingURL=OrgChartNodeV4.js.map
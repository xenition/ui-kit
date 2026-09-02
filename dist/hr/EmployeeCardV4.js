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
exports.EmployeeCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/**
 * **V4 employee card** — the web twin of the native `EmployeeCardV4`, same
 * props as {@link EmployeeCard} plus `loadingLabel`, `formatTenure` and
 * `testID`.
 *
 * ## Six changes
 *
 * 1. **Tabbing to "Email" and pressing Enter no longer opens the profile
 *    instead.** The quick-contact `<button>`s sat inside a card that `onClick`
 *    had turned into a `role="button"` with its own Enter/Space handler. The
 *    click was guarded; the keydown was not, and `preventDefault()` on the
 *    bubbled Enter cancels the button's own activation. So a keyboard user
 *    navigated away and mailed nobody. The card is now a plain container, the
 *    activation is a real `<button>` around the avatar and the identity block,
 *    and the action pills are its **siblings** — with no ancestor handler
 *    left, no guard is needed.
 * 2. **The card is one accessible name.** `Employee Ada Lovelace` replaced the
 *    subtree, so the title, the department and — the one that matters —
 *    whether she is *terminated* were never announced.
 * 3. **The skeleton is an opaque placeholder.** `bg-neutral-200` is a ramp
 *    step: it mirrors under `[data-theme="dark"]`, so the loading card was
 *    three pale slabs on a dark page. It also announced nothing while it was
 *    up, and the card stayed clickable through it.
 * 4. **Employment arrangement stops spending a status colour.**
 *    `contractor: warn` drew every contractor as a warning; the glyph already
 *    says which arrangement it is.
 * 5. **The action pills are real buttons at 44.** They were hand-rolled
 *    `bg-primary-50` / `hover:bg-primary-100` ramp steps at whatever height
 *    their padding produced; they are `ButtonV4` `soft` now, which is what the
 *    native twin already drew.
 * 6. **`Since …` is a prop.** `formatTenure` — the base concatenated an
 *    English preposition onto a date the caller had already formatted.
 */
exports.EmployeeCardV4 = React.forwardRef(function EmployeeCardV4({ name, title, department, avatarUrl, employmentType, status, location, startDate, actions, variant = 'default', loading = false, loadingLabel = 'Loading employee', formatTenure, onClick, testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    // A card with nobody on it is a bordered box around nothing.
    if (!name)
        return null;
    const compact = variant === 'compact';
    const detailed = variant === 'detailed';
    const interactive = onClick != null && !loading;
    const statusMeta = status ? internal_1.EMPLOYEE_STATUS_META[status] : undefined;
    const subtitle = (0, tone_v4_1.metaLine)([title, department]);
    const tenure = startDate ? (formatTenure ?? ((s) => `Since ${s}`))(startDate) : undefined;
    const hasActions = !compact && Array.isArray(actions) && actions.length > 0;
    const identity = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-card", children: name }), subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: subtitle }) : null] })] }));
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: loading ? ((0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { style: { borderRadius: 'var(--xen-radius-full)' }, className: (0, cn_1.cn)('h-2xl w-2xl shrink-0', tone_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-[60%]', tone_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-[40%]', tone_v4_1.PLACEHOLDER_CLASS) })] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([name, title, department, statusMeta?.label]), onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-sm rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: identity })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-sm", children: identity })), statusMeta ? ((0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", "aria-hidden": interactive || undefined })) : null] }), !compact && (employmentType || detailed) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-xs", children: [employmentType ? ((0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: tone_v4_1.EMPLOYMENT_META_V4[employmentType], size: "sm" })) : null, detailed && location ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCCD " }), location] })) : null, detailed && tenure ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: tenure })) : null] })) : null, hasActions ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs", children: actions.map((a) => ((0, jsx_runtime_1.jsxs)(ButtonV4_1.ButtonV4, { variant: "soft", size: "sm", "aria-label": a.label, onClick: a.onClick, className: tone_v4_1.MIN_TAP_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: a.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "ml-xs", children: a.label })] }, a.key))) })) : null] })) }));
});
//# sourceMappingURL=EmployeeCardV4.js.map
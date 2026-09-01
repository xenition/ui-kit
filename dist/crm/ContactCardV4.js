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
exports.ContactCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TagV4_1 = require("../primitives/TagV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 contact card** — the web twin of the native `ContactCardV4`, same props
 * as {@link ContactCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **Tapping "Call" no longer opens the contact as well.** This is the
 *    module's headline defect. The quick-action pills were real `<Button>`s
 *    sitting *inside* a root that `activate()` had turned into a
 *    `role="button"` with its own handler, and nothing stopped the event — so
 *    one tap dialled *and* navigated. The sibling `QuoteCard` guarded the
 *    identical nesting with `stopPropagation`, so the hazard was known; this
 *    card never got the guard, and native never had the bug at all because its
 *    inner `Pressable` consumed the touch. Same props, two behaviours.
 *
 *    The fix is structural rather than another `stopPropagation`: the card's
 *    own activation is a real `<button>` around **only the identity region**,
 *    and the pills are that button's **siblings**. A quick action does one
 *    thing, and the invalid nesting — interactive content inside
 *    `role="button"` — goes away with it.
 * 2. **`compact` actually densifies.** `padding` was passed on native only, so
 *    the web card dropped its tags and actions and kept its full `lg` inset.
 * 3. **One accessible name.** `Contact Ada` replaced the subtree, so the role
 *    and the company were never announced. Both join the name.
 * 4. **The skeleton is the shared placeholder**, not `bg-neutral-100` — a ramp
 *    step, and therefore a pale plate punched into a dark page — and the
 *    loading card is never clickable.
 * 5. **A press is a state layer**, and the pills and tags are drawn the same
 *    way on both twins: `soft` pills, `size="sm"` tags.
 */
exports.ContactCardV4 = React.forwardRef(function ContactCardV4({ name, title, company, avatarUrl, tags, actions, variant = 'default', loading = false, loadingLabel = 'Loading contact', onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    // A card with nobody on it is the blank bordered box the line rules out.
    if (!name)
        return null;
    const compact = variant === 'compact';
    const hasTags = !compact && Array.isArray(tags) && tags.length > 0;
    const hasActions = !compact && Array.isArray(actions) && actions.length > 0;
    const interactive = onClick != null && !loading;
    const subtitle = [title, company].filter(Boolean).join(' · ');
    const identity = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-bold text-on-surface", children: name }), subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: subtitle }) : null] })] }));
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, 
        // `padding` reaches the card on this twin too, so `compact` is a
        // density and not just a content cut.
        padding: compact ? 'md' : undefined, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: loading ? ((0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { style: { borderRadius: 'var(--xen-radius-full)' }, className: (0, cn_1.cn)('h-2xl w-2xl shrink-0', crm_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-[60%]', crm_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-[40%]', crm_v4_1.PLACEHOLDER_CLASS) })] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, crm_v4_1.spokenLine)([name, title, company]), onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS), children: identity })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-sm", children: identity })), hasTags ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs", children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(TagV4_1.TagV4, { tone: "neutral", size: "sm", children: t }, `${t}-${i}`))) })) : null, hasActions ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs", children: actions.map((a) => ((0, jsx_runtime_1.jsxs)(ButtonV4_1.ButtonV4, { variant: "soft", size: "sm", "aria-label": a.label, onClick: a.onClick, className: chrome_v4_1.MIN_TAP_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: a.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "ml-xs", children: a.label })] }, a.key))) })) : null] })) }));
});
//# sourceMappingURL=ContactCardV4.js.map
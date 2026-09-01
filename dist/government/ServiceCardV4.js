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
exports.ServiceCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const civic_v4_1 = require("./internal/civic-v4");
const CATEGORY_V4 = {
    license: { label: 'Licensing', glyph: '🪪' },
    permit: { label: 'Permits', glyph: '📋' },
    tax: { label: 'Tax', glyph: '🧾' },
    records: { label: 'Records', glyph: '🗂️' },
    benefit: { label: 'Benefits', glyph: '🤝' },
    health: { label: 'Public health', glyph: '⚕️' },
    utility: { label: 'Utilities', glyph: '💧' },
    other: { label: 'Service', glyph: '🏛️' },
};
const CHANNEL_V4 = {
    online: { label: 'Online', glyph: '🌐', tone: 'success' },
    'in-person': { label: 'In person', glyph: '🏢', tone: 'warn' },
    phone: { label: 'By phone', glyph: '☎️', tone: 'neutral' },
    unavailable: { label: 'Unavailable', glyph: '⛔', tone: 'danger' },
};
/**
 * **V4 service card** — the web twin of the native `ServiceCardV4`, same props
 * as {@link ServiceCard} plus `categoryLabels` and `channelLabels`.
 *
 * ## Four changes
 *
 * 1. **Space on "Start" starts the service.** Today it starts nothing and
 *    navigates away. The Start button guarded only the *click* path with
 *    `e.stopPropagation()`; the card is a `div` with `role="button"` and a
 *    hand-written key handler, which catches the keydown bubbling out of the
 *    button and runs `e.preventDefault(); onClick()` — cancelling the button's
 *    own activation (Space fires on keyup, already cancelled) and firing the
 *    card. Enter fires *both*. The fix is structural and is the house rule:
 *    the card container is a plain `div`, the activation is a real `<button>`
 *    around the heading and description, and **Start is that button's
 *    sibling**. Nesting a control inside `role="button"` was invalid ARIA
 *    regardless of the propagation.
 * 2. **An unavailable service says so.** The name was a fixed
 *    `` `${title}, ${category}` ``, which omits the one field that decides
 *    whether the service can be used at all — so an unavailable service
 *    announced as an ordinary, startable one. Channel, description and
 *    turnaround join the name.
 * 3. **A category is identity, not status.** The leading disc was
 *    `bg-primary-50` — a ramp step, which mirrors under `[data-theme="dark"]`
 *    and paints a near-white plate on a dark card — and a category has no
 *    status to report. It takes the neutral identity tint, and the glyph takes
 *    the contrast-corrected ink rather than the `primary` fill.
 * 4. **Both controls clear 44 and press is a state layer.**
 *    `hover:opacity-90` dims the card's own content, which is M3's *disabled*
 *    signal, and `ring-primary-300` is a ramp step where the preset ships a
 *    dedicated `ring` colour that tracks the seed.
 */
exports.ServiceCardV4 = React.forwardRef(function ServiceCardV4({ category, title, description, channel, estimatedTime, actionLabel = 'Start', onStart, onClick, categoryLabels, channelLabels, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!title)
        return null;
    const cat = CATEGORY_V4[category] ?? CATEGORY_V4.other;
    const catWord = categoryLabels?.[category] ?? cat.label;
    const ch = channel ? (CHANNEL_V4[channel] ?? CHANNEL_V4.online) : undefined;
    const chWord = channel ? (channelLabels?.[channel] ?? ch?.label) : undefined;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]", style: { background: (0, civic_v4_1.tintGround)(civic_v4_1.IDENTITY_TONE) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: cat.glyph, size: "xl", className: (0, civic_v4_1.tintInkClass)(civic_v4_1.IDENTITY_TONE) }) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: catWord })] }), ch != null && chWord != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: ch.tone, ...civic_v4_1.BADGE_V4, children: `${ch.glyph} ${chWord}` })) : null] }), description != null ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-sm block text-sm text-on-surface", children: description })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: civic_v4_1.CARD_V4, className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: [onClick != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, civic_v4_1.spokenLine)([title, catWord, chWord, description, estimatedTime]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex w-full flex-col rounded-[var(--xen-radius-md)] text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-col", children: body })), estimatedTime != null || onStart != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex items-center justify-between gap-sm", children: [estimatedTime != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u23F1" }), " ", estimatedTime] })) : ((0, jsx_runtime_1.jsx)("span", {})), onStart != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", "aria-label": (0, civic_v4_1.spokenLine)([actionLabel, title]), onClick: onStart, children: actionLabel })) : null] })) : null] }));
});
//# sourceMappingURL=ServiceCardV4.js.map
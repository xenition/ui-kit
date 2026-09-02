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
exports.AgentContactCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const tone_v4_1 = require("./internal/tone-v4");
/** A phone number as a dialable `tel:` target — everything but digits and `+`. */
function telHref(phone) {
    const trimmed = phone.trim();
    const plus = trimmed.startsWith('+') ? '+' : '';
    const digits = trimmed.replace(/[^0-9]/g, '');
    return `tel:${plus}${digits}`;
}
/**
 * **V4 agent contact card** — same props as {@link AgentContactCard} plus
 * `callLabel`, `emailLabel`, `availableLabel` and `offlineLabel`.
 *
 * ## Five changes
 *
 * 1. **The phone number and the email address are links.** They were inert
 *    `<span>`s. On a phone — where a policyholder opens this card in the
 *    middle of an accident — the number could be read and not dialled, and the
 *    address could not be copied by any gesture the platform offers for a
 *    link. They are now `tel:` and `mailto:` anchors, which also means the
 *    card still works with no `onCall` / `onEmail` handler at all, where the
 *    base rendered no action whatsoever.
 * 2. **Two adjuster cards no longer present two identical "Call" buttons.** A
 *    claim page lists the agent and the adjuster; a reader tabbing through
 *    heard "Call, button. Email, button. Call, button. Email, button." and had
 *    no way to tell whose. Each action's accessible name carries the person's
 *    name, and contains the visible word, so the visible label is still part
 *    of the name (WCAG 2.5.3).
 * 3. **Availability is a word, in the card's own reading order.** The pill was
 *    a `Badge` whose glyph — `●` against `○` — was its only non-colour signal
 *    at a glance, and `success`/`neutral` did the rest.
 * 4. **The card is one block of contact detail, not five stops.** Name, title,
 *    agency and availability are read together; the glyphs beside the number
 *    and the address are decorative rather than three more announced items.
 * 5. **Every control clears 44 and focuses with `ring-ring`.** Nothing in the
 *    module cleared the tap floor — a phone number was a line of text with no
 *    target at all.
 */
exports.AgentContactCardV4 = React.forwardRef(function AgentContactCardV4({ name, title, agency, phone, email, avatarUrl, available, callLabel = 'Call', emailLabel = 'Email', availableLabel = 'Available', offlineLabel = 'Offline', onCall, onEmail, className, ...rest }, ref) {
    if (!name)
        return null;
    const availabilityText = available == null ? undefined : available ? availableLabel : offlineLabel;
    const contactLine = (0, cn_1.cn)('flex items-center gap-sm rounded-[var(--xen-radius-sm)] text-sm text-on-card underline', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: "lg", alt: "" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-card", children: name }), title != null || agency != null ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted-text", children: (0, tone_v4_1.metaLine)([title, agency]) })) : null, availabilityText != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('mt-xs inline-flex items-center gap-xs rounded-[var(--xen-radius-full)] px-sm py-xs text-xs font-semibold', (0, tone_v4_1.toneInkClass)(available ? 'success' : 'neutral')), style: (0, tone_v4_1.toneGroundStyle)(available ? 'success' : 'neutral'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: available ? '●' : '○' }), availabilityText] })) : null] })] }), phone != null || email != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [phone != null ? ((0, jsx_runtime_1.jsxs)("a", { href: telHref(phone), className: contactLine, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCDE" }), phone] })) : null, email != null ? ((0, jsx_runtime_1.jsxs)("a", { href: `mailto:${email}`, className: (0, cn_1.cn)(contactLine, 'truncate'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2709\uFE0F" }), email] })) : null] })) : null, phone != null || email != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-sm", children: [phone != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", "aria-label": `${callLabel} ${name}`, href: onCall == null ? telHref(phone) : undefined, onClick: onCall, className: (0, cn_1.cn)('flex-1', tone_v4_1.MIN_TAP_CLASS), children: callLabel })) : null, email != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", "aria-label": `${emailLabel} ${name}`, href: onEmail == null ? `mailto:${email}` : undefined, onClick: onEmail, className: (0, cn_1.cn)('flex-1', tone_v4_1.MIN_TAP_CLASS), children: emailLabel })) : null] })) : null] }));
});
//# sourceMappingURL=AgentContactCardV4.js.map
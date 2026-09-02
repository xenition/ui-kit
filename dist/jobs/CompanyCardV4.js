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
exports.CompanyCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const cn_1 = require("../primitives/cn");
const v4_state_1 = require("../primitives/internal/v4-state");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 company card** — same props as {@link CompanyCard} plus `followLabel`,
 * `followingLabel`, `formatEmployees` and `formatOpenRoles`.
 *
 * ## Six changes
 *
 * 1. **Follow works from the keyboard.** It was a `<Button>` inside a
 *    `<div role="button">` carrying its own Enter/Space handler: the button's
 *    click was guarded with `stopPropagation`, its keydown was not, so the
 *    card caught the bubbled key, called `preventDefault()` — cancelling the
 *    button's own activation — and opened the company page instead. Tab to
 *    Follow, press Enter, follow nobody, navigate away. The card is a plain
 *    container now, the activation is a real `<button>` around the logo and
 *    the name, and Follow is its **sibling**.
 * 2. **`<CompanyCard company={c} following />` no longer renders a dead
 *    button.** The base showed Follow whenever *either* `following` or
 *    `onToggleFollow` was set, so a read-only card — a search result, a
 *    profile header — put a focusable control in the tab order that did
 *    nothing at all when pressed. The button exists only when there is a
 *    handler; the follow *state* without one is drawn as a chip and folded
 *    into the card's name.
 * 3. **Follow announces whether you are following.** There was no
 *    `aria-pressed` anywhere on either twin, so the only difference between
 *    the two states was the word inside the button and its variant colour —
 *    and a toggle that does not expose its state cannot be operated
 *    confidently by anyone who is not looking at it.
 * 4. **The card is one accessible name.** The base's `aria-label` sat on a
 *    `generic` element, which ARIA forbids naming, and it named only the
 *    company and industry — the headcount and the open-roles count, the two
 *    numbers a job seeker is actually scanning for, were separate stops or
 *    nothing.
 * 5. **"1 open roles" is fixed, and both counts are translatable.** The base
 *    interpolated the number into a hard-coded plural.
 * 6. **Press is a state layer and the meta line takes a text token.**
 *    `hover:opacity-95` fades the card's own content — M3's disabled signal —
 *    and `text-muted` is a fill slot with no contrast promise.
 */
exports.CompanyCardV4 = React.forwardRef(function CompanyCardV4({ company, following, onToggleFollow, onClick, followLabel = 'Follow', followingLabel = 'Following', formatEmployees, formatOpenRoles, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const meta = (0, tone_v4_1.metaLine)([company.industry, company.location]);
    // A banded headcount stays as written; a bare number goes through the
    // formatter. See `formatEmployees`.
    let employees;
    if (company.size != null && company.size !== '') {
        const parsed = Number(company.size);
        employees =
            formatEmployees && Number.isFinite(parsed)
                ? formatEmployees(parsed)
                : `${company.size} employees`;
    }
    const roles = typeof company.openRoles === 'number' && Number.isFinite(company.openRoles)
        ? (formatOpenRoles ??
            ((n) => (n > 0 ? `${n} open role${n === 1 ? '' : 's'}` : 'No open roles')))(Math.max(0, Math.floor(company.openRoles)))
        : undefined;
    const followed = !!following;
    const canFollow = onToggleFollow != null;
    const name = (0, tone_v4_1.spokenLine)([
        company.name,
        company.industry,
        company.location,
        employees,
        roles,
        // Only when there is no button to say it: a Follow button with
        // `aria-pressed` already announces the state, and saying it twice makes
        // the card sound as though there are two of them.
        !canFollow && following != null ? (followed ? followingLabel : followLabel) : undefined,
    ]);
    const summary = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: company.logoUrl, name: company.name, size: "lg", alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-semibold text-on-card", children: company.name }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: meta }) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-company-card": "", className: (0, cn_1.cn)('flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border', 'bg-card p-lg text-on-card', className), ...rest, children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onClick(company), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 items-center gap-md rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 items-center gap-md", children: summary })), employees || roles || (following != null && !canFollow) ? ((0, jsx_runtime_1.jsxs)("div", { "aria-hidden": onClick != null || undefined, className: "flex flex-wrap items-center gap-sm", children: [employees ? (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", children: employees }) : null, roles ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: (company.openRoles ?? 0) > 0 ? 'primary' : 'neutral', children: roles })) : null, following != null && !canFollow ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", children: followed ? followingLabel : followLabel })) : null] })) : null, canFollow ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: followed ? 'outline' : 'primary', size: "sm", "aria-pressed": followed, onClick: () => onToggleFollow(company), className: (0, cn_1.cn)('self-start', tone_v4_1.MIN_TAP_CLASS), children: followed ? followingLabel : followLabel })) : null] }));
});
//# sourceMappingURL=CompanyCardV4.js.map
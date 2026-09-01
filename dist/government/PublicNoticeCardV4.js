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
exports.PublicNoticeCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const civic_v4_1 = require("./internal/civic-v4");
/**
 * Category → word and glyph, with **no tone**.
 *
 * A notice category is identity — the same thing a department or a document
 * type is — so it takes the neutral chip and its glyph. The base spent `warn`
 * on Roadwork and the brand colour on four more, which put a category in the
 * same palette the module uses for Denied, Rejected and Urgent.
 */
const CATEGORY_V4 = {
    hearing: { label: 'Public hearing', glyph: '⚖️' },
    meeting: { label: 'Meeting', glyph: '📋' },
    roadwork: { label: 'Roadwork', glyph: '🚧' },
    election: { label: 'Election', glyph: '🗳️' },
    ordinance: { label: 'Ordinance', glyph: '📜' },
    bid: { label: 'Bid / RFP', glyph: '📑' },
    general: { label: 'Notice', glyph: '📢' },
};
/**
 * **V4 public notice** — the web twin of the native `PublicNoticeCardV4`, same
 * props as {@link PublicNoticeCard} plus `categoryLabels` and `newLabel`.
 *
 * ## Four changes
 *
 * 1. **The date and the venue are in the name.** A hearing notice's date is the
 *    legally operative field — miss it and you have lost the right to be heard
 *    — and the card's fixed `` `${category}: ${title}` `` name pruned it, along
 *    with the agency and the location, because `role="button"` renders its own
 *    subtree presentational. All of it joins the name now.
 * 2. **"New" stops being `danger`.** Unread is not a hazard, and `danger` is
 *    the same tone this module spends on Denied, Rejected and Urgent — so an
 *    unread roadwork notice read, at a glance, as a rejection. It takes
 *    `primary` — the module's tone for open and just-arrived, and not one of
 *    the three status colours the rule protects — with a dot and a word beside
 *    it, so unread still stands out against the neutral category chip.
 * 3. **A category is not a status either.** Roadwork wore `warn` and four more
 *    wore the brand colour; the leading disc was `bg-neutral-100` or a `-50`
 *    ramp step, both of which mirror under `[data-theme="dark"]`. Category
 *    takes the neutral identity tint and its glyph, and the tint's own
 *    contrast-corrected ink rather than a fill token used as one.
 * 4. **An interactive card is a real `<button>`** that clears 44 and answers
 *    with a state layer, not a `div` with `role="button"`, a hand-written
 *    Enter/Space handler, `hover:opacity-90` — M3's *disabled* signal — and a
 *    `primary-300` focus ring off the neutral ramp.
 */
exports.PublicNoticeCardV4 = React.forwardRef(function PublicNoticeCardV4({ category, title, body, agency, date, location, isNew = false, onClick, categoryLabels, newLabel = 'New', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!title)
        return null;
    const cat = CATEGORY_V4[category] ?? CATEGORY_V4.general;
    const catWord = categoryLabels?.[category] ?? cat.label;
    const meta = (0, tone_v4_1.metaLine)([agency, location, date]);
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-[calc(var(--xen-space-xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-xl)_+_var(--xen-space-sm))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]", style: { background: (0, civic_v4_1.tintGround)(civic_v4_1.IDENTITY_TONE) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: cat.glyph, className: (0, civic_v4_1.tintInkClass)(civic_v4_1.IDENTITY_TONE) }) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 flex-wrap items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: civic_v4_1.IDENTITY_TONE, ...civic_v4_1.BADGE_V4, children: catWord }), isNew ? (
                            // `primary`, not the neutral identity chip: two neutral pills
                            // side by side would hide the unread flag entirely, which is the
                            // opposite of the fix. `primary` is not one of the three status
                            // colours the rule protects.
                            (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", dot: true, ...civic_v4_1.BADGE_V4, children: newLabel })) : null] })] }), (0, jsx_runtime_1.jsx)("span", { className: "mt-sm block text-base font-bold text-on-surface", children: title }), body != null ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-xs line-clamp-3 text-sm text-on-surface", children: body })) : null, meta !== '' ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-sm block text-xs text-muted-text", children: meta })) : null] }));
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, variant: civic_v4_1.CARD_V4, className: className, ...rest, children: onClick != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, civic_v4_1.spokenLine)([
                catWord,
                isNew ? newLabel : undefined,
                title,
                date,
                location,
                agency,
                body,
            ]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex w-full flex-col rounded-[var(--xen-radius-md)] text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: content })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-col", children: content })) }));
});
//# sourceMappingURL=PublicNoticeCardV4.js.map
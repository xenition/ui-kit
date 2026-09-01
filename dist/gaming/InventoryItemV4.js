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
exports.InventoryItemV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const types_1 = require("./types");
const arcade_v4_1 = require("./internal/arcade-v4");
const RARITY_LABEL = {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
};
/**
 * The tier as a **shape**: the frame thickens as the rarity climbs.
 *
 * `IDENTITY_TONE` flattens all five tiers to one colour on purpose, so a
 * neutral frame alone would say nothing — and the conventions sanction exactly
 * this substitution: identity gets "a glyph, a shape or a neutral chip".
 *
 * Three weights across five tiers, not five: the kit's border scale steps
 * 1 → 2 → 4 → 8, and 8px of frame around a 64px tile is a box rather than an
 * accent. The word beside it is what names the tier precisely; the frame is
 * the glance.
 */
const RARITY_FRAME = [
    'border',
    'border',
    'border-2',
    'border-2',
    'border-4',
];
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 inventory item** — same props as {@link InventoryItem} plus
 * `rarityLabels`.
 *
 * ## Four changes
 *
 * 1. **Inspect stops claiming to be a toggle.** The button announced
 *    `aria-pressed={item.equipped}`, so a reader was told it was a two-state
 *    control whose state it could change — and pressing it opens an inspect
 *    view and can never change `equipped` at all. A user who pressed it
 *    listening for the state to flip waited for something that was never going
 *    to happen. (The twins told different lies about it: native reported
 *    `selected`.) It is a plain action now, named for what it does.
 * 2. **A rarity tier is identity, so it stops wearing the status palette.**
 *    `rarityColorKey` ran the five tiers across `muted`/`success`/`primary`/
 *    `accent`/`warn`, which put a **green** frame on an uncommon sword and an
 *    **amber** one on a legendary — the two colours the kit uses for "fine"
 *    and "look at this", spent on a category. That helper is still exported
 *    from the module index, so it stays; this component simply stops calling
 *    it. The tier is a neutral chip carrying its own word (overridable through
 *    `rarityLabels`) over a frame whose *weight* climbs with the tier — see
 *    {@link RARITY_FRAME}. Only `Equipped` keeps a status colour, because an
 *    equipped item is in an affirmative state rather than a category.
 * 3. **The item's name lands.** Both the interactive and the static form built
 *    a good combined name; the static one hung it on a bare `<div>`, where
 *    ARIA forbids naming a generic element, so the browser discarded it —
 *    while the native twin sets `accessible` and does announce it. Two twins,
 *    two different amounts of information. The static form is a `group`.
 * 4. **The art slot is a token ground and the press is a state layer.**
 *    `bg-neutral-100` inverts under `[data-theme="dark"]` while the item art
 *    over it does not; `hover:opacity-85` dims the item's own content, which
 *    is M3's disabled signal. The tap target clears 44 and the focus ring is
 *    the kit's one `ring` colour rather than a ramp step.
 */
exports.InventoryItemV4 = React.forwardRef(function InventoryItemV4({ item, variant = 'tile', onClick, rarityLabels, className }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!item?.name)
        return null;
    const row = variant === 'row';
    const rarityWord = item.rarity
        ? (rarityLabels?.[item.rarity] ?? RARITY_LABEL[item.rarity])
        : undefined;
    const stacked = item.quantity != null && item.quantity > 1;
    const frame = RARITY_FRAME[(0, types_1.rarityRank)(item.rarity)] ?? 'border';
    const art = ((0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('relative flex items-center justify-center overflow-hidden text-xl', 'rounded-[var(--xen-radius-md)] border-border', frame, arcade_v4_1.PLACEHOLDER_CLASS, row
            ? 'h-2xl w-2xl'
            : (0, cn_1.cn)('h-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]', 'w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]')), children: [item.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: item.imageUrl, alt: "", loading: "lazy", className: "h-full w-full object-cover" })) : ((item.glyph ?? '🎁')), stacked ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-0 right-0", children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: arcade_v4_1.IDENTITY_TONE, className: arcade_v4_1.TABULAR_CLASS, children: `×${item.quantity}` }) })) : null] }));
    const label = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex flex-col gap-xs', row ? 'flex-1 items-start' : 'items-center'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm font-semibold text-on-card', row ? 'text-left' : 'text-center'), children: item.name }), rarityWord != null || item.equipped ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [rarityWord ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: arcade_v4_1.IDENTITY_TONE, children: rarityWord })) : null, item.equipped ? (
                    // Equipped is an affirmative state of the item, not a name for
                    // it — one of the module's only two remaining status badges.
                    (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: "success", children: "Equipped" })) : null] })) : null] }));
    const bodyClass = (0, cn_1.cn)('flex', row ? 'flex-row items-center gap-md' : 'flex-col items-center gap-xs');
    const name = (0, arcade_v4_1.spokenLine)([
        item.name,
        rarityWord,
        stacked ? `×${item.quantity}` : undefined,
        item.equipped ? 'Equipped' : undefined,
    ]);
    if (!onClick) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": name, className: (0, cn_1.cn)(bodyClass, className), children: [art, label] }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": name, onClick: () => onClick(item), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)(bodyClass, 'w-full rounded-[var(--xen-radius-md)] p-xs', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [art, label] }) }));
});
//# sourceMappingURL=InventoryItemV4.js.map
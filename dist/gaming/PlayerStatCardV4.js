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
exports.PlayerStatCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const arcade_v4_1 = require("./internal/arcade-v4");
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 player stat card** — same props as {@link PlayerStatCard} plus
 * `onlineLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **The stats survive being clickable.** `detailed` exists to show the
 *    headline stats, and the moment an `onClick` was passed the card became a
 *    `role="button"` — which makes its whole subtree presentational, so every
 *    K/D, every win count and the "No stats yet" line were removed from the
 *    accessibility tree by the act of making the card open a profile. The card
 *    is a plain `<div>`; the activation is a real `<button>` around the avatar
 *    and the handle, and the stats grid is its **sibling**.
 * 2. **Presence is a word on both twins.** It was a coloured dot with
 *    `role="img"` here and a bare tint on native, and neither joined the
 *    card's name — so a card whose only difference from the next one was
 *    "this player is online" read identically. The dot is decoration; the word
 *    is in the meta line and in the spoken name, and `onlineLabel` /
 *    `offlineLabel` let an app change it.
 * 3. **A rank is identity, not the brand.** `Diamond II` wore `primary`,
 *    which made every rank in a roster the same colour as every primary action
 *    on the screen. It is a neutral chip carrying its own word.
 * 4. **Press is a state layer on a target that clears 44.**
 *    `hover:opacity-90` fades the card's own content, which is how M3 says
 *    *disabled*; the focus ring is the kit's `ring` rather than a ramp step
 *    that inverts; and the stat figures are tabular, so a roster's numbers
 *    line up in a column instead of each cell setting its own width.
 */
exports.PlayerStatCardV4 = React.forwardRef(function PlayerStatCardV4({ player, variant = 'compact', online, onClick, onlineLabel = 'Online', offlineLabel = 'Offline', className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!player?.name)
        return null;
    const detailed = variant === 'detailed';
    const stats = player.stats ?? [];
    const interactive = typeof onClick === 'function';
    const presence = online === undefined ? undefined : online ? onlineLabel : offlineLabel;
    const caption = (0, tone_v4_1.metaLine)([
        player.level != null ? `Level ${player.level}` : undefined,
        presence,
    ]);
    const header = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative inline-flex shrink-0", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: player.avatarUrl, name: player.name, alt: "", size: detailed ? 'lg' : 'md' }), presence !== undefined ? (
                    // Decoration: the word is in the caption and in the card's name.
                    (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute bottom-0 right-0 h-sm w-sm rounded-full border-2 border-card', online ? 'bg-success' : 'bg-muted') })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-lg font-bold text-on-card", children: player.name }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-wrap items-center gap-xs", children: [player.rank ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: arcade_v4_1.IDENTITY_TONE, children: player.rank })) : null, caption ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: caption }) : null] })] })] }));
    const headerShape = 'flex w-full items-center gap-md text-left';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col rounded-[var(--xen-radius-lg)] border border-border', 'bg-card p-lg text-on-card', detailed ? 'gap-md' : 'gap-0', className), children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onClick?.(player), "aria-label": (0, arcade_v4_1.spokenLine)([
                    player.name,
                    player.rank,
                    player.level != null ? `Level ${player.level}` : undefined,
                    presence,
                ]), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)(headerShape, 'rounded-[var(--xen-radius-md)]', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: header })) : ((0, jsx_runtime_1.jsx)("div", { className: headerShape, children: header })), detailed ? (stats.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-sm", children: stats.map((stat, index) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-[calc(var(--xen-space-2xl)_*_2)] flex-1 basis-[30%] flex-col gap-xs', 'rounded-[var(--xen-radius-md)] border border-border bg-surface px-md py-sm'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-bold text-on-surface', arcade_v4_1.TABULAR_CLASS), children: stat.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: stat.label })] }, `${stat.label}-${index}`))) })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: "No stats yet" }))) : null] }));
});
//# sourceMappingURL=PlayerStatCardV4.js.map
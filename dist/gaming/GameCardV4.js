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
exports.GameCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const arcade_v4_1 = require("./internal/arcade-v4");
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 game card** — same props as {@link GameCard} plus `playLabel` and
 * `installLabel`.
 *
 * ## Four changes
 *
 * 1. **Play works from the keyboard.** This is a live bug, not a nicety. The
 *    card was a `role="button"` `<div>` with a hand-written key handler, and
 *    Play was *inside* it: the button guarded the click path with
 *    `stopPropagation()` and left the key path open, so the card's `onKeyDown`
 *    caught the keydown bubbling out of Play and ran
 *    `e.preventDefault(); onClick(game)`. Enter's default action on a
 *    `<button>` **is** the click that had just been cancelled, and Space's
 *    click fires on keyup, already cancelled too — so pressing Enter on Play
 *    opened the store page and installed nothing, and Space did nothing but
 *    open the store page. The fix is structural: the card is a plain `<div>`,
 *    the activation is a real `<button>` around the art and the copy, and Play
 *    is that button's **sibling**. There is no ancestor handler left to fire,
 *    so no guard is needed and none is written.
 * 2. **The card's name carries the card.** `aria-label={game.title}` on a
 *    `role="button"` made the genre, the installed state, the rating and the
 *    price presentational — every one of them drawn on the card and none of
 *    them reachable. The activation's name is the whole line.
 * 3. **The featured cover's scrim stops inverting.** `GameCardV2` built it out
 *    of `from-neutral-900/75` with `text-neutral-50`, and the web neutral ramp
 *    *mirrors* under `[data-theme="dark"]` while a JPEG does not — so in a dark
 *    theme the darkest step resolved to the lightest and the bottom of every
 *    key art washed near-white with white text on it. `ART_SCRIM` and
 *    `ART_INK` are fixed in both schemes, because the artwork is. The missing
 *    cover is `PLACEHOLDER_CLASS` rather than `bg-neutral-200`, for the same
 *    reason, and rather than a full-bleed slab of brand `primary`.
 * 4. **A genre is identity, not status.** It wore `primary` — the brand — so
 *    every genre chip in a store grid was the same colour as every primary
 *    action on the screen, and a status slot was spent on a category. It is a
 *    neutral chip carrying its own word. "Installed" keeps `success`: owning a
 *    title is an affirmative state of the title, not a name for it. Press is a
 *    state layer instead of `hover:opacity-90`, which is M3's *disabled*
 *    signal, and the activation clears 44.
 */
exports.GameCardV4 = React.forwardRef(function GameCardV4({ game, variant = 'grid', loading = false, onClick, onPlay, playLabel = 'Play', installLabel = 'Install', className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!game?.title)
        return null;
    const list = variant === 'list';
    const featured = variant === 'featured';
    const interactive = typeof onClick === 'function';
    const rating = game.rating != null && Number.isFinite(game.rating)
        ? (0, tone_v4_1.ratingParts)({ value: game.rating })
        : null;
    const actionWord = game.installed ? playLabel : installLabel;
    const thumb = 'h-[calc(var(--xen-space-2xl)_*_1.5)] w-[calc(var(--xen-space-2xl)_*_1.5)]';
    const shape = list ? thumb : (0, cn_1.cn)('w-full', featured ? 'aspect-video' : 'aspect-[3/4]');
    const art = game.coverUrl ? ((0, jsx_runtime_1.jsx)("img", { src: game.coverUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] object-cover', arcade_v4_1.PLACEHOLDER_CLASS, shape) })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-md)]', arcade_v4_1.PLACEHOLDER_CLASS, shape), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDFAE", size: "2xl", color: "muted" }) }));
    // Only `featured` lays the title over the art; the other two draw it in the
    // copy block, where it can wrap without covering the key art.
    const cover = featured ? ((0, jsx_runtime_1.jsxs)("span", { className: "relative block w-full overflow-hidden rounded-[var(--xen-radius-md)]", children: [art, (0, jsx_runtime_1.jsx)("span", { style: { backgroundImage: `linear-gradient(to top, ${arcade_v4_1.ART_SCRIM}, transparent)` }, className: "absolute inset-x-0 bottom-0 block p-md", children: (0, jsx_runtime_1.jsx)("span", { style: { color: arcade_v4_1.ART_INK }, className: "line-clamp-2 font-heading text-lg font-bold", children: game.title }) })] })) : (art);
    const meta = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex flex-col gap-xs', list && 'min-w-0 flex-1'), children: [featured ? null : ((0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 font-heading text-base font-bold text-on-card", children: game.title })), game.genre != null || game.installed ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-wrap items-center gap-xs", children: [game.genre ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: arcade_v4_1.IDENTITY_TONE, children: game.genre })) : null, game.installed ? (
                    // Owned is an affirmative state of the title, not an identity —
                    // one of the module's only two remaining status badges.
                    (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: "success", children: "Installed" })) : null] })) : null, rating && game.rating != null ? (
            // The raw value, not `ratingParts`' rounded glyph count: `RatingV4`
            // clips the row at the exact fraction, and a pre-rounded input throws
            // that away. `showValue` puts the numeral beside it, which is what a
            // low-vision user actually compares.
            (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: game.rating, size: "sm", showValue: true, label: rating.label })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cover, meta] }));
    const bodyShape = list
        ? 'min-w-0 flex-1 flex-row items-center gap-md'
        : 'w-full flex-col items-stretch gap-sm';
    const activation = interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onClick?.(game), "aria-label": (0, arcade_v4_1.spokenLine)([
            game.title,
            game.genre,
            game.installed ? 'Installed' : undefined,
            rating?.label,
            game.price,
        ]), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('flex rounded-[var(--xen-radius-md)] text-left', chrome_v4_1.MIN_TAP_CLASS, bodyShape, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex', bodyShape), children: body }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex rounded-[var(--xen-radius-lg)] border border-border bg-card p-lg text-on-card', list ? 'flex-row items-center gap-md' : 'flex-col gap-sm', className), children: [activation, onPlay ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)(!list && (featured ? 'self-stretch [&>*]:w-full' : 'self-start')), children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: game.installed ? 'secondary' : 'primary', size: "sm", disabled: loading, "aria-busy": loading || undefined, onClick: () => onPlay(game), "aria-label": `${actionWord} ${game.title}`, children: game.installed ? playLabel : (game.price ?? installLabel) }) })) : null] }));
});
//# sourceMappingURL=GameCardV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCard = GameCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Rating_1 = require("../primitives/Rating");
/**
 * A game / store title card — key art, title, genre, star rating, and a
 * Play/Install action. `onClick(game)` opens the title (the card becomes a
 * keyboard-operable `role="button"`); `onPlay(game)` runs the primary action
 * (a real `<button>`) with its label bound to `game.installed`. Composes `Card`,
 * `Button`, `Badge`, `Rating`. Token-only — no literal colors.
 */
function GameCard({ game, variant = 'grid', loading = false, onClick, onPlay, className, }) {
    const list = variant === 'list';
    const featured = variant === 'featured';
    const aspect = list ? '' : featured ? 'aspect-video' : 'aspect-[3/4]';
    const cover = game.coverUrl ? ((0, jsx_runtime_1.jsx)("img", { src: game.coverUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] bg-neutral-200 object-cover', list ? 'h-[72px] w-[72px]' : (0, cn_1.cn)('w-full', aspect)) })) : ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-md)] bg-primary', list ? 'h-[72px] w-[72px]' : (0, cn_1.cn)('w-full', aspect)), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDFAE", size: "2xl", color: "onPrimary" }) }));
    const action = onPlay ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: game.installed ? 'secondary' : 'primary', size: "sm", disabled: loading, "aria-busy": loading || undefined, onClick: (e) => {
            e.stopPropagation();
            onPlay(game);
        }, "aria-label": `${game.installed ? 'Play' : 'Install'} ${game.title}`, children: game.installed ? 'Play' : game.price ?? 'Install' })) : null;
    const meta = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-1', list && 'min-w-0 flex-1'), children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-base font-bold text-on-surface", children: game.title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [game.genre ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: game.genre }) : null, game.installed ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: "Installed" }) : null] }), game.rating != null && Number.isFinite(game.rating) ? ((0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: game.rating, size: "sm" })) : null] }));
    const inner = list ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [cover, meta, action ? (0, jsx_runtime_1.jsx)("div", { children: action }) : null] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: [cover, meta, action ? (0, jsx_runtime_1.jsx)("div", { className: featured ? 'self-stretch [&>*]:w-full' : 'self-start', children: action }) : null] }));
    const interactive = Boolean(onClick);
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': game.title,
                onClick: () => onClick(game),
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick(game);
                    }
                },
            }
            : {}), children: inner }));
}
//# sourceMappingURL=GameCard.js.map
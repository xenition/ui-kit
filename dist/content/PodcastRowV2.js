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
exports.PodcastRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * PodcastRow — **artwork-forward player card** alternate design (web / React DOM).
 *
 * Large square artwork with the play/pause control overlaid at its center on a
 * scrim, title + show stacked to the right, and the duration shown as a tinted
 * pill. A "now playing" feel versus the base list row with a tiny trailing
 * button. Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: elevation via `shadow-md`, the play scrim via `bg-neutral-900/40`,
 * the duration pill via `bg-primary/10` + `text-primary`. No literal colors.
 */
exports.PodcastRowV2 = React.forwardRef(function PodcastRowV2({ episode, playing = false, onPlayToggle, onClick, variant = 'standard', className, ...rest }, ref) {
    const compact = variant === 'compact';
    const artClass = compact ? 'h-16 w-16' : 'h-[84px] w-[84px]';
    const interactive = !!onClick;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? episode.title : undefined, onClick: interactive ? () => onClick?.(episode) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.(episode);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-md', interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative shrink-0 overflow-hidden rounded-[var(--xen-radius-md)]', artClass), children: [episode.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: episode.artworkUrl, alt: "", loading: "lazy", className: "h-full w-full bg-neutral-100 object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center bg-accent", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-2xl leading-none text-on-accent", children: "\uD83C\uDFA7" }) })), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? `Pause ${episode.title}` : `Play ${episode.title}`, "aria-pressed": playing, disabled: !onPlayToggle, onClick: onPlayToggle
                            ? (e) => {
                                e.stopPropagation();
                                onPlayToggle(!playing);
                            }
                            : undefined, className: (0, cn_1.cn)('absolute inset-0 flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-60 motion-reduce:transition-none', playing ? 'bg-neutral-900/30' : 'bg-neutral-900/45'), children: (0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-sm", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: playing ? '❙❙' : '▶', size: "sm", color: "onPrimary" }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-base font-extrabold leading-snug text-on-surface", children: episode.title }), episode.show ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-1 text-sm text-muted", children: episode.show }) : null, episode.duration ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex self-start rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs font-bold text-primary", children: episode.duration })) : null] })] }));
});
//# sourceMappingURL=PodcastRowV2.js.map
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
exports.PodcastRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * PodcastRow — **minimal playlist line** alternate design (web / React DOM).
 *
 * A borderless, hairline-separated line: a tiny rounded artwork, a single-line
 * title with the show beneath, the duration right-aligned, and a compact
 * text-glyph play control. Built for dense episode lists rather than the base
 * bordered card. Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: the divider is `bg-border`, the active play glyph is `text-primary`
 * (muted when idle). No literal colors.
 */
exports.PodcastRowV3 = React.forwardRef(function PodcastRowV3({ episode, playing = false, onPlayToggle, onClick, variant = 'standard', className, ...rest }, ref) {
    const compact = variant === 'compact';
    const artClass = compact ? 'h-9 w-9' : 'h-11 w-11';
    const interactive = !!onClick;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? episode.title : undefined, onClick: interactive ? () => onClick?.(episode) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.(episode);
                }
            }
            : undefined, className: (0, cn_1.cn)('py-[var(--xen-space-xs)]', interactive &&
            'cursor-pointer transition-opacity hover:opacity-80 motion-reduce:transition-none', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [episode.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: episode.artworkUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('shrink-0 rounded-[var(--xen-radius-sm)] bg-neutral-100 object-cover', artClass) })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-accent', artClass), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-sm leading-none text-on-accent", children: "\uD83C\uDFA7" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: episode.title }), episode.show ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: episode.show }) : null] }), episode.duration ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs font-semibold text-muted", children: episode.duration })) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? `Pause ${episode.title}` : `Play ${episode.title}`, "aria-pressed": playing, disabled: !onPlayToggle, onClick: onPlayToggle
                            ? (e) => {
                                e.stopPropagation();
                                onPlayToggle(!playing);
                            }
                            : undefined, className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-70 disabled:opacity-50 motion-reduce:transition-none", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: playing ? '❙❙' : '▶', size: "sm", color: playing ? 'primary' : 'muted' }) })] }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "mt-[var(--xen-space-xs)] h-px w-full bg-border" })] }));
});
//# sourceMappingURL=PodcastRowV3.js.map
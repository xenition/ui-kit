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
exports.PodcastCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * PodcastCard, redesigned (v3): a **compact show row**. Small artwork left, the
 * title over a publisher·episode-count line, and a quiet Subscribe button on the
 * right — hairline-bordered for a shows list. The opposite of v2's featured card.
 * Same props, token-only.
 */
exports.PodcastCardV3 = React.forwardRef(function PodcastCardV3({ podcast, subscribed = false, variant, onClick, onSubscribeToggle, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const meta = [podcast.publisher, typeof podcast.episodeCount === 'number' ? `${podcast.episodeCount} eps` : null].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-podcast-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": podcast.title, onClick: interactive ? () => onClick?.(podcast) : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(podcast);
        } } : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl", children: podcast.artworkUrl ? (0, jsx_runtime_1.jsx)("img", { src: podcast.artworkUrl, alt: "", className: "h-full w-full object-cover" }) : '🎙️' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: podcast.title }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta }) : null] }), onSubscribeToggle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: subscribed ? 'ghost' : 'outline', onClick: (e) => { e.stopPropagation(); onSubscribeToggle(!subscribed); }, children: subscribed ? 'Subscribed' : 'Subscribe' })) : null] }));
});
//# sourceMappingURL=PodcastCardV3.js.map
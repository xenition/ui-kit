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
exports.GameCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
/**
 * GameCard, redesigned (v2): a **cover-hero store card**. The key art fills the
 * card; a rating badge and price float over it, the title/genre sit on a scrim,
 * and a Play/Install button anchors the foot. Elevated, hover-lift. Distinct from
 * v1. Same props, token-only.
 */
exports.GameCardV2 = React.forwardRef(function GameCardV2({ game, variant, loading = false, onClick, onPlay, className }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-game-card": "", className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": interactive ? `Open ${game.title}` : game.title, onClick: interactive ? () => onClick?.(game) : undefined, disabled: !interactive, className: "relative block aspect-[3/4] w-full overflow-hidden bg-neutral-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", children: [game.coverUrl ? (0, jsx_runtime_1.jsx)("img", { src: game.coverUrl, alt: "", className: "h-full w-full object-cover" }) : (0, jsx_runtime_1.jsx)("span", { className: "flex h-full w-full items-center justify-center text-5xl", children: "\uD83C\uDFAE" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-x-0 top-0 flex items-start justify-between p-2", children: [typeof game.rating === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-neutral-900/60 px-2 py-0.5 text-xs font-bold text-neutral-50", children: ["\u2605 ", game.rating.toFixed(1)] }) : (0, jsx_runtime_1.jsx)("span", {}), game.price ? (0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-surface/90 px-2 py-0.5 text-xs font-bold text-on-surface", children: game.price }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-900/75 to-transparent p-2 pt-8", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-neutral-50", children: game.title }), game.genre ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-neutral-300", children: game.genre }) : null] })] }), onPlay ? ((0, jsx_runtime_1.jsx)("div", { className: "p-2", children: (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", variant: "primary", className: "w-full", disabled: loading, onClick: () => onPlay(game), children: game.installed ? 'Play' : 'Install' }) })) : null] }));
});
//# sourceMappingURL=GameCardV2.js.map
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
exports.GameCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
/**
 * GameCard, redesigned (v3): a **dense library row**. A small cover thumbnail, the
 * title over a genre·rating line, the price, and a compact Play/Install — hairline-
 * bordered for a list. The opposite of v2's cover hero. Same props, token-only.
 */
exports.GameCardV3 = React.forwardRef(function GameCardV3({ game, variant, loading = false, onClick, onPlay, className }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const meta = [game.genre, typeof game.rating === 'number' ? `★ ${game.rating.toFixed(1)}` : null, game.price].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-game-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": interactive ? `Open ${game.title}` : game.title, onClick: interactive ? () => onClick?.(game) : undefined, disabled: !interactive, className: "flex min-w-0 flex-1 items-center gap-3 text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-14 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl", children: game.coverUrl ? (0, jsx_runtime_1.jsx)("img", { src: game.coverUrl, alt: "", className: "h-full w-full object-cover" }) : '🎮' }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm font-semibold text-on-surface", children: game.title }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted", children: meta }) : null] })] }), onPlay ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", disabled: loading, onClick: () => onPlay(game), children: game.installed ? 'Play' : 'Install' })) : null] }));
});
//# sourceMappingURL=GameCardV3.js.map
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
exports.LineupFieldV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * LineupField — **V4** "broadcast" design (web parity of the native V4). The
 * starting XI as a matchday graphic: the pitch is a soft, token-derived tinted
 * surface (a `success` wash — the grass token, never a literal green) carrying a
 * halfway line + center circle, and player tokens sit on it as bold **primary**
 * (home) / accent (away) dots with shirt number + name so a token is legible
 * without color. Formation caption and per-player tap are preserved. Same
 * props/behavior as {@link LineupFieldProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
exports.LineupFieldV4 = React.forwardRef(function LineupFieldV4({ players = [], formation, height = 320, onSelectPlayer, emptyLabel = 'Lineup not announced', className, ...rest }, ref) {
    const token = (p) => {
        const away = p.side === 'away';
        const a11y = `${p.name}${p.number !== undefined ? `, number ${p.number}` : ''}, ${p.side ?? 'home'}`;
        const interactive = (0, interactive_1.tappableProps)(onSelectPlayer ? () => onSelectPlayer(p) : undefined, a11y);
        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('absolute flex w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center', onSelectPlayer && interactive_1.FOCUS_RING), style: { left: `${clamp01(p.x) * 100}%`, top: `${clamp01(p.y) * 100}%` }, ...(onSelectPlayer ? {} : { 'aria-label': a11y }), ...interactive, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface text-xs font-extrabold shadow-sm', away ? 'bg-accent text-on-accent' : 'bg-primary text-on-primary'), children: p.number ?? '·' }), (0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 truncate rounded-full bg-surface/80 px-1 text-center text-xs font-bold text-on-surface", children: p.name })] }, p.id));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [formation ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-extrabold text-on-surface", children: ["Formation ", formation] })) : null, (0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": `Lineup pitch${formation ? `, ${formation}` : ''}`, className: "relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-success/10", style: { height }, children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "absolute inset-x-0 top-1/2 h-px bg-success/30" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-success/30" }), players.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel }) })) : (players.map(token))] })] }));
});
//# sourceMappingURL=LineupFieldV4.js.map
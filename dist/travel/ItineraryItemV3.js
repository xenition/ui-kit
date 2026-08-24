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
exports.ItineraryItemV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const KIND_GLYPH = { flight: '✈️', hotel: '🏨', activity: '🎟️', transfer: '🚕', meal: '🍽️' };
const DOT = { upcoming: 'bg-neutral-400', active: 'bg-primary', done: 'bg-success' };
/**
 * ItineraryItem, redesigned (v3): a **dense agenda line**. The time leads, then the
 * glyph, the title over a subtitle, and a status dot pinned right — hairline-
 * bordered for a packed day plan. The opposite of v2's timeline card. Status is
 * dot + text, never color alone. Same props, token-only.
 */
exports.ItineraryItemV3 = React.forwardRef(function ItineraryItemV3({ kind = 'activity', glyph, time, title, subtitle, status = 'upcoming', showConnector, onClick, className, ...rest }, ref) {
    void showConnector;
    const mark = glyph ?? KIND_GLYPH[kind];
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-itinerary-item": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${title}, ${status}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [time ? (0, jsx_runtime_1.jsx)("span", { className: "w-14 shrink-0 text-xs font-semibold tabular-nums text-muted", children: time }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: mark }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-medium text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subtitle }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-full', DOT[status]), "aria-label": status })] }));
});
//# sourceMappingURL=ItineraryItemV3.js.map
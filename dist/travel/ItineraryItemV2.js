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
exports.ItineraryItemV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const KIND_GLYPH = { flight: '✈️', hotel: '🏨', activity: '🎟️', transfer: '🚕', meal: '🍽️' };
const NODE = { upcoming: 'bg-surface border-border', active: 'bg-primary border-primary', done: 'bg-success border-success' };
/**
 * ItineraryItem, redesigned (v2): a **timeline card**. A time gutter and a node dot
 * with a connector run down the left; the glyph, title and subtitle sit in an
 * elevated card to the right. Distinct from v1's flat row. Same props, token-only.
 */
exports.ItineraryItemV2 = React.forwardRef(function ItineraryItemV2({ kind = 'activity', glyph, time, title, subtitle, status = 'upcoming', showConnector = true, onClick, className, ...rest }, ref) {
    const mark = glyph ?? KIND_GLYPH[kind];
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-itinerary-item": "", className: (0, cn_1.cn)('flex gap-3', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-12 shrink-0 flex-col items-center", children: [time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: time }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-1 h-3 w-3 rounded-full border-2', NODE[status]), "aria-hidden": true }), showConnector ? (0, jsx_runtime_1.jsx)("span", { className: "mt-1 w-px flex-1 bg-border", "aria-hidden": true }) : null] }), (0, jsx_runtime_1.jsxs)("div", { role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": title, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                } } : undefined, className: (0, cn_1.cn)('mb-3 flex flex-1 items-center gap-3 rounded-lg bg-surface p-3 shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", "aria-hidden": true, children: mark }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subtitle }) : null] })] })] }));
});
//# sourceMappingURL=ItineraryItemV2.js.map
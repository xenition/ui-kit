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
exports.ItineraryItemV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const KIND_GLYPH = {
    flight: '✈',
    hotel: '🏨',
    activity: '🎟',
    transfer: '🚕',
    meal: '🍽',
};
/** Status → pill copy, glyph and Badge tone (announced, never color-alone). */
const STATUS_PILL = {
    upcoming: { label: 'Upcoming', glyph: '○', tone: 'neutral' },
    active: { label: 'Now', glyph: '●', tone: 'warn' },
    done: { label: 'Done', glyph: '✓', tone: 'success' },
};
/**
 * ItineraryItem — **V4** "journey" design (web parity of the native V4). One
 * boarding-pass timeline row: the kind glyph rides a small brand-gradient disc
 * (the signature V4 touch) sitting on a token connector rail, with the time,
 * title and detail line beside it and a status pill (`Badge`) — done→success,
 * active→warn, upcoming→neutral. Same props/behavior as
 * {@link ItineraryItemProps}; all colors from `--xen-*` token classes (no literal
 * colors). Set `showConnector={false}` on the final row.
 */
exports.ItineraryItemV4 = React.forwardRef(function ItineraryItemV4({ kind = 'activity', glyph, time, title, subtitle, status = 'upcoming', showConnector = true, onClick, className, ...rest }, ref) {
    const mark = glyph ?? KIND_GLYPH[kind];
    const pill = STATUS_PILL[status];
    const interactive = typeof onClick === 'function';
    const a11yLabel = `${title}${time ? `, ${time}` : ''}, ${status}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-itinerary-item": "", "aria-label": a11yLabel, className: (0, cn_1.cn)('flex gap-[var(--xen-space-md)]', interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-8 flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50", children: mark }), showConnector ? (0, jsx_runtime_1.jsx)("div", { className: "mt-[2px] w-[2px] flex-1 bg-border" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col gap-[2px]', showConnector ? 'pb-[var(--xen-space-lg)]' : ''), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: time }) : (0, jsx_runtime_1.jsx)("span", {}), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: pill.tone, variant: "soft", size: "sm", children: `${pill.glyph} ${pill.label}` })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: subtitle }) : null] })] }));
});
//# sourceMappingURL=ItineraryItemV4.js.map
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
exports.EventBlockV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
/**
 * EventBlock, redesigned (v2): a **bold filled block**. The event fills its tone
 * color with the title, time range and location reversed out — a solid, punchy
 * block regardless of the `variant`. Selected gains a ring. Distinct from v1. Same
 * props, token-only.
 */
exports.EventBlockV2 = React.forwardRef(function EventBlockV2({ event, variant, size = 'md', selected = false, onPress, height, className }, ref) {
    void variant;
    const t = (0, format_1.toneClasses)(event.tone);
    const interactive = typeof onPress === 'function';
    const small = size === 'sm';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-event-block": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${event.title}${selected ? ', selected' : ''}`, onClick: interactive ? () => onPress?.(event) : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPress?.(event);
        } } : undefined, style: height ? { height } : undefined, className: (0, cn_1.cn)('flex flex-col justify-center overflow-hidden rounded-md px-3 py-2 shadow-sm', t.solidBg, t.solidText, selected && 'ring-2 ring-offset-1 ring-primary', interactive && 'cursor-pointer', className), children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold", children: event.title }), !small ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs opacity-90", children: [(0, format_1.timeRangeLabel)(event.start, event.end), event.location ? ` · ${event.location}` : ''] }) : null] }));
});
//# sourceMappingURL=EventBlockV2.js.map
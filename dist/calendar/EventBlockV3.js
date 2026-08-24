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
exports.EventBlockV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
/**
 * EventBlock, redesigned (v3): a **minimal accent-rail line**. A thin tone-colored
 * left bar precedes the title and time on a bare surface — the lightest possible
 * block for a dense agenda. Selected tints faintly. The opposite of v2's filled
 * block. Same props, token-only.
 */
exports.EventBlockV3 = React.forwardRef(function EventBlockV3({ event, variant, size = 'md', selected = false, onPress, height, className }, ref) {
    void variant;
    const t = (0, format_1.toneClasses)(event.tone);
    const interactive = typeof onPress === 'function';
    const small = size === 'sm';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-event-block": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${event.title}${selected ? ', selected' : ''}`, onClick: interactive ? () => onPress?.(event) : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPress?.(event);
        } } : undefined, style: height ? { height } : undefined, className: (0, cn_1.cn)('flex items-center gap-2 overflow-hidden border-l-4 py-1.5 pl-2', t.accentBorder, selected && 'bg-primary/5', interactive && 'cursor-pointer', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-medium text-on-surface", children: event.title }), !small ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: [(0, format_1.timeRangeLabel)(event.start, event.end), event.location ? ` · ${event.location}` : ''] }) : null] }) }));
});
//# sourceMappingURL=EventBlockV3.js.map
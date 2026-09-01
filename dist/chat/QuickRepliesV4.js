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
exports.QuickRepliesV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
/**
 * **V4 quick replies** — the web twin of the native `QuickRepliesV4`, same
 * props as {@link QuickReplies} plus `wrap` and `groupLabel`.
 *
 * ## Three changes
 *
 * 1. **The chips wrap.** See `wrap`.
 * 2. **Every chip clears 44** and hovers with the shared state layer.
 * 3. **The set is a real list with a name**, so a reader hears "Quick
 *    replies, 3 items" instead of three unrelated buttons.
 *
 * **Renders nothing for an empty list** (§4.5).
 */
exports.QuickRepliesV4 = React.forwardRef(function QuickRepliesV4({ replies, wrap = true, groupLabel = 'Quick replies', onSelect, className, ...rest }, ref) {
    const list = replies?.filter((r) => r?.label) ?? [];
    if (list.length === 0)
        return null;
    // The base's props extend `HTMLAttributes<HTMLDivElement>`, so the root
    // stays a `<div>` and the list lives inside it.
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-quick-replies": "", className: className, ...rest, children: (0, jsx_runtime_1.jsx)("ul", { "aria-label": groupLabel, className: (0, cn_1.cn)('flex gap-sm', wrap
                ? 'flex-wrap'
                : 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'), children: list.map((reply) => ((0, jsx_runtime_1.jsx)("li", { className: (0, cn_1.cn)(!wrap && 'shrink-0'), children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onSelect?.(reply.id), "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('inline-flex items-center rounded-full border border-border bg-card px-md text-sm font-semibold text-on-card', chrome_v4_1.MIN_TAP_CLASS), children: reply.label }) }, reply.id))) }) }));
});
//# sourceMappingURL=QuickRepliesV4.js.map
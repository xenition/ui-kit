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
exports.ProfileStats = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A horizontal row of value-over-label stat columns for a profile header
 * (posts, followers, following, …). Any column can be clickable. Renders bare
 * (not a card) so it drops into any header. Web parity of the native
 * `ProfileStats`; token-only.
 */
exports.ProfileStats = React.forwardRef(function ProfileStats({ stats, dividers = false, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "group", className: (0, cn_1.cn)('flex items-center', className), ...rest, children: stats.map((s, i) => {
            const inner = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: String(s.value) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: s.label })] }));
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [dividers && i > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "my-xs w-px self-stretch bg-border", "aria-hidden": "true" })) : null, s.onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${s.value} ${s.label}`, onClick: s.onClick, className: "flex-1 transition-opacity hover:opacity-70", children: inner })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: inner }))] }, `${s.label}-${i}`));
        }) }));
});
//# sourceMappingURL=ProfileStats.js.map
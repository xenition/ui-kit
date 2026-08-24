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
exports.StatCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A single at-a-glance metric card. The `value` is the dominant element; the
 * `delta` reads in a success (up) or danger (down) tone. Token-only; the web
 * mirror of a dashboard stat tile every admin screen otherwise hand-rolls.
 */
exports.StatCard = React.forwardRef(function StatCard({ label, value, delta, trend, icon, className, ...rest }, ref) {
    const deltaTone = trend === 'down' ? 'text-danger' : trend === 'up' ? 'text-success' : 'text-muted';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${label}: ${String(value)}${delta ? `, ${delta}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-xs bg-surface text-on-surface border border-border', 'rounded-[var(--xen-radius-lg)] p-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: label }), icon ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: icon }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-surface", children: value }), delta ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold', deltaTone), children: [trend === 'up' ? '▲ ' : trend === 'down' ? '▼ ' : '', delta] })) : null] }));
});
//# sourceMappingURL=StatCard.js.map
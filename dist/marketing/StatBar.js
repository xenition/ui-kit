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
exports.Stat = exports.StatBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const AnimatedCounter_1 = require("../motion/AnimatedCounter");
const cn_1 = require("../primitives/cn");
/** Horizontal row of `Stat`s — counts up as it scrolls into view. */
exports.StatBar = React.forwardRef(function StatBar({ className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-statbar": "", className: (0, cn_1.cn)('flex flex-wrap items-start justify-center gap-x-[var(--xen-space-2xl)] gap-y-[var(--xen-space-lg)]', className), ...rest }));
});
/** One statistic: an `AnimatedCounter` with prefix/suffix and a label. */
exports.Stat = React.forwardRef(function Stat({ to, label, prefix, suffix, duration, format, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-stat": "", className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-xs)] text-center', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "font-heading text-3xl font-bold text-on-surface", children: [prefix, (0, jsx_runtime_1.jsx)(AnimatedCounter_1.AnimatedCounter, { to: to, duration: duration, format: format }), suffix] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted", children: label })] }));
});
//# sourceMappingURL=StatBar.js.map
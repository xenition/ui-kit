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
exports.StatV4 = exports.StatBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const AnimatedCounter_1 = require("../motion/AnimatedCounter");
const cn_1 = require("../primitives/cn");
/**
 * StatBar — **V4** "showcase" design (web parity of the native V4). A content
 * section, so NOT a gradient surface: a centered, wrapping row of `StatV4`s on
 * the page ground with generous 8-pt gutters. Same props/behavior as
 * {@link StatBarProps}; token-only colors, no literals.
 */
exports.StatBarV4 = React.forwardRef(function StatBarV4({ className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-statbar": "", className: (0, cn_1.cn)('flex flex-wrap items-start justify-center gap-x-[var(--xen-space-2xl)] gap-y-[var(--xen-space-lg)]', className), ...rest }));
});
/**
 * Stat — **V4** "showcase" design (web parity of the native V4). One statistic:
 * a big extra-bold **tabular-nums** numeral (an `AnimatedCounter` with
 * prefix/suffix that counts up as it scrolls into view) over a muted label. Same
 * props/behavior as {@link StatProps}; token-only colors, no literals.
 */
exports.StatV4 = React.forwardRef(function StatV4({ to, label, prefix, suffix, duration, format, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-stat": "", className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-xs)] text-center', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "font-heading text-4xl font-extrabold tracking-tight tabular-nums text-on-surface", children: [prefix, (0, jsx_runtime_1.jsx)(AnimatedCounter_1.AnimatedCounter, { to: to, duration: duration, format: format }), suffix] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted", children: label })] }));
});
//# sourceMappingURL=StatBarV4.js.map
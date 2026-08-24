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
exports.NeighborhoodStat = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * Web parity of the native `NeighborhoodStat`: a single neighborhood metric tile
 * — a labelled value with an optional trend delta, wrapped in a token-styled card
 * with an optional leading glyph and a caption. Composes the shared `Statistic`
 * (which owns the delta tone/arrow logic) and `Icon`. Presentational only; all
 * colors come from the `--xen-*` tokens — no literal colors.
 */
exports.NeighborhoodStat = React.forwardRef(function NeighborhoodStat({ label, value, delta, trend, suffix, glyph, caption, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-start gap-3 border border-border bg-surface p-[var(--xen-space-lg)]', 'rounded-[var(--xen-radius-lg)]', className), ...rest, children: [glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", color: "primary" }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Statistic, { label: label, value: value, delta: delta, trend: trend, suffix: suffix }), caption ? (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-xs text-muted", children: caption }) : null] })] }));
});
//# sourceMappingURL=NeighborhoodStat.js.map
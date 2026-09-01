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
exports.HomeHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const TONE_GLYPH = {
    success: '🛡️',
    warn: '⚠️',
    danger: '🚨',
};
/**
 * HomeHeader — the smart-home dashboard **hero** and the module's peak moment
 * (web parity of the native twin). A brand-gradient ground carries a near-white
 * greeting + home name, a frosted security/status pill (tone + glyph, never
 * color alone), a weather glance and a run of metric tiles, then an optional row
 * of quick-scene chips. Every color derives from the brand ramp — the gradient
 * is `from-primary-500 to-primary-700`, ink is `text-primary-50/100`, and the
 * frosted tiles are `bg-primary-50/15` with a `border-primary-50/30` hairline —
 * token-only, no literals, light + dark. Presentational: shaped data +
 * callbacks, nothing fetches.
 */
exports.HomeHeader = React.forwardRef(function HomeHeader({ homeName, greeting, statusLabel, statusTone = 'success', weather, metrics, scenes, onScene, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [greeting ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-primary-100", children: greeting })) : null, (0, jsx_runtime_1.jsx)("p", { className: "truncate text-3xl font-extrabold tracking-tight text-primary-50", children: homeName })] }), statusLabel ? ((0, jsx_runtime_1.jsxs)("span", { role: "status", className: "inline-flex shrink-0 items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: TONE_GLYPH[statusTone], size: "sm", "aria-hidden": true }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-50", children: statusLabel })] })) : null] }), weather || (metrics && metrics.length > 0) ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex flex-wrap gap-[var(--xen-space-sm)]", children: [weather ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[112px] flex-1 items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [weather.glyph ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: weather.glyph, size: "xl", "aria-hidden": true })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-primary-50", children: weather.temp }), weather.condition ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-primary-100", children: weather.condition })) : null] })] })) : null, (metrics ?? []).map((m) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[112px] flex-1 flex-col justify-center rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-primary-50", children: m.value }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-primary-100", children: m.label })] }, m.label)))] })) : null, scenes && scenes.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)] flex flex-wrap gap-[var(--xen-space-sm)]", children: scenes.map((s) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": s.label, onClick: () => onScene?.(s.id), className: "inline-flex min-h-[44px] items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: [s.glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: s.glyph, size: "sm", "aria-hidden": true }) : null, s.label] }, s.id))) })) : null] }));
});
//# sourceMappingURL=HomeHeader.js.map
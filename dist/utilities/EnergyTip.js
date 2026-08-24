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
exports.EnergyTip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const CATEGORY = {
    heating: { label: 'Heating', glyph: '🔥' },
    cooling: { label: 'Cooling', glyph: '❄️' },
    lighting: { label: 'Lighting', glyph: '💡' },
    water: { label: 'Water', glyph: '💧' },
    appliance: { label: 'Appliances', glyph: '🔌' },
    general: { label: 'Tip', glyph: '🌱' },
};
const EFFORT_LABEL = {
    easy: 'Easy',
    moderate: 'Moderate',
    project: 'Project',
};
/**
 * An energy-saving tip card: a tinted category glyph disc, a headline + body, an
 * optional effort tag, and an optional estimated monthly saving badge. The
 * saving is integer cents via `formatMoney`, so the printed figure never drifts.
 * Becomes a `role="button"` surface only when `onClick` is supplied. Every color
 * traces to a `--xen-*` token — no literals. Web parity of the native
 * `EnergyTip`.
 */
exports.EnergyTip = React.forwardRef(function EnergyTip({ title, body, category = 'general', savingsCents, effort, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, className, ...rest }, ref) {
    const cd = CATEGORY[category] ?? CATEGORY.general;
    const savings = savingsCents != null ? Math.max(0, Math.trunc(savingsCents)) : null;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, variant: interactive ? 'interactive' : 'outlined', className: (0, cn_1.cn)(interactive && 'cursor-pointer', className), ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${cd.label} tip: ${title}${savings != null ? `, save about ${format(savings, currency)} per month` : ''}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] bg-success/10", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: cd.glyph, size: "lg", "aria-label": cd.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: cd.label.toUpperCase() }), effort != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", size: "sm", children: EFFORT_LABEL[effort] })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }), body != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: body }) : null, savings != null ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-0.5", children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", size: "sm", children: `Save ~${format(savings, currency)}/mo` }) })) : null] })] }) }));
});
//# sourceMappingURL=EnergyTip.js.map
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
exports.DealForecastV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const charts_1 = require("../charts");
const money_1 = require("../commerce/money");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 deal forecast** — the web twin of the native `DealForecastV4`, same
 * props as {@link DealForecast} plus `formatTarget`, `targetLabel` and
 * `attainedLabel`.
 *
 * ## Four changes
 *
 * 1. **The target is finally shown.** `targetCents` is documented as "shown as
 *    a labelled reference" and was only ever used to compute a percentage: a
 *    caller supplied a quota and the block printed "78%" and the words "vs
 *    target" — never the quota itself, so there was nothing to check the
 *    percentage against. It is rendered now, through `formatTarget`.
 * 2. **Attainment is clamped.** The base divided raw, so a reversed period
 *    rendered a *negative* percent and a bumper quarter drew past the end of
 *    its own track. {@link attainment} clamps to 0–100.
 * 3. **Hitting quota is a word, not a colour.** Crossing the target was
 *    signalled by turning the figure green — colour alone, and green drawn with
 *    a **fill** token used as ink. `attainedLabel` renders beside the figure
 *    and joins the accessible sentence.
 * 4. **The total is tabular and the empty state is real** — a titled
 *    {@link EmptyStateV4} with status semantics, not a lone grey line where a
 *    chart should be.
 */
exports.DealForecastV4 = React.forwardRef(function DealForecastV4({ periods, title = 'Forecast', currency = 'USD', targetCents, color = 'primary', height = 128, emptyLabel = 'No forecast data', formatTarget, targetLabel = 'vs target', attainedLabel = 'Target met', className, ...rest }, ref) {
    const series = periods ?? [];
    const total = series.reduce((sum, p) => sum + (Number.isFinite(p.valueCents) ? p.valueCents : 0), 0);
    const pct = (0, crm_v4_1.attainment)(total, targetCents);
    const attained = pct != null && pct >= 100;
    // The default has to be built here rather than in the signature: it closes
    // over `currency`, which is itself a prop.
    const spellTarget = formatTarget ?? ((cents) => (0, money_1.formatMoney)(cents, currency));
    const totalText = (0, money_1.formatMoney)(total, currency);
    const targetText = targetCents != null && targetCents > 0 ? spellTarget(targetCents) : undefined;
    const summary = (0, crm_v4_1.spokenLine)([
        title,
        totalText,
        pct != null ? `${Math.round(pct)}% ${targetLabel}` : undefined,
        targetText,
        attained ? attainedLabel : undefined,
    ]);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: title }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold text-on-surface', crm_v4_1.TABULAR_CLASS), children: totalText })] }), pct != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: targetLabel }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', crm_v4_1.TABULAR_CLASS, attained ? (0, crm_v4_1.toneInkClass)('success') : 'text-on-surface'), children: `${Math.round(pct)}%` }), attained ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', (0, crm_v4_1.toneInkClass)('success')), children: attainedLabel })) : null] }), targetText ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', crm_v4_1.TABULAR_CLASS), children: targetText })) : null] })) : null] }), series.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { role: "status", "aria-label": emptyLabel, title: emptyLabel })) : ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: series.map((p) => (Number.isFinite(p.valueCents) ? p.valueCents : 0)), labels: series.map((p) => p.label), color: color, height: height, "aria-label": summary }))] }));
});
//# sourceMappingURL=DealForecastV4.js.map
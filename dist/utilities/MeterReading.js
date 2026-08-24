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
exports.MeterReading = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const SOURCE_LABEL = {
    estimated: 'Estimated',
    actual: 'Actual read',
    customer: 'Self-reported',
};
/**
 * A meter reading entry: previous and current dial values with the derived
 * consumption between them. Consumption is `current − previous`, guarded to
 * never render negative (a rollover / correction clamps to 0) and always printed
 * via `formatUsage` (fixed decimals, no `NaN` leak). A "source" tag distinguishes
 * an estimated read from an actual one. Every color traces to a `--xen-*` token.
 * Web parity of the native `MeterReading`.
 */
exports.MeterReading = React.forwardRef(function MeterReading({ kind, previous, current, unit, decimals = 0, date, source, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    const prev = Number.isFinite(previous) ? previous : 0;
    const curr = Number.isFinite(current) ? current : 0;
    const consumption = Math.max(0, curr - prev);
    const caption = date != null ? (source != null ? `${date} · ${SOURCE_LABEL[source]}` : date) : source != null ? SOURCE_LABEL[source] : null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "lg", "aria-label": `${kd.label} meter` }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-base font-bold text-on-surface", children: [kd.label, " meter"] }), caption != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: caption }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Previous" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: (0, format_1.formatUsage)(prev, u, decimals) })] }), (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2192", color: "muted", "aria-label": "to" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Current" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: (0, format_1.formatUsage)(curr, u, decimals) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Used" }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-primary", children: (0, format_1.formatUsage)(consumption, u, decimals) })] })] })] }));
});
//# sourceMappingURL=MeterReading.js.map
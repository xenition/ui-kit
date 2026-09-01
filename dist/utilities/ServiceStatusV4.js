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
exports.ServiceStatusV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const status_1 = require("./internal/status");
/**
 * ServiceStatus — **V4** design. The clean, trust-first service card: an elevated
 * rounded surface, the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch), and the operational `state` carried by a status `Badge`.
 * The state (active → success, outage → danger, maintenance/degraded → warn) is
 * still conveyed by **glyph + label + a color that traces to a semantic token** —
 * never color alone. Purely presentational; same props/behavior as
 * {@link ServiceStatusProps}; token-only colors.
 */
exports.ServiceStatusV4 = React.forwardRef(function ServiceStatusV4({ kind, state, location, updated, detail, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.serviceState)(state);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "xl", color: "onPrimary", "aria-label": `${kd.label} service` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: kd.label }), location != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: location }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), detail != null ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-md)] text-sm text-on-surface", children: detail })) : null, updated != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-[var(--xen-space-xs)] text-xs text-muted", children: ["Updated ", updated] })) : null] }));
});
//# sourceMappingURL=ServiceStatusV4.js.map
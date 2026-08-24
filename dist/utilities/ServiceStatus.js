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
exports.ServiceStatus = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * A status card for one service connection. The `state` (active/outage/
 * maintenance/degraded) is conveyed by **glyph + label + a tint that traces to a
 * semantic token** (active → success, outage → danger) — never color alone. A
 * left rail tinted to the state's tone reinforces it without carrying the signal
 * by itself. Purely presentational; every color traces to a `--xen-*` token. Web
 * parity of the native `ServiceStatus`.
 */
exports.ServiceStatus = React.forwardRef(function ServiceStatus({ kind, state, location, updated, detail, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.serviceState)(state);
    const slot = (0, format_1.tintSlot)(sd.tone);
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, variant: "outlined", className: (0, cn_1.cn)('flex items-stretch gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-1 shrink-0 rounded-full', format_1.SOLID_TINT[slot]), "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)]', format_1.DISC_TINT[slot]), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "lg", "aria-label": `${kd.label} service` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: kd.label }), location != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: location }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), detail != null ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-sm)] text-sm text-on-surface", children: detail })) : null, updated != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-[var(--xen-space-xs)] text-xs text-muted", children: ["Updated ", updated] })) : null] })] }));
});
//# sourceMappingURL=ServiceStatus.js.map
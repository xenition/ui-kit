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
exports.ServiceStatusV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * ServiceStatus, redesigned (v2): a **big status banner card**. A state-tinted
 * banner fills the top with a large service-glyph tile and an oversized state
 * headline (glyph + label) beside the utility line and location; the detail and
 * "updated" caption sit in a plain body below. Lifted with a shadow. Distinct at
 * a glance from v1's slim left-rail card and v3's inline chip. Same props; state
 * is glyph + label + a tint that traces to a semantic token (never color alone);
 * token-pure.
 */
exports.ServiceStatusV2 = React.forwardRef(function ServiceStatusV2({ kind, state, location, updated, detail, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.serviceState)(state);
    const slot = (0, format_1.tintSlot)(sd.tone);
    const hasBody = detail != null || updated != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface text-on-surface shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', format_1.DISC_TINT[slot]), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-14 w-14 items-center justify-center rounded-[var(--xen-radius-md)]', format_1.DISC_TINT[slot]), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "2xl", "aria-label": `${kd.label} service` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-extrabold', format_1.TEXT_TINT[slot]), children: `${sd.glyph} ${sd.label}` }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm font-semibold text-on-surface", children: [kd.label, location != null ? ` · ${location}` : ''] })] })] }), hasBody ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-lg)]", children: [detail != null ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: detail }) : null, updated != null ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["Updated ", updated] }) : null] })) : null] }));
});
//# sourceMappingURL=ServiceStatusV2.js.map
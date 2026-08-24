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
exports.ServiceRequestRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const KIND_GLYPH = {
    repair: '🔧',
    connect: '🔌',
    disconnect: '⛔',
    transfer: '📦',
    inspection: '🔍',
    meter: '📟',
    other: '📋',
};
/**
 * One line in a service-request / work-order list: a tinted kind glyph disc, a
 * title/number stack, an optional date, and a status pill. The state is conveyed
 * redundantly (glyph + label + a color that traces to a semantic token:
 * completed → success, cancelled → neutral) so it is never color-alone; a `high`
 * priority adds an explicit "Urgent" tag rather than relying on color. Becomes a
 * `role="button"` row only when `onClick` is supplied. Web parity of the native
 * `ServiceRequestRow`.
 */
exports.ServiceRequestRow = React.forwardRef(function ServiceRequestRow({ requestNumber, title, status, kind = 'other', date, priority = 'normal', onClick, className, ...rest }, ref) {
    const sd = (0, status_1.requestState)(status);
    const slot = (0, format_1.tintSlot)(sd.tone);
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.other;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `Request ${requestNumber}, ${title}, ${sd.label}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)]', format_1.DISC_TINT[slot]), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, "aria-label": `${kind} request` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: requestNumber }), date != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\u00B7 ", date] }) : null, priority === 'high' ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "danger", variant: "soft", size: "sm", children: "! Urgent" })) : null] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] }));
});
//# sourceMappingURL=ServiceRequestRow.js.map
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
exports.PackageRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const internal_1 = require("./internal");
/**
 * Dense list row for a single package: id headline, contents/SKU sub-line, a
 * weight + dimensions metric line, and an optional glyph + word status badge.
 * Clickable when `onClick` is given (button role + descriptive label). Selection
 * is shown by a primary border plus `aria-selected`, not by color alone (the
 * status still carries a word). All colors are theme tokens. Web parity of the
 * native `PackageRow`.
 */
exports.PackageRow = React.forwardRef(function PackageRow({ packageId, contents, weight, weightUnit = 'kg', dimensions, status, selected = false, onClick, className, ...rest }, ref) {
    const meta = status ? internal_1.SHIPMENT_META[status] : undefined;
    const interactive = (0, internal_1.pressableProps)(onClick);
    const metric = [weight != null ? (0, internal_1.formatWeight)(weight, weightUnit) : null, dimensions]
        .filter(Boolean)
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `Package ${packageId}${meta ? `, ${meta.label}` : ''}` : undefined, "aria-selected": interactive ? selected : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border bg-surface p-[var(--xen-space-sm)]', selected ? 'border-primary' : 'border-border', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-neutral-100 text-base text-muted", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCE6" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: packageId }), contents ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: contents }) : null, metric ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: metric }) : null] }), meta ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })) : null] }));
});
//# sourceMappingURL=PackageRow.js.map
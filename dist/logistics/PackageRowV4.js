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
exports.PackageRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const internal_1 = require("./internal");
/**
 * PackageRow — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a parcel row: an elevated rounded row with
 * a soft shadow, a parcel glyph in a soft-primary well, the package-id headline,
 * a contents sub-line, a weight · dimensions metric chip, and a labelled glyph +
 * word status badge (never color alone). Selection is shown by a primary ring +
 * `aria-selected`; clickable when `onClick` is set. Honors the V4 `variant` —
 * `full` (default) and `compact` (a denser single line that hides the metric
 * detail) — identical props/behavior to {@link PackageRowProps}. All colors from
 * `--xen-*` token classes (no literals).
 */
exports.PackageRowV4 = React.forwardRef(function PackageRowV4({ packageId, contents, weight, weightUnit = 'kg', dimensions, status, selected = false, variant = 'full', onClick, className, ...rest }, ref) {
    const meta = status ? internal_1.SHIPMENT_META[status] : undefined;
    const interactive = (0, internal_1.pressableProps)(onClick);
    const metric = [weight != null ? (0, internal_1.formatWeight)(weight, weightUnit) : null, dimensions]
        .filter(Boolean)
        .join(' · ');
    const shell = 'rounded-[var(--xen-radius-lg)] border bg-surface text-on-surface shadow-sm';
    const a11y = `Package ${packageId}${meta ? `, ${meta.label}` : ''}`;
    const statusBadge = meta ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] })) : null;
    // ── compact: denser single line ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-package-row": "", "aria-label": interactive ? a11y : undefined, "aria-selected": interactive ? selected : undefined, className: (0, cn_1.cn)(shell, 'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', selected ? 'border-primary' : 'border-border', interactive &&
                'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base", children: "\uD83D\uDCE6" }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: packageId }), weight != null ? ((0, jsx_runtime_1.jsx)("span", { className: "whitespace-nowrap text-xs tabular-nums text-muted", children: (0, internal_1.formatWeight)(weight, weightUnit) })) : null, (0, jsx_runtime_1.jsx)("span", { className: "ml-auto", children: statusBadge })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-package-row": "", "aria-label": interactive ? a11y : undefined, "aria-selected": interactive ? selected : undefined, className: (0, cn_1.cn)(shell, 'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', selected ? 'border-primary' : 'border-border', interactive &&
            'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-lg", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCE6" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: packageId }), contents ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: contents }) : null, metric ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex w-fit items-center rounded-[var(--xen-radius-sm)] bg-primary/10 px-[var(--xen-space-xs)] text-xs tabular-nums text-muted", children: metric })) : null] }), statusBadge] }));
});
//# sourceMappingURL=PackageRowV4.js.map
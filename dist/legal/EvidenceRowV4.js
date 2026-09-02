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
exports.EvidenceRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * EvidenceRow — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on an evidence exhibit: an elevated rounded row
 * with a soft shadow, the kind glyph tucked in a soft-primary well, an exhibit
 * eyebrow over the description, a chain-of-custody meta line, an optional
 * "Chain verified" marker (glyph + word, not bare color), and a labelled glyph +
 * word admissibility pill (never color alone). `compact` truncates and hides the
 * meta line. When `onClick` is set the row is a keyboard-activable `role="button"`.
 * Reuses the base `variant` (`default` / `compact`). All colors from `--xen-*`
 * token classes (no literals).
 */
exports.EvidenceRowV4 = React.forwardRef(function EvidenceRowV4({ exhibit, title, kind = 'document', status, source, date, custodyVerified, variant = 'default', onClick, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const kindMeta = internal_1.EVIDENCE_KIND_META[kind];
    const interactive = Boolean(onClick);
    const meta = [source, date].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-evidence-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Evidence ${exhibit ? `${exhibit}, ` : ''}${title}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', compact ? 'min-h-[44px]' : 'min-h-[56px]', interactive && 'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-base leading-none", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: kindMeta.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [exhibit ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: exhibit }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-on-surface', compact && 'truncate'), children: title }), !compact && meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: meta }) : null, custodyVerified ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-success", children: "\uD83D\uDD17 Chain verified" }) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EVIDENCE_STATUS_META[status], variant: "soft", size: "sm" }) : null] }));
});
//# sourceMappingURL=EvidenceRowV4.js.map
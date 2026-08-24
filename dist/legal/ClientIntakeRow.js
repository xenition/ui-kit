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
exports.ClientIntakeRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A prospective-client intake row: name, matter type, intake stage and
 * conflict-check pills (each a glyph + word so state never rests on color
 * alone). When `actionable` and still open, an accept/decline row of real
 * `<button>`s is shown (Accept is disabled on a hard conflict). When `onClick`
 * is set the row is an accessible `role="button"`. All colors are `--xen-*`
 * token classes — no literals.
 */
exports.ClientIntakeRow = React.forwardRef(function ClientIntakeRow({ name, practiceArea, status = 'new', conflict, source, summary, avatarUrl, variant = 'default', actionable = false, onAccept, onDecline, onClick, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const decided = status === 'retained' || status === 'declined';
    const showActions = actionable && !decided;
    const interactive = Boolean(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Intake ${name}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer hover:bg-neutral-100', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: name }), source ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: source }) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.INTAKE_STATUS_META[status], size: "sm" })] }), !compact ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [practiceArea ? ((0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PRACTICE_AREA_META[practiceArea], variant: "soft", size: "sm" })) : null, conflict ? ((0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CONFLICT_CHECK_META[conflict], variant: "soft", size: "sm" })) : null] })) : null, !compact && summary ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: summary })) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-xs)]", children: [onAccept ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", disabled: conflict === 'conflict', onClick: (e) => {
                            e.stopPropagation();
                            onAccept();
                        }, children: "Accept" })) : null, onDecline ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", onClick: (e) => {
                            e.stopPropagation();
                            onDecline();
                        }, children: "Decline" })) : null] })) : null] }));
});
//# sourceMappingURL=ClientIntakeRow.js.map
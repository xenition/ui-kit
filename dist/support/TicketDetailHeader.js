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
exports.TicketDetailHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** Status glyph + label for the frosted status tile — status is never color-only. */
const STATUS_META = {
    open: { glyph: '◉', label: 'Open' },
    pending: { glyph: '◐', label: 'Pending' },
    solved: { glyph: '✓', label: 'Solved' },
    closed: { glyph: '✕', label: 'Closed' },
};
/** Priority glyph + label for the frosted priority tile. */
const PRIORITY_META = {
    low: { glyph: '▽', label: 'Low' },
    normal: { glyph: '▷', label: 'Normal' },
    high: { glyph: '△', label: 'High' },
    urgent: { glyph: '⚑', label: 'Urgent' },
};
/**
 * TicketDetailHeader — the gradient "console" hero shown when an agent opens a
 * ticket. The one saturated surface at the top of the detail view: the subject
 * reads as big near-white ink over a `from-primary-500 to-primary-700` ground,
 * with the ticket id, status, optional priority, and SLA countdown carried on
 * frosted tiles (`bg-primary-50/15`, `border-primary-50/30`). A requester row
 * (avatar + requester → assignee), optional tag chips, and a near-white primary
 * "Solve" pill beside a ghost "Assign" button complete it. Status/priority/SLA
 * carry a glyph so meaning is never color-only. Presentational — shaped data +
 * callbacks only; every color derives from the brand ramp (token-only, no
 * literals), light + dark safe.
 */
exports.TicketDetailHeader = React.forwardRef(function TicketDetailHeader({ subject, ticketId, status, priority, requester, requesterAvatar, assignee, slaLabel, slaBreached = false, tags, onSolve, solveLabel = 'Solve', onAssign, assignLabel = 'Assign', className, ...rest }, ref) {
    const statusMeta = STATUS_META[status] ?? STATUS_META.open;
    const priorityMeta = priority ? PRIORITY_META[priority] : undefined;
    const Tile = ({ glyph, label, a11yLabel, }) => ((0, jsx_runtime_1.jsxs)("span", { role: "img", "aria-label": a11yLabel, className: "inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary-50", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph }), (0, jsx_runtime_1.jsx)("span", { children: label })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-100", children: ticketId }), (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-extrabold leading-tight tracking-tight text-primary-50", children: subject })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Tile, { glyph: statusMeta.glyph, label: statusMeta.label, a11yLabel: `Status ${statusMeta.label}` }), priorityMeta ? ((0, jsx_runtime_1.jsx)(Tile, { glyph: priorityMeta.glyph, label: priorityMeta.label, a11yLabel: `Priority ${priorityMeta.label}` })) : null, slaLabel ? ((0, jsx_runtime_1.jsx)(Tile, { glyph: slaBreached ? '⚠' : '⏱', label: slaLabel, a11yLabel: slaBreached ? `SLA breached, ${slaLabel}` : `SLA, ${slaLabel}` })) : null] }), requester || assignee ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "md", name: requester, src: requesterAvatar }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-col", children: [requester ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-primary-50", children: requester })) : null, assignee ? ((0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm text-primary-100", children: ["Assigned to ", assignee] })) : null] })] })) : null, tags && tags.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", "aria-label": "Tags", children: tags.map((tag) => ((0, jsx_runtime_1.jsx)("li", { className: "rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-[2px] text-xs font-semibold text-primary-100", children: tag }, tag))) })) : null, onSolve || onAssign ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: [onSolve ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": solveLabel, onClick: onSolve, className: "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-[var(--xen-radius-md)] bg-on-primary px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: solveLabel })) : null, onAssign ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": assignLabel, onClick: onAssign, className: "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-[var(--xen-radius-md)] border border-primary-50/30 px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-base font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: assignLabel })) : null] })) : null] }));
});
//# sourceMappingURL=TicketDetailHeader.js.map
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
exports.SafetyChecklist = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const format_1 = require("./internal/format");
const VERDICT = {
    pass: { glyph: '✓', slot: 'success', label: 'Pass' },
    fail: { glyph: '✕', slot: 'danger', label: 'Fail' },
    unchecked: { glyph: '○', slot: 'muted', label: 'Unchecked' },
};
/** Cycle a verdict pass → fail → unchecked → pass on tap. */
function nextVerdict(current) {
    return current === 'pass' ? 'fail' : current === 'fail' ? 'unchecked' : 'pass';
}
/**
 * A pass/fail safety checklist. Each item is a clickable `<button>` row with a
 * verdict glyph disc (pass → success, fail → danger — conveyed by glyph +
 * label + color, never color alone) that cycles the verdict via `onToggle`.
 * When any item is a flagged `hazard` failure, a danger `Alert` banner is
 * raised at the top. Handles the empty state (`EmptyState`) and a `loading`
 * skeleton. No literal colors.
 */
exports.SafetyChecklist = React.forwardRef(function SafetyChecklist({ title, items, onToggle, loading = false, emptyLabel = 'No safety items', className, style }, ref) {
    const list = Array.isArray(items) ? items : [];
    const hazardCount = list.filter((i) => i.hazard && i.verdict === 'fail').length;
    const failCount = list.filter((i) => i.verdict === 'fail').length;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: className, style: style, children: (0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading safety checklist", className: "flex flex-col gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "50%", height: 14 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", lines: 3 })] }) }));
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, title: emptyLabel, description: "Safety checkpoints will appear here.", className: className, style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: className, style: style, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [title != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title })) : ((0, jsx_runtime_1.jsx)("span", {})), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: failCount > 0 ? 'danger' : 'success', children: failCount > 0 ? `✕ ${failCount} failing` : '✓ All clear' })] }), hazardCount > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)]", children: (0, jsx_runtime_1.jsx)(primitives_1.Alert, { tone: "danger", title: "Hazard \u2014 do not proceed", children: `${hazardCount} blocking safety ${hazardCount === 1 ? 'item is' : 'items are'} failing.` }) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: list.map((item) => {
                    const vd = VERDICT[item.verdict] ?? VERDICT.unchecked;
                    const iconColor = vd.slot === 'muted' ? 'muted' : vd.slot;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${item.label}, ${vd.label}`, onClick: () => onToggle?.(item.id, nextVerdict(item.verdict)), className: "flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-left transition-opacity hover:opacity-80", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', format_1.DISC_TINT[vd.slot]), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: vd.glyph, size: "sm", color: iconColor, "aria-label": vd.label }) }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm font-medium text-on-surface", children: item.label }), item.hazard ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "danger", children: "\u26A0 Hazard" }) : null] }, item.id));
                }) })] }));
});
//# sourceMappingURL=SafetyChecklist.js.map
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
exports.ExerciseRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A workout-set row: exercise name, a `sets × reps` prescription, an optional
 * weight, and a completion toggle. Completed rows read muted with a success
 * check. `onToggle` receives the next boolean. Web parity of the native
 * `ExerciseRow`; token-only, `role="checkbox"`.
 */
exports.ExerciseRow = React.forwardRef(function ExerciseRow({ name, sets, reps, weight, done = false, meta, onToggle, className, ...rest }, ref) {
    const prescription = sets != null && reps != null
        ? `${sets} × ${reps}`
        : sets != null
            ? `${sets} sets`
            : reps != null
                ? `${reps} reps`
                : undefined;
    const detailParts = [prescription, weight != null ? String(weight) : undefined, meta].filter(Boolean);
    const a11y = `${name}${detailParts.length ? `, ${detailParts.join(', ')}` : ''}, ${done ? 'done' : 'not done'}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold', done ? 'text-muted' : 'text-on-surface'), children: name }), detailParts.length ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: detailParts.join('  ·  ') })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border-2', done ? 'border-success bg-success' : 'border-border bg-surface'), children: done ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-bold text-on-success", children: "\u2713" })) : null })] }));
    const rowClass = 'flex min-h-[52px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]';
    if (!onToggle) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(rowClass, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "checkbox", "aria-checked": done, "aria-label": a11y, tabIndex: 0, onClick: () => onToggle(!done), onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggle(!done);
            }
        }, className: (0, cn_1.cn)(rowClass, 'cursor-pointer transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: body }));
});
//# sourceMappingURL=ExerciseRow.js.map
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
exports.TaskRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PriorityTag_1 = require("./PriorityTag");
const DueDatePill_1 = require("./DueDatePill");
/**
 * TaskRow — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a task line: a leading {@link Checkbox}, a bigger,
 * more legible title, and the variant-driven trailing accessory (priority tag or
 * due pill). Completing a task is the satisfying moment — the row settles into a
 * **soft-success glow** with the title struck through. Same props/behavior as
 * {@link TaskRowProps}; all colors from `--xen-*` token classes (no literals).
 */
exports.TaskRowV4 = React.forwardRef(function TaskRowV4({ title, done = false, onToggle, onClick, variant = 'checkbox', priority = 'low', dueLabel, dueTone = 'upcoming', className }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] p-2 transition-colors', done ? 'bg-success/[0.08]' : 'bg-surface', className), children: [(0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: done, "aria-label": title, onChange: (e) => onToggle?.(e.currentTarget.checked) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": title, onClick: onClick, disabled: !onClick, className: "min-w-0 flex-1 text-left disabled:cursor-default", children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('line-clamp-2 text-base font-semibold leading-relaxed', done ? 'text-muted line-through' : 'text-on-surface'), children: title }) }), variant === 'priority' ? (0, jsx_runtime_1.jsx)(PriorityTag_1.PriorityTag, { level: priority }) : null, variant === 'dated' && dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] }));
});
//# sourceMappingURL=TaskRowV4.js.map
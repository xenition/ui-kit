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
exports.QuickAddTask = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** A single soft-primary quick-pick chip. Active = filled soft-primary; idle = outlined. */
function Chip({ chip, onPress, }) {
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": chip.active ?? false, onClick: onPress, disabled: !onPress, className: (0, cn_1.cn)('inline-flex min-h-[32px] items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold transition-colors', 'disabled:cursor-default', chip.active
            ? 'bg-primary/[0.14] text-primary-text'
            : 'border border-border bg-surface text-muted-text hover:bg-primary/[0.08]'), children: [chip.glyph ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: chip.glyph }) : null, chip.label] }));
}
/**
 * QuickAddTask — **V4** "flow" quick-add composer (web parity of the native
 * twin). A calm, rounded, elevated surface: a leading ⊕ glyph seated in a
 * **soft-primary disc**, a big legible controlled text input, a row of
 * soft-primary quick-pick chips (priority / due / project), and one **primary**
 * Add button (≥44px, disabled while empty or `adding`). Controlled — the caller
 * owns `value` and is handed the next text via `onChangeText`; `onAdd` fires on
 * the button or Enter with the trimmed value. Presentational only. All colors
 * from `--xen-*` token classes — no literals.
 */
exports.QuickAddTask = React.forwardRef(function QuickAddTask({ value, onChangeText, onChange, placeholder = 'Add a task…', onAdd, adding = false, label = 'Add a task', addLabel = 'Add', glyph = '⊕', priority, onPriority, dueLabel, onDue, projectLabel, onProject, className, ...rest }, ref) {
    const trimmed = value.trim();
    const canAdd = trimmed.length > 0 && !adding;
    const hasChips = Boolean(priority || dueLabel || projectLabel);
    const submit = () => {
        if (canAdd)
            onAdd?.(trimmed);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-card p-3 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/[0.14] text-xl text-primary-text", children: glyph }), (0, jsx_runtime_1.jsx)("input", { type: "text", role: "textbox", "aria-label": label, value: value, placeholder: placeholder, disabled: adding, onChange: (e) => {
                            onChangeText(e.currentTarget.value);
                            onChange?.(e);
                        }, onKeyDown: (e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                submit();
                            }
                        }, className: (0, cn_1.cn)('min-w-0 flex-1 bg-transparent text-base font-medium text-on-card outline-none', 'placeholder:text-muted disabled:opacity-50') }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { type: "button", onClick: submit, disabled: !canAdd, "aria-label": addLabel, className: "min-h-[44px] min-w-[44px]", children: addLabel })] }), hasChips ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-2 pl-14", children: [priority ? (0, jsx_runtime_1.jsx)(Chip, { chip: priority, onPress: onPriority }) : null, dueLabel ? (0, jsx_runtime_1.jsx)(Chip, { chip: dueLabel, onPress: onDue }) : null, projectLabel ? (0, jsx_runtime_1.jsx)(Chip, { chip: projectLabel, onPress: onProject }) : null] })) : null] }));
});
//# sourceMappingURL=QuickAddTask.js.map
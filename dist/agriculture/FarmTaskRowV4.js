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
exports.FarmTaskRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CheckboxV4_1 = require("../primitives/CheckboxV4");
const IconV4_1 = require("../primitives/IconV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const farm_v4_1 = require("./internal/farm-v4");
/** Priority → tone and default label. Genuinely a status, so the tones stay. */
const PRIORITY_META = {
    low: { label: 'Low', tone: 'neutral' },
    normal: { label: 'Normal', tone: 'primary' },
    high: { label: 'High', tone: 'warn' },
    urgent: { label: 'Urgent', tone: 'danger' },
};
/**
 * **V4 farm task row** — the web twin of the native `FarmTaskRowV4`, same
 * props as {@link FarmTaskRow} plus `priorityLabels` and `overdueLabel`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line.** Height, padding, gap, hover
 *    fill and separator inset come from `dashboard/internal/row-v4`, which is
 *    the file that decides them for every row in the kit.
 * 2. **The checkbox is `CheckboxV4`**, so its hit area, focus ring and checked
 *    transition match every other checkbox in the product.
 * 3. **`overdue` reaches assistive tech.** The base painted the due date red
 *    and stopped — colour alone, which is exactly what §6 forbids. The badge
 *    now carries the word.
 * 4. **A done task's title is struck through *and* dimmed**, so "done"
 *    survives a greyscale screenshot.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
exports.FarmTaskRowV4 = React.forwardRef(function FarmTaskRowV4({ title, done = false, due, priority = 'normal', field, assignee, icon, overdue = false, priorityLabels, overdueLabel = 'overdue', onToggle, onClick, last = false, className, ...rest }, ref) {
    if (!title)
        return null;
    const meta = PRIORITY_META[priority];
    const label = priorityLabels?.[priority] ?? meta.label;
    const caption = (0, farm_v4_1.metaLine)([due, field, assignee]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-farm-task-row": "", "data-xen-v4-chrome": onClick ? 'on-surface' : undefined, role: onClick ? 'button' : undefined, onClick: onClick, className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(Boolean(caption)), !last && (0, row_v4_1.rowEdgeClass)(), className), ...rest, children: [onToggle ? ((0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: done, 
                // The web `Checkbox` is an `<input type="checkbox">`, so it speaks
                // `onChange`; the native one speaks `onCheckedChange`. `onToggle`
                // is the module's own prop and takes the next value either way.
                onChange: (e) => onToggle(e.currentTarget.checked), "aria-label": title })) : icon ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg" })) : null, (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold text-on-card', 
                        // Struck AND dimmed: a strike survives greyscale, an opacity
                        // change on its own does not read as "done" to everyone.
                        done && 'line-through opacity-[0.38]'), children: title }), caption ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-xs', overdue && !done ? 'text-danger-text' : 'text-muted-text'), children: caption })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: overdue && !done ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "danger", variant: "soft", size: "sm", children: overdueLabel })) : ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })) })] }));
});
//# sourceMappingURL=FarmTaskRowV4.js.map
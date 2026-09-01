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
exports.PunchListItemV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CheckboxV4_1 = require("../primitives/CheckboxV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const row_v4_1 = require("../dashboard/internal/row-v4");
const job_v4_1 = require("./internal/job-v4");
const SEVERITY_V4 = {
    minor: { label: 'Minor', glyph: '·', tone: 'neutral' },
    major: { label: 'Major', glyph: '▲', tone: 'warn' },
    critical: { label: 'Critical', glyph: '!', tone: 'danger' },
};
/**
 * **V4 punch-list item** — the web twin of the native `PunchListItemV4`, same
 * props as {@link PunchListItem} plus `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **The whole row toggles, and it clears 44.** The target was a 16px
 *    checkbox on a surface used one-handed, outdoors, in gloves — while the
 *    description beside it, which is the part a thumb actually lands on, did
 *    nothing at all. The `<label>` now carries the row.
 * 2. **Severity, location and assignee join the control's name.** The
 *    checkbox announced the description alone, so a reader signing off a punch
 *    list heard the defect but never that it was critical, never where it was,
 *    and never whose it was.
 * 3. **An item with no `onToggle` is disabled, not enabled-and-inert.** The
 *    checkbox was fully controlled, so without a handler it could be clicked
 *    forever and never move.
 * 4. **It joins the shared row family** and takes the module's one badge
 *    shape, so a punch list and an inspection sheet read as one product.
 */
exports.PunchListItemV4 = React.forwardRef(function PunchListItemV4({ label, done, severity, location, assignee, onToggle, disabled = false, severityLabels, className, style }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const sd = severity ? SEVERITY_V4[severity] : undefined;
    const severityWord = severity ? (severityLabels?.[severity] ?? sd?.label) : undefined;
    const meta = (0, tone_v4_1.metaLine)([location, assignee]);
    // A control nobody can move is disabled, not enabled-and-inert.
    const locked = disabled || onToggle == null;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, className: (0, cn_1.cn)('w-full', className), children: (0, jsx_runtime_1.jsxs)("label", { "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(meta !== ''), 'rounded-[var(--xen-radius-md)]', locked ? 'cursor-default' : 'cursor-pointer'), children: [(0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: done, disabled: locked, onChange: (e) => onToggle?.(e.target.checked), "aria-label": (0, job_v4_1.spokenLine)([label, severityWord, location, assignee]) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('line-clamp-3 text-base font-semibold', done ? 'text-muted-text line-through' : 'text-on-card'), children: label }), meta !== '' ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: meta }) : null] }), sd ? ((0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...job_v4_1.BADGE_V4, children: `${sd.glyph} ${severityWord}` }) })) : null] }) }));
});
//# sourceMappingURL=PunchListItemV4.js.map
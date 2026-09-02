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
exports.HabitRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const goal_v4_1 = require("./goal-v4");
const tone_v4_2 = require("./internal/tone-v4");
/**
 * **V4 habit row** — same props as {@link HabitRow} plus `doneLabel`,
 * `notDoneLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **The check control was 26px** — and `HabitRowV3`'s was 18. This is the
 *    one thing a habit screen exists to let you tap, once a day, quickly. The
 *    whole row is the checkbox now and it clears 44 through the shared row
 *    height.
 * 2. **It is a real `<button>`.** A `div` with `role="checkbox"`, `tabIndex`
 *    and a hand-written Enter/Space handler is three approximations of a
 *    control the platform already ships, and the hand-written one fired Space
 *    on `keydown` where the platform fires it on `keyup`.
 * 3. **It joins the shared row family** — one height, one 44 leading slot, one
 *    gutter, one state layer — so a habit row and a settings row are one
 *    family rather than two near-misses. `hover:bg-neutral-100` goes with it: a
 *    light-oriented ramp step paints a near-white slab across a dark page.
 * 4. **The streak flame's ink is the corrected slot.** `text-warn` is
 *    `var(--xen-warn)`, a fill token with no contrast promise as text, and the
 *    streak count is the second most important number on the row.
 * 5. **Focus is `ring-ring`, and the state words are props.**
 *    `ring-primary-300` is a ramp step and the ramp mirrors in dark mode, so
 *    the focus ring inverted; "done" and "not done" were untranslatable.
 */
exports.HabitRowV4 = React.forwardRef(function HabitRowV4({ name, done, streak = 0, meta, onToggle, doneLabel = 'done', notDoneLabel = 'not done', appearance = 'classic', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    const safeStreak = Math.max(Math.floor(streak), 0);
    const label = (0, tone_v4_2.spokenLine)([
        name,
        meta,
        done ? doneLabel : notDoneLabel,
        safeStreak > 0 ? `${safeStreak} ${(0, goal_v4_1.pluralizeUnit)(safeStreak, 'day')} streak` : undefined,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('flex h-7 w-7 items-center justify-center rounded-full border-2 text-sm font-bold', done ? 'border-success bg-success text-on-success' : 'border-border bg-transparent'), children: done ? '✓' : '' }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold', done ? 'text-muted-text line-through' : 'text-on-card'), children: name }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: meta }) : null] }), safeStreak > 0 ? ((0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-sm leading-none", children: "\uD83D\uDD25" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', tone_v4_1.TONE_INK.warn), children: safeStreak })] })) : null] }));
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(meta != null), (0, row_v4_1.rowGroundClass)(false));
    if (!onToggle) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)((0, tone_v4_2.frameClass)(appearance), className), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: rowClass, children: [body, (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: label })] }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)((0, tone_v4_2.frameClass)(appearance), className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": done, "aria-label": label, onClick: () => onToggle(!done), "data-xen-v4-row": "", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)(rowClass, tone_v4_2.FOCUS_RING_CLASS), children: body }) }));
});
//# sourceMappingURL=HabitRowV4.js.map
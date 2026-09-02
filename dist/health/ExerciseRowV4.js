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
exports.ExerciseRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const tone_v4_2 = require("./internal/tone-v4");
/**
 * **V4 exercise row** — same props as {@link ExerciseRow} plus `setsLabel`,
 * `repsLabel`, `doneLabel`, `notDoneLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **The tick was a 24px target** in the middle of a set-logging screen,
 *    which is a control a sweaty thumb hits between reps. The whole row is now
 *    the checkbox and it clears 44 through the shared row height.
 * 2. **It is a real `<button>`.** A `div` with `role="checkbox"`, `tabIndex`
 *    and a hand-written Enter/Space handler is three approximations of a
 *    control the platform already ships — and the hand-written handler fired on
 *    `keydown` for Space, where the platform fires on `keyup`.
 * 3. **It joins the shared row family** — one height, one gutter, one state
 *    layer — so an exercise row, a settings row and a notification row stop
 *    being three components that merely resemble each other. It also replaces
 *    `hover:bg-neutral-100`, a light-oriented ramp step that paints a near-white
 *    slab across a dark page.
 * 4. **Focus is the kit's ring.** `ring-primary-300` is a ramp step, and the
 *    ramp mirrors in dark mode, so the focus ring inverted.
 * 5. **The four English words are props**, where a localised app had to fork
 *    the component to say "hecho".
 */
exports.ExerciseRowV4 = React.forwardRef(function ExerciseRowV4({ name, sets, reps, weight, done = false, meta, onToggle, setsLabel = 'sets', repsLabel = 'reps', doneLabel = 'done', notDoneLabel = 'not done', appearance = 'classic', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    const prescription = sets != null && reps != null
        ? `${sets} × ${reps}`
        : sets != null
            ? `${sets} ${setsLabel}`
            : reps != null
                ? `${reps} ${repsLabel}`
                : undefined;
    const details = [prescription, weight != null ? String(weight) : undefined, meta];
    const caption = (0, tone_v4_1.metaLine)(details);
    const label = (0, tone_v4_2.spokenLine)([name, ...details, done ? doneLabel : notDoneLabel]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold', done ? 'text-muted-text' : 'text-on-card'), children: name }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: caption }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border-2', done ? 'border-success bg-success text-on-success' : 'border-border bg-transparent'), children: done ? '✓' : '' }) })] }));
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(caption !== ''), (0, row_v4_1.rowGroundClass)(false));
    if (!onToggle) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)((0, tone_v4_2.frameClass)(appearance), className), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: rowClass, children: [body, (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: label })] }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)((0, tone_v4_2.frameClass)(appearance), className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": done, "aria-label": label, onClick: () => onToggle(!done), "data-xen-v4-row": "", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)(rowClass, tone_v4_2.FOCUS_RING_CLASS), children: body }) }));
});
//# sourceMappingURL=ExerciseRowV4.js.map
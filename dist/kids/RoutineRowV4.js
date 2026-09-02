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
exports.RoutineRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** The fallback glyph for each time-of-day slot. */
const SLOT_GLYPH_V4 = {
    morning: '🌅',
    afternoon: '☀️',
    evening: '🌆',
    bedtime: '🌙',
    anytime: '⏰',
};
/**
 * **V4 routine row** — same props as {@link RoutineRow} plus `onClick`,
 * `doneLabel` and `notDoneLabel`.
 *
 * ## Six changes
 *
 * 1. **A routine step can be opened.** The base made the *entire row* one
 *    `<button role="checkbox">`, so ticking the box and opening the step were
 *    the same gesture and the second one could not exist — there was nowhere
 *    to put a photo of the finished bed, a note, or a history. The toggle is
 *    now a real checkbox at the trailing end and the activation is its
 *    sibling, each with its own name, exactly as `NextStepRowV4` splits the
 *    same pair.
 * 2. **`{...rest}` is spread first.** It was spread after `onClick` — and on
 *    this component it was also cast twice through `unknown` to get a
 *    `div`'s attributes onto a `<button>`, which silently smuggled a
 *    `div`-typed handler onto a button element.
 * 3. **The non-interactive row's name reached nobody.** With no `onToggle` the
 *    base put `aria-label` on a bare `div`, which browsers ignore, so a
 *    read-only routine announced nothing at all. The state word is now real
 *    text in the accessibility tree.
 * 4. **No dead checkbox.** With no `onToggle` the base still drew an
 *    apparently-tappable circle that did nothing; without a handler the row
 *    draws a static mark instead.
 * 5. **A ticked step fills `primary`, not `success`.** Ticking a step is a
 *    *selection*; `success` has to keep meaning that something went well, and
 *    in a module that draws children it must not become the colour of
 *    compliance.
 * 6. **Targets, press and disabled.** The checkbox was a 24px circle in a
 *    module built for children and is now 44; press is the M3 state layer
 *    rather than `hover:bg-neutral-50`, a light-scheme ramp step that paints a
 *    near-white slab on a dark page; disabled is M3's 0.38 band rather than
 *    `opacity-50`, a round number.
 */
exports.RoutineRowV4 = React.forwardRef(function RoutineRowV4({ label, slot = 'anytime', icon, time, done = false, disabled = false, doneLabel = 'done', notDoneLabel = 'not done', onToggle, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    if (!label)
        return null;
    const glyph = icon ?? SLOT_GLYPH_V4[slot];
    const stateWord = done ? doneLabel : notDoneLabel;
    const name = (0, tone_v4_1.spokenLine)([label, time, stateWord]);
    const boxClass = (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-full border-2', nav_v4_1.MIN_TAP_SQUARE_CLASS, done ? 'border-primary bg-primary text-on-primary' : 'border-border bg-transparent');
    const mark = done ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm font-bold", children: "\u2713" })) : null;
    const text = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold', done ? 'text-muted-text line-through' : 'text-on-card'), children: label }), time ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: time }) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-routine-row": "", className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(time != null), (0, row_v4_1.rowGroundClass)(false), disabled && tone_v4_1.DISABLED_CLASS, className), children: [onClick ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": name, disabled: disabled, onClick: () => onClick(), "data-xen-v4-state": "", style: (0, tone_v4_1.surfaceStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)]', 'bg-transparent text-left', chrome_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("span", { className: "text-lg leading-none", children: glyph }) }), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: text })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("span", { className: "text-lg leading-none", children: glyph }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [!onToggle ? (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: stateWord }) : null, text] })] })), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: onToggle ? ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": done, "aria-label": label, disabled: disabled, onClick: () => onToggle(!done), "data-xen-v4-state": "", style: 
                    // The box's own pair: a ticked box is filled `primary`, so its
                    // layer is `on-primary` over `primary`, not over the page.
                    (0, v4_state_1.stateGroundVars)(done ? 'var(--xen-primary)' : 'var(--xen-surface)', done ? 'var(--xen-on-primary)' : 'var(--xen-on-surface)'), className: (0, cn_1.cn)(boxClass, tone_v4_1.FOCUS_RING_CLASS), children: mark })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: boxClass, children: mark })) })] }));
});
//# sourceMappingURL=RoutineRowV4.js.map
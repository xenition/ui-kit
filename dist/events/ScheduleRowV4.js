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
exports.ScheduleRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const event_v4_1 = require("./internal/event-v4");
const DEFAULT_STATUS_LABELS = {
    scheduled: '',
    live: 'Live now',
    ended: 'Ended',
    cancelled: 'Cancelled',
};
/** Only `live` and `cancelled` are statuses; the other two are plain captions. */
const STATUS_TONE = {
    scheduled: 'neutral',
    live: 'success',
    ended: 'neutral',
    cancelled: 'danger',
};
const ROW_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)');
/**
 * **V4 schedule row** — the web twin of the native `ScheduleRowV4`, same props
 * as {@link ScheduleRow} plus `statusLabels`, `formatRange` and `trackTone`.
 *
 * ## Five changes
 *
 * 1. **`endTime` renders as the range its own prop doc has always promised.**
 *    The base stacked two bare times with no separator, so a row reading
 *    "10:30" over "11:15" looked like two *start* times — the reader had to
 *    guess which one the session began at. Default `` `${start}–${end}` ``,
 *    overridable for a locale that joins a range differently.
 * 2. **A cancelled slot does not announce identically to a live one.** The
 *    strike-through was a visual-only cue and the row's name was
 *    `` `${time} ${title}` `` — so a screen-reader user was told about a
 *    session that had been called off exactly what they were told about one
 *    that was running.
 * 3. **A track can carry identity.** The rail was `primary` for *every* track,
 *    so the colour said "there is a track" and nothing more, and the no-track
 *    rail was filled with `border` — a hairline token with no promise of being
 *    visible as a solid 3px bar. `trackTone` colours rail and caption together,
 *    and a row with no track draws no rail while keeping its width.
 * 4. **The status caption takes the contrast-corrected ink.** `text-success`
 *    and `text-danger` are *fill* slots; at 12px they are the least legible
 *    text on the row. `TONE_INK` is the slot the compiler corrects for text.
 * 5. **The row is a real `<button>` when it is clickable**, not a `div` with
 *    `role="button"` and a hand-written key handler; the gutter is tabular so
 *    a column of times lines up; and press is a state layer, not
 *    `hover:opacity-80` — which is how a row looks *disabled*.
 */
exports.ScheduleRowV4 = React.forwardRef(function ScheduleRowV4({ time, endTime, title, room, track, status = 'scheduled', statusLabels, formatRange, trackTone = 'neutral', onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const statusLabel = statusLabels?.[status] ?? DEFAULT_STATUS_LABELS[status];
    const isCancelled = status === 'cancelled';
    const interactive = typeof onClick === 'function';
    // The base types `onClick` against the row's `div`; the activation is a
    // real `<button>` now, and the two element types are unrelated.
    const activate = onClick;
    const range = endTime
        ? (formatRange ?? ((a, b) => `${a}–${b}`))(time, endTime)
        : time;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] shrink-0 items-start text-sm font-bold text-on-surface', event_v4_1.TABULAR_CLASS), children: range }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('w-xs shrink-0 self-stretch rounded-full', track ? tone_v4_1.TONE_BG[trackTone] : undefined) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-semibold text-on-surface', isCancelled && 'line-through'), children: title }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-row flex-wrap items-center gap-sm", children: [track ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', event_v4_1.TONE_INK[trackTone]), children: track })) : null, room ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: room }) : null, statusLabel ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', event_v4_1.TONE_INK[STATUS_TONE[status]]), children: statusLabel })) : null] })] })] }));
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-row items-stretch gap-md py-sm', className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: activate, "aria-label": (0, event_v4_1.spokenLine)([range, title, track, room, statusLabel]), "data-xen-v4-state": "", style: ROW_STATE, className: (0, cn_1.cn)('flex w-full flex-row items-stretch gap-md rounded-[var(--xen-radius-md)] px-xs py-sm text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body }) }));
});
//# sourceMappingURL=ScheduleRowV4.js.map
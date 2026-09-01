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
exports.SnoozeRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const mail_v4_1 = require("./internal/mail-v4");
/**
 * **V4 snooze row** — the same props as {@link SnoozeRow}, and no new ones. The
 * defects here were all in what it drew and what it said.
 *
 * ## Four changes
 *
 * 1. **A hovered preset stops looking like the chosen one.** Selected was
 *    `bg-primary-50` and hover was `bg-neutral-100` — two ramp steps of nearly
 *    the same lightness on a light page, and both near-white on a dark one. In
 *    a picker of five presets the pointer marked whichever row it was passing
 *    over as the answer. Selected is now the `selected` container and hover is
 *    the M3 state layer over it, so they are a step apart by construction.
 * 2. **The check mark is decorative.** It carried `aria-label="Selected"`, so a
 *    reader landed on the row, heard the whole preset, then landed again on a
 *    lone word "Selected" — a second stop saying what `aria-pressed` already
 *    said. Native had it hidden; only web spoke it.
 * 3. **The row clears 44.** `py-md` on a `base` line comes close, but it was
 *    coincidence rather than a floor, and a dense seed lost it.
 * 4. **The ink is the contrast-corrected slot**, and on the selected ground it
 *    is that ground's guaranteed pair — `primary` and `muted` are fills and
 *    neither was measured against the wash the row was painting behind them.
 */
exports.SnoozeRowV4 = React.forwardRef(function SnoozeRowV4({ label, when, glyph = '⏰', selected = false, onClick, className }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": (0, mail_v4_1.spokenLine)([`Snooze ${label}`, when]), "aria-pressed": selected, onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(selected ? 'var(--xen-selected)' : 'var(--xen-surface)', selected ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex w-full items-center gap-md rounded-[var(--xen-radius-md)] px-md py-md text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', selected ? mail_v4_1.ROW_SELECTED_CLASS : 'bg-transparent text-on-surface', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-lg leading-none', !selected && mail_v4_1.TONE_INK.muted), children: glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-base', selected ? 'font-bold' : 'font-medium'), children: label }), when ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-sm', !selected && mail_v4_1.TONE_INK.muted), children: when })) : null, selected ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "shrink-0 text-base leading-none", children: "\u2713" })) : null] }));
});
//# sourceMappingURL=SnoozeRowV4.js.map
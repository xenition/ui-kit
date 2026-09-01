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
exports.RSVPButtonV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const event_v4_1 = require("./internal/event-v4");
const OPTIONS = [
    { status: 'going', label: 'Going', glyph: '✓' },
    { status: 'maybe', label: 'Maybe', glyph: '?' },
    { status: 'declined', label: "Can't go", glyph: '✕' },
];
const SEGMENT_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 RSVP control** — the web twin of the native `RSVPButtonV4`, same props
 * as {@link RSVPButton} plus `optionLabels`.
 *
 * ## Four changes
 *
 * 1. **An RSVP answer is a choice, not a status.** The base painted
 *    `going → success`, `maybe → warn`, `declined → danger` — the same three
 *    slots this module spends on a cancelled session and a sold-out tier. A
 *    guest saying they cannot come has not made an error, and "Maybe" is not a
 *    warning. `RSVP_TONE` keeps `going` on the brand and leaves the other two
 *    neutral; a chosen neutral segment wears `selected`/`on-selected`, the
 *    compiler's own pair for a chosen container, so the label keeps a contrast
 *    promise instead of borrowing `on-surface` onto an unchecked tint.
 * 2. **The radiogroup has the roving focus a radiogroup owes.** Three tab stops
 *    for one answer is not a radiogroup; one stop plus arrows is, and the
 *    arrows change the answer the way a real radio group does.
 * 3. **Every segment clears 44, at both sizes.** `sm` was about 26 points tall
 *    — under the floor at the moment a guest is answering with one thumb.
 * 4. **Press is a state layer and disabled is 0.38.** `hover:bg-neutral-100` is
 *    a ramp step that mirrors under `[data-theme="dark"]`, and `opacity-50` is
 *    a rounder number than the band the theme actually ships.
 */
exports.RSVPButtonV4 = React.forwardRef(function RSVPButtonV4({ value, onChange, size = 'md', disabled = false, optionLabels, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const segmentRefs = React.useRef(new Map());
    const sizeCls = size === 'sm' ? 'px-sm text-xs' : 'px-md text-sm';
    const selectedIndex = OPTIONS.findIndex((opt) => opt.status === value);
    // The one tab stop: the chosen answer, or the first segment when unanswered.
    const tabIndexTarget = selectedIndex >= 0 ? selectedIndex : 0;
    const move = (from, delta) => {
        const next = (from + delta + OPTIONS.length) % OPTIONS.length;
        const option = OPTIONS[next];
        if (!option)
            return;
        segmentRefs.current.get(next)?.focus();
        onChange?.(option.status);
    };
    const onKeyDown = (e, index) => {
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                move(index, -1);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                move(index, 1);
                break;
            default:
                break;
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "radiogroup", className: (0, cn_1.cn)('inline-flex flex-row overflow-hidden rounded-[var(--xen-radius-md)] border border-border', disabled && v4_state_1.V4_DISABLED_SOFT_CLASS, className), ...rest, children: OPTIONS.map((opt, i) => {
            const selected = value === opt.status;
            const label = optionLabels?.[opt.status] ?? opt.label;
            const tone = event_v4_1.RSVP_TONE[opt.status] ?? 'neutral';
            return ((0, jsx_runtime_1.jsxs)("button", { ref: (el) => {
                    if (el)
                        segmentRefs.current.set(i, el);
                    else
                        segmentRefs.current.delete(i);
                }, type: "button", role: "radio", "aria-checked": selected, "aria-label": label, tabIndex: i === tabIndexTarget ? 0 : -1, disabled: disabled, onClick: () => onChange?.(opt.status), onKeyDown: (e) => onKeyDown(e, i), "data-xen-v4-state": "", style: SEGMENT_STATE, className: (0, cn_1.cn)('inline-flex flex-1 items-center justify-center gap-xs font-medium', chrome_v4_1.MIN_TAP_CLASS, sizeCls, i > 0 && 'border-l border-border', selected
                    ? tone === 'primary'
                        ? 'bg-primary font-bold text-on-primary'
                        : 'bg-selected font-bold text-on-selected'
                    : 'bg-card text-on-card', 'disabled:pointer-events-none', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "font-bold", children: opt.glyph }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: label })] }, opt.status));
        }) }));
});
//# sourceMappingURL=RSVPButtonV4.js.map
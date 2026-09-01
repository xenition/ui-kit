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
exports.CheckInRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const event_v4_1 = require("./internal/event-v4");
/**
 * **V4 check-in row** — the web twin of the native `CheckInRowV4`, same props
 * as {@link CheckInRow} plus `checkInLabel`, `checkedInLabel` and `undoLabel`.
 *
 * ## Four changes
 *
 * 1. **The only control on the row clears 44.** It was about 28 points tall —
 *    and this is a staff surface, worked one-handed at a door, at speed, with a
 *    queue behind it. Missing the target costs an attendee, not a scroll.
 * 2. **The button says who it is about.** `Check in Ada` was already right; it
 *    now carries the ticket type and the check-in time as well, so a scanner
 *    hears what they are confirming rather than just a verb and a name.
 * 3. **Press is a state layer and disabled is 0.38.** `hover:opacity-90` fades
 *    the button's own label, which is M3's *disabled* signal, and
 *    `disabled:opacity-50` is a rounder number than the one the theme ships.
 * 4. **The state's word is a prop.** `Check in` / `In` / `Undo check-in` were
 *    three hard-coded English strings on a screen staff read hundreds of times
 *    a night; and the visible word and the spoken one now agree.
 */
exports.CheckInRowV4 = React.forwardRef(function CheckInRowV4({ name, avatarUrl, ticketType, checkedInAt, checkedIn = false, onToggle, disabled = false, checkInLabel = 'Check in', checkedInLabel = 'Checked in', undoLabel = 'Undo check-in', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!name)
        return null;
    const stateWord = checkedIn ? checkedInLabel : 'Not in';
    const badgeText = checkedIn && checkedInAt ? `${checkedInLabel} · ${checkedInAt}` : stateWord;
    // The toggle wears a filled tone, so its state layer is that fill and its
    // own paired ink rather than the page's.
    const toggleState = (0, v4_state_1.stateGroundVars)(checkedIn ? 'var(--xen-success)' : 'var(--xen-primary)', checkedIn ? 'var(--xen-on-success)' : 'var(--xen-on-primary)');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-row items-center gap-md rounded-[var(--xen-radius-md)] border border-border bg-card p-md text-on-card', className), ...rest, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, alt: "", size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-card", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row flex-wrap items-center gap-sm", children: [ticketType ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: ticketType }) : null, (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: checkedIn ? 'success' : 'neutral', children: badgeText })] })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", role: "switch", "aria-checked": checkedIn, "aria-label": (0, event_v4_1.spokenLine)([
                    checkedIn ? undoLabel : checkInLabel,
                    name,
                    ticketType,
                    checkedIn ? checkedInAt : undefined,
                ]), disabled: disabled, onClick: () => onToggle?.(!checkedIn), "data-xen-v4-state": "", style: toggleState, className: (0, cn_1.cn)('inline-flex shrink-0 flex-row items-center justify-center gap-xs rounded-full px-md text-sm font-bold', chrome_v4_1.MIN_TAP_CLASS, checkedIn ? 'bg-success text-on-success' : 'bg-primary text-on-primary', v4_state_1.V4_DISABLED_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: checkedIn ? '✓' : '+' }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: checkedIn ? checkedInLabel : checkInLabel })] })] }));
});
//# sourceMappingURL=CheckInRowV4.js.map
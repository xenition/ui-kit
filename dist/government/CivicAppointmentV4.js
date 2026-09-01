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
exports.CivicAppointmentV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const civic_v4_1 = require("./internal/civic-v4");
/**
 * Status → word, glyph and tone.
 *
 * `scheduled` and `checked-in` are `neutral`: they are positions in a booking's
 * life, and a brand-coloured pill next to a green Confirmed reads as a rival
 * outcome.
 */
const STATUS_V4 = {
    scheduled: { label: 'Scheduled', glyph: '📅', tone: civic_v4_1.IDENTITY_TONE },
    confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
    'checked-in': { label: 'Checked in', glyph: '📍', tone: civic_v4_1.IDENTITY_TONE },
    completed: { label: 'Completed', glyph: '🏁', tone: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
    'no-show': { label: 'No-show', glyph: '!', tone: 'danger' },
};
const TERMINAL = ['completed', 'cancelled', 'no-show'];
/**
 * **V4 civic appointment** — the web twin of the native `CivicAppointmentV4`,
 * same props as {@link CivicAppointment} plus `reason`, `statusLabels`,
 * `confirmCheckInLabel` and `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **A no-show says why, and announces.** It is one of the module's five
 *    rejection states — the one that costs a claimant their slot and often a
 *    fee — and not one of the five interfaces had a field for the reason, on a
 *    component that had no live region at all. `reason` renders under the
 *    header whenever {@link isAdverse} is true and joins a polite announcement
 *    that arrives one commit after mount, because a live region announces
 *    *changes* and text present at first paint speaks to nobody.
 * 2. **Checking in takes a confirming press.** Checking in early at a DMV
 *    forfeits the slot, and nothing guarded the misfire: one tap on a ~32px
 *    target, no confirm, no pending state, no undo. The control arms first,
 *    renames itself, and disarms on blur.
 * 3. **The queue reference is labelled.** `#A-042` is a glyph and a string; a
 *    reader now hears "Reference A-042" and knows what to say at the counter.
 * 4. **Both actions clear 44.** `size="sm"` is about 32px and neither `Button`
 *    primitive sets a minimum height — and this is a control tapped in a queue,
 *    standing up, holding a folder.
 * 5. **A stage stops wearing the brand colour.** Scheduled and Checked in are
 *    positions, not verdicts; identity takes the neutral chip so Confirmed →
 *    success and No-show → danger remain the only coloured signals, and the
 *    leading disc stops being `bg-primary-50`, a ramp step that mirrors under
 *    `[data-theme="dark"]`.
 */
exports.CivicAppointmentV4 = React.forwardRef(function CivicAppointmentV4({ service, office, date, time, status = 'scheduled', location, reference, onCheckIn, onReschedule, reason, statusLabels, confirmCheckInLabel = 'Confirm check-in', referenceLabel = 'Reference', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [armed, setArmed] = React.useState(false);
    const sd = STATUS_V4[status] ?? STATUS_V4.scheduled;
    const word = statusLabels?.[status] ?? sd.label;
    const terminal = TERMINAL.includes(status);
    const showActions = !terminal && (onCheckIn != null || onReschedule != null);
    const referenceText = (0, civic_v4_1.labelledId)(referenceLabel, reference);
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const why = adverse ? reason : undefined;
    const checkInWord = armed ? confirmCheckInLabel : 'Check in';
    const announcement = (0, civic_v4_1.spokenLine)([
        service,
        office,
        `${date} ${time}`,
        word,
        why,
        referenceText,
    ]);
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
        setAnnounced(adverse ? announcement : '');
    }, [adverse, announcement]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: civic_v4_1.CARD_V4, className: className, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { role: "status", "aria-live": "polite", className: "sr-only", children: announced }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] py-sm", style: { background: (0, civic_v4_1.tintGround)(sd.tone) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDCC5", size: "lg", className: (0, civic_v4_1.tintInkClass)(sd.tone) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: service }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted-text", children: office }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm font-semibold text-on-surface", children: [date, " \u00B7 ", time] }), location != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCCD" }), " ", location] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 flex-col items-end gap-xs", children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${word}` }), referenceText != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: referenceText })) : null] })] }), why != null ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('mt-sm text-sm font-medium', (0, civic_v4_1.tintInkClass)(sd.tone)), children: why })) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex flex-wrap justify-end gap-sm", children: [onReschedule != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "outline", "aria-label": (0, civic_v4_1.spokenLine)(['Reschedule', service, `${date} ${time}`]), onClick: onReschedule, children: "Reschedule" })) : null, onCheckIn != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", "aria-label": (0, civic_v4_1.spokenLine)([checkInWord, service, office]), onClick: () => {
                            // Checking in early forfeits the slot, so the first press
                            // only arms.
                            if (!armed) {
                                setArmed(true);
                                return;
                            }
                            setArmed(false);
                            onCheckIn();
                        }, 
                        // Walking away from an armed check-in disarms it.
                        onBlur: () => setArmed(false), children: checkInWord })) : null] })) : null] }));
});
//# sourceMappingURL=CivicAppointmentV4.js.map
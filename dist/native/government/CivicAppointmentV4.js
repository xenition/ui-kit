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
exports.CivicAppointmentV4 = CivicAppointmentV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const civic_v4_1 = require("./internal/civic-v4");
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
 * **V4 civic appointment** — same props as {@link CivicAppointment} plus
 * `reason`, `statusLabels`, `confirmCheckInLabel` and `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **"Check in" takes a confirming press.** Checking in early at a DMV
 *    forfeits the slot, and the base put that one tap on a ~34pt button with
 *    nothing guarding the misfire. The first press arms the button and shows
 *    `confirmCheckInLabel`; the second checks in. Both actions clear 44.
 * 2. **A no-show says why.** It is one of the module's five rejection states
 *    and the only field it had was a red pill — nothing to carry "arrived
 *    after the 15-minute grace period". `isAdverse()` gates the `reason`, and
 *    the line is an assertive live region.
 * 3. **The reference is labelled.** It rendered as `` `#${reference}` ``, so a
 *    reader heard "number A dash 042" with no idea it was the queue ticket to
 *    quote at the desk.
 * 4. **The card is one announced object** — service, office, date, time,
 *    location, status and reference — where the base left seven loose text
 *    nodes a reader walked one at a time, and the two action buttons stay
 *    outside that name so they remain focus stops.
 * 5. **Having an appointment is not an outcome.** `scheduled` was `primary`
 *    and `checked-in` `accent`, and the calendar disc was `primary` as well.
 *    They are `IDENTITY_TONE` now, so `confirmed`, `completed` and `no-show`
 *    are the only states on the card wearing a colour that means something.
 *
 * **Renders nothing without a `service`** (§4.5).
 */
function CivicAppointmentV4({ service, office, date, time, status = 'scheduled', location, reference, reason, statusLabels, confirmCheckInLabel = 'Confirm check-in', referenceLabel = 'Reference', onCheckIn, onReschedule, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const [armed, setArmed] = React.useState(false);
    if (!service)
        return null;
    const sd = STATUS_V4[status] ?? STATUS_V4.scheduled;
    const statusWord = statusLabels?.[status] ?? sd.label;
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const showReason = adverse && Boolean(reason);
    const idLine = (0, civic_v4_1.labelledId)(referenceLabel, reference);
    const when = (0, tone_v4_1.metaLine)([date, time]);
    const terminal = TERMINAL.includes(status);
    const showActions = !terminal && (onCheckIn != null || onReschedule != null);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const disc = tokens.spacing['2xl'];
    const spoken = (0, civic_v4_1.spokenLine)([
        service,
        office,
        when,
        location,
        statusWord,
        idLine,
        showReason ? reason : null,
    ]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: civic_v4_1.CARD_V4, style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLiveRegion: showReason ? 'assertive' : 'none', accessibilityLabel: spoken, style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: disc,
                            borderRadius: tokens.radius.md,
                            paddingVertical: tokens.spacing.sm,
                            alignItems: 'center',
                            backgroundColor: (0, civic_v4_1.tintGround)(theme, civic_v4_1.IDENTITY_TONE),
                        }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDCC5", size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: service }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: office }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: when }), location ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: `📍 ${location}` })) : null, showReason ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: (0, civic_v4_1.tintInk)(theme, sd.tone) }, children: reason })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${statusWord}` }), idLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: idLine })) : null] })] }), showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    justifyContent: 'flex-end',
                }, children: [onReschedule != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "outline", onPress: onReschedule, style: { minHeight: tap }, children: "Reschedule" })) : null, onCheckIn != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", accessibilityLabel: armed ? confirmCheckInLabel : 'Check in', onPress: () => {
                            // Checking in early forfeits the slot, and the card offers
                            // nothing that undoes it.
                            if (!armed) {
                                setArmed(true);
                                return;
                            }
                            setArmed(false);
                            onCheckIn();
                        }, style: { minHeight: tap }, children: armed ? confirmCheckInLabel : 'Check in' })) : null] })) : null] }));
}
//# sourceMappingURL=CivicAppointmentV4.js.map
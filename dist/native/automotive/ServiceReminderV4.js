"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReminderV4 = ServiceReminderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const fleet_v4_1 = require("./internal/fleet-v4");
/** Urgency → tone and default word. Genuinely a status, so the tones stay. */
const URGENCY_META = {
    upcoming: { label: 'Upcoming', tone: 'primary' },
    due: { label: 'Due now', tone: 'warn' },
    overdue: { label: 'Overdue', tone: 'danger' },
};
/** How far the ground travels from the card toward the urgency tone. */
const GROUND_TINT = 0.1;
/** The urgency rail down the leading edge. 3px — a bar, not a hairline. */
const RAIL = 3;
/**
 * **V4 service reminder** — same props as {@link ServiceReminder} plus
 * `urgencyLabels` and `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Urgency survives greyscale.** A tinted ground was the only signal; V4
 *    adds the badge word and a leading rail.
 * 2. **`overdue` announces itself.** An overdue service is the one state in
 *    this component that should interrupt, and the base announced all three
 *    identically.
 * 3. **The dismiss control is a 44pt target with a name.** It was an
 *    unlabelled glyph.
 * 4. **The tint is mixed from resolved semantic colours**, so it lands on the
 *    right side of the page in dark mode.
 *
 * **Renders nothing without a `service`** (§4.5).
 */
function ServiceReminderV4({ service, urgency = 'upcoming', glyph = '🔧', dueLabel, mileageLabel, detail, variant = 'card', urgencyLabels, dismissLabel = 'Dismiss reminder', actionLabel, onAction, onDismiss, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!service)
        return null;
    const meta = URGENCY_META[urgency];
    const word = urgencyLabels?.[urgency] ?? meta.label;
    const caption = (0, fleet_v4_1.metaLine)([dueLabel, mileageLabel, detail]);
    const card = variant === 'card';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View
    // Only the overdue end interrupts; a reminder that announces every state
    // as an alert teaches the user to ignore all of them.
    , { 
        // Only the overdue end interrupts; a reminder that announces every state
        // as an alert teaches the user to ignore all of them.
        accessibilityRole: urgency === 'overdue' ? 'alert' : 'summary', accessibilityLabel: (0, fleet_v4_1.metaLine)([word, service, caption]), style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: card ? 1 : 0,
                borderColor: colors.border,
                backgroundColor: card ? (0, v4_depth_1.mixToken)(colors.card, (0, fleet_v4_1.toneFill)(theme, meta.tone), GROUND_TINT) : 'transparent',
                padding: card ? tokens.spacing.md : tokens.spacing.sm,
                overflow: 'hidden',
            },
            style,
        ], children: [card ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: RAIL,
                    alignSelf: 'stretch',
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, fleet_v4_1.toneFill)(theme, meta.tone),
                } })) : null, (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "lg", style: { color: (0, fleet_v4_1.toneInk)(theme, meta.tone) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, style: { flex: 1 }, children: service }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })] }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: caption })) : null, actionLabel && onAction ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onPress: onAction, accessibilityLabel: actionLabel, style: { alignSelf: 'flex-start' }, children: actionLabel })) : null] }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: dismissLabel, onPress: onDismiss, style: ({ pressed }) => ({
                    width: (0, chrome_v4_1.minTap)(tokens.spacing),
                    height: (0, chrome_v4_1.minTap)(tokens.spacing),
                    marginVertical: -tokens.spacing.sm,
                    marginRight: -tokens.spacing.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "base", color: "mutedText" }) })) : null] }));
}
//# sourceMappingURL=ServiceReminderV4.js.map
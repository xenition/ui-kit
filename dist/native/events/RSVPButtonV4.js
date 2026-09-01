"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSVPButtonV4 = RSVPButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const event_v4_1 = require("./internal/event-v4");
const OPTIONS = [
    { status: 'going', label: 'Going', glyph: '✓' },
    { status: 'maybe', label: 'Maybe', glyph: '?' },
    { status: 'declined', label: "Can't go", glyph: '✕' },
];
/**
 * **V4 RSVP control** — same props as {@link RSVPButton} plus `optionLabels`.
 *
 * ## Four changes
 *
 * 1. **An RSVP answer is a choice, not a status.** The base painted
 *    `going → success`, `maybe → warn`, `declined → danger` — the same three
 *    slots this module spends on a cancelled session and a sold-out tier.
 *    Telling a host you cannot make it is not an error and "Maybe" is not a
 *    warning. `RSVP_TONE` gives `going` the brand's `primary` and leaves the
 *    other two neutral.
 * 2. **Every segment clears 44 at both sizes.** At `sm` the segments were
 *    about 28px tall — three of them side by side, on the one control an
 *    invitee is meant to answer with a thumb.
 * 3. **A press is a state layer**, not a hand-picked step out of the neutral
 *    ramp, which is light-oriented in both schemes and so lit the pressed
 *    segment up white in dark mode.
 * 4. **Disabled is M3's 0.38**, not the 0.5 the base guessed at.
 */
function RSVPButtonV4({ value, onChange, optionLabels, size = 'md', disabled = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const padV = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;
    const textSize = size === 'sm' ? 'xs' : 'sm';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: [
            {
                flexDirection: 'row',
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                overflow: 'hidden',
                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
            },
            style,
        ], children: OPTIONS.map((opt, i) => {
            const selected = value === opt.status;
            const tone = event_v4_1.RSVP_TONE[opt.status] ?? 'neutral';
            const ink = selected ? (0, event_v4_1.onPair)(theme, tone) : colors.onSurface;
            const label = optionLabels?.[opt.status] ?? opt.label;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: label, disabled: disabled, onPress: () => onChange?.(opt.status), style: ({ pressed }) => ({
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    minHeight: tap,
                    paddingVertical: padV,
                    paddingHorizontal: tokens.spacing.sm,
                    borderLeftWidth: i === 0 ? 0 : 1,
                    borderLeftColor: colors.border,
                    backgroundColor: selected
                        ? (0, event_v4_1.toneFill)(theme, tone)
                        : pressed
                            ? (0, state_v4_1.pressFill)(theme)
                            : colors.surface,
                }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: textSize, weight: "bold", style: { color: selected ? ink : colors.mutedText }, children: opt.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: textSize, weight: selected ? 'bold' : 'medium', style: { color: ink }, children: label })] }, opt.status));
        }) }));
}
//# sourceMappingURL=RSVPButtonV4.js.map
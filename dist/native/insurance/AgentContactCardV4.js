"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentContactCardV4 = AgentContactCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 agent contact card** — same props as {@link AgentContactCard} plus
 * `callLabel`, `emailLabel`, `availableLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **Two adjuster cards no longer offer two buttons called "Call".** A
 *    claims screen listing an agent and an adjuster gave a screen-reader user
 *    two identically-named actions and no way to tell which one dialled whom;
 *    the rotor listed "Call, Call, Email, Email". Each action's spoken name now
 *    carries the person and the number or address it will reach — the visible
 *    label stays the short word, because the button is 80px wide.
 * 2. **The phone number and the address are announced with the action that
 *    uses them.** The base drew them as inert text nodes (on the web twin,
 *    literally `<span>`s where a `tel:` and a `mailto:` belong), so the two
 *    facts the card exists to deliver were three separate stops away from the
 *    buttons that act on them. Native has no anchor: the platform's dialler is
 *    the host's to open with `Linking`, which is what `onCall` and `onEmail`
 *    are for. What the card owes is a named target, and it has one.
 * 3. **Availability is a word, and the word is a prop.** `'● Available'` and
 *    `'○ Offline'` were hard-coded English concatenated into a badge, in the
 *    one component a policyholder reads before deciding whether to phone
 *    someone at 9pm.
 * 4. **Both actions clear 44.** `size="sm"` buttons in a row is the pattern
 *    §8 sets a floor for, and neither of these had one.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function AgentContactCardV4({ name, title, agency, phone, email, avatarUrl, available, callLabel = 'Call', emailLabel = 'Email', availableLabel = 'Available', offlineLabel = 'Offline', onCall, onEmail, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!name)
        return null;
    const presence = available == null ? null : available ? availableLabel : offlineLabel;
    const role = (0, tone_v4_1.metaLine)([title, agency]);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const canCall = phone != null && phone !== '' && onCall != null;
    const canEmail = email != null && email !== '' && onEmail != null;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([name, role, presence, phone, email]), style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: "lg", status: available == null ? undefined : available ? 'online' : 'offline' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), role ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: role })) : null, presence ? (
                            // A presence is a state; the availability of the person you are
                            // about to phone is exactly what `success` is for.
                            (0, jsx_runtime_1.jsx)(react_native_1.View, { style: available ? (0, tone_v4_1.pillStyle)(theme, 'success') : (0, tone_v4_1.chipStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: available ? (0, tone_v4_1.toneInk)(theme, 'success') : theme.colors.onCard }, children: presence }) })) : null] })] }), phone || email ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: { gap: tokens.spacing.xs }, children: [phone ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", numeric: "tabular", children: phone })) : null, email ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", numberOfLines: 1, children: email })) : null] })) : null, canCall || canEmail ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [canCall ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", onPress: onCall, 
                        // The person and the number, so a rotor full of "Call" becomes a
                        // rotor of distinct actions — see change 1.
                        accessibilityLabel: (0, tone_v4_1.spokenLine)([callLabel, name, phone]), style: { flex: 1, minHeight: tap }, children: callLabel })) : null, canEmail ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onPress: onEmail, accessibilityLabel: (0, tone_v4_1.spokenLine)([emailLabel, name, email]), style: { flex: 1, minHeight: tap }, children: emailLabel })) : null] })) : null] }));
}
//# sourceMappingURL=AgentContactCardV4.js.map
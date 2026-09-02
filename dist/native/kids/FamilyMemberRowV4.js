"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyMemberRowV4 = FamilyMemberRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("./internal/tone-v4");
const ROLE_LABEL = {
    parent: 'Parent',
    guardian: 'Guardian',
    child: 'Child',
    sibling: 'Sibling',
    grandparent: 'Grandparent',
    caregiver: 'Caregiver',
    other: 'Family',
};
/**
 * **V4 family member row** — same props as {@link FamilyMemberRow} plus
 * `roleLabels`, `onlineLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **A family role is identity, so it stops borrowing status colours.** The
 *    base drew `caregiver → success` and `parent → primary`, which says a
 *    caregiver is a *good outcome* and a grandparent is a neutral one. Every
 *    role now wears the same neutral chip and is told apart by its word — the
 *    only channel that survives greyscale, colour blindness and a reader.
 * 2. **Presence is a real status and keeps its colour**, plus the dot is
 *    accompanied by the word it always should have been, and the dot itself is
 *    hidden from the reader so "Online" is said once rather than twice.
 * 3. **The row's summary is not silently dropped.** The non-pressable branch
 *    set `accessibilityLabel` on a bare `View` with no `accessible` — which
 *    Android ignores outright, so the row read as four loose fragments there
 *    and as one name on iOS. Every such `View` in this file is now explicitly
 *    `accessible`.
 * 4. **`card`/`onCard` and a state layer.** The row painted `surface`, the page
 *    colour, and drew press as `opacity: pressed ? 0.85 : 1` — an opacity
 *    inside M3's *disabled* band.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function FamilyMemberRowV4({ name, role = 'other', photoUrl, relationLabel, online, roleLabels, onlineLabel = 'Online', offlineLabel = 'Offline', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const roleWord = roleLabels?.[role] ?? ROLE_LABEL[role] ?? ROLE_LABEL.other;
    const presenceWord = online === undefined ? null : online ? onlineLabel : offlineLabel;
    const spoken = (0, tone_v4_1.spokenLine)([name, roleWord, relationLabel, presenceWord]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, tone_v4_1.rowShellStyle)(theme),
            pressed ? { backgroundColor: (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: photoUrl, name: name, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: name }), relationLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: relationLabel })) : null, presenceWord ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                                    width: tokens.spacing.sm,
                                    height: tokens.spacing.sm,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: online === true ? (0, tone_v4_1.toneFill)(theme, 'success') : (0, tone_v4_1.toneFill)(theme, 'neutral'),
                                } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: presenceWord })] })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: tone_v4_1.IDENTITY_TONE, variant: "soft", size: "sm", children: roleWord })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=FamilyMemberRowV4.js.map
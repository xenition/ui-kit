"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeCardV4 = EmployeeCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 employee card** — same props as {@link EmployeeCard} plus
 * `loadingLabel` and `formatTenure`.
 *
 * ## Six changes
 *
 * 1. **The contact actions are reachable.** Call, Email and Message were
 *    `Pressable`s inside the card's own `Pressable`, which is `accessible` by
 *    default and collapses its whole subtree into one leaf named "Employee
 *    Ada" — so on native the three actions were not focus stops at all, and a
 *    VoiceOver user could open the profile and could not phone anybody. The
 *    card is a plain `CardV4` now; the activation wraps only the avatar-and-text
 *    region, and the actions are its siblings.
 * 2. **The skeleton is a skeleton, not a hairline.** It painted three blocks in
 *    `colors.border` — the divider token spent as a fill, which on most seeds is
 *    a barely-visible line colour stretched over a 40pt square. `skeletonFill()`
 *    is the opaque state mix, and its avatar is composed from the spacing scale
 *    rather than the literal `40` the base wrote twice.
 * 3. **The loading state is announced.** `accessibilityLabel="Loading
 *    employee"` sat on a plain `View`, which announces nothing at all, and the
 *    string had no override.
 * 4. **A press is a state layer.** The action pills swapped
 *    `withAlpha(colors.primary, 0.1)` for `0.2` on press — a translucent tint
 *    that is a different colour on every ground — and each was about 30pt tall.
 *    They are `ButtonV4`s at `minTap`.
 * 5. **Employment arrangement stops being a warning.** `contractor` was toned
 *    `warn`, `fullTime` `primary` and `partTime` `accent`, so a directory of
 *    contractors rendered as a screen of amber alerts. Arrangement is identity:
 *    it gets a glyph and a word on a neutral chip, and `warn` goes back to
 *    meaning something is wrong.
 * 6. **The card announces what it shows** — name, title, department,
 *    arrangement, status, location and tenure as one sentence — instead of
 *    "Employee Ada" over a subtree the reader cannot enter.
 *
 * **Renders nothing without a `name`.**
 */
function EmployeeCardV4({ name, title, department, avatarUrl, employmentType, status, location, startDate, actions, variant = 'default', loading = false, loadingLabel = 'Loading employee', formatTenure, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const compact = variant === 'compact';
    const detailed = variant === 'detailed';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const avatarBox = tokens.spacing.xl + tokens.spacing.sm;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "outlined", padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: avatarBox,
                            height: avatarBox,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                        } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.typography.scale.base,
                                    width: '60%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.typography.scale.sm,
                                    width: '40%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                                } })] })] }) }));
    }
    /*
      A status pill that sits BESIDE the activation is hidden from the reader when
      the row is interactive — the activation's own name already carries the
      status word, and hearing "Denied" twice in a row is worse than hearing it
      once. On a static row there is no activation to carry it, so the pill speaks
      for itself and the name leaves it out. Same rule on both twins.
    */
    const interactive = onPress != null;
    const statusMeta = status ? tone_v4_1.EMPLOYEE_STATUS_V4[status] : undefined;
    const employment = employmentType ? tone_v4_1.EMPLOYMENT_V4[employmentType] : undefined;
    const tenure = startDate
        ? (formatTenure ?? ((since) => `Since ${since}`))(startDate)
        : null;
    const subtitle = (0, tone_v4_1.metaLine)([title, department]);
    const hasActions = !compact && Array.isArray(actions) && actions.length > 0;
    const spoken = (0, tone_v4_1.spokenLine)([
        name,
        title,
        department,
        employment?.label,
        interactive ? statusMeta?.label : null,
        detailed ? location : null,
        detailed ? tenure : null,
    ]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            minHeight: tap,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: subtitle })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: identity(false) })), statusMeta ? ((0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", decorative: interactive })) : null] }), !compact && (employment || (detailed && (location || tenure))) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                }, children: [employment ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: (0, tone_v4_1.chipStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onCard", children: employment.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onCard", children: employment.label })] })) : null, detailed && location ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: `📍 ${location}` })) : null, detailed && tenure ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: tenure })) : null] })) : null, hasActions ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: actions.map((a) => ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "soft", size: "sm", onPress: a.onPress, accessibilityLabel: a.label, style: { minHeight: tap }, children: `${a.glyph} ${a.label}` }, a.key))) })) : null] }));
}
//# sourceMappingURL=EmployeeCardV4.js.map
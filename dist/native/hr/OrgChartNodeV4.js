"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgChartNodeV4 = OrgChartNodeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const workforce_v4_1 = require("../../hr/workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 org chart node** — same props as {@link OrgChartNode} plus
 * `formatReports`, `expandLabel` and `collapseLabel`.
 *
 * ## Five changes
 *
 * 1. **The disclosure is reachable.** It was a `Pressable` inside the node's
 *    own `Pressable`, which is `accessible` by default and flattens its whole
 *    subtree into one leaf named "Org node Ada" — so the only control that
 *    opens a manager's reports was not a focus stop, and a VoiceOver user could
 *    not walk the tree at all. The node is a plain card now; the activation
 *    wraps only the avatar-and-text region and the disclosure is its sibling,
 *    keeping its own `expanded` state.
 * 2. **The disclosure is a target.** 28 × 28 with `hitSlop={8}` is not a 44pt
 *    target, and it is the smallest control in the module.
 * 3. **A press is a state layer.** The disclosure moved
 *    `withAlpha(colors.onSurface, 0.05)` to `0.1` on press — a translucent
 *    tint whose result depends on whatever is behind the card.
 * 4. **"3 reports" is a prop.** The base appended `'s'` to `report`, which is
 *    wrong in every language the kit is otherwise ready for, and the expand /
 *    collapse names were hard-coded English too.
 * 5. **The node announces what it shows** — name, title, department and the
 *    report count as one sentence — and the highlight uses the compiler's own
 *    `selected` slot rather than a hand-mixed 6% wash of `primary`.
 *
 * **Renders nothing without a `name`.**
 */
function OrgChartNodeV4({ name, title, avatarUrl, department, directReports = 0, depth = 0, expandable = false, expanded = false, variant = 'default', formatReports, expandLabel, collapseLabel, onToggle, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const compact = variant === 'compact';
    const highlighted = variant === 'highlighted';
    const level = Math.max(0, Math.floor(Number.isFinite(depth) ? depth : 0));
    const indent = level * tokens.spacing.lg;
    const reports = Number.isFinite(directReports) && directReports > 0 ? directReports : 0;
    const reportsLabel = reports > 0 ? (formatReports ?? ((n) => (0, workforce_v4_1.pluralizeCount)(n, 'report')))(reports) : null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const ground = highlighted ? colors.selected : colors.card;
    const ink = highlighted ? colors.onSelected : colors.onCard;
    const subtitle = (0, tone_v4_1.metaLine)([title, department]);
    const spoken = (0, tone_v4_1.spokenLine)([name, title, department, reportsLabel]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            minHeight: tap,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", numberOfLines: 1, style: { color: ink }, children: name }), subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: subtitle })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ flexDirection: 'row', alignItems: 'stretch' }, style], children: [level > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { width: indent, alignItems: 'flex-end', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, height: '100%', backgroundColor: colors.border } }) })) : null, (0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: highlighted ? 'elevated' : 'outlined', padding: compact ? 'sm' : 'md', style: {
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    backgroundColor: ground,
                    borderColor: highlighted ? colors.primary : colors.border,
                }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: identity(false) })), reportsLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: reportsLabel })) : null, expandable ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: expanded ? (collapseLabel ?? `Collapse ${name}`) : (expandLabel ?? `Expand ${name}`), accessibilityState: { expanded }, onPress: () => onToggle?.(!expanded), style: ({ pressed }) => ({
                            width: tap,
                            height: tap,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", style: { color: ink }, children: expanded ? '▾' : '▸' }) })) : null] })] }));
}
//# sourceMappingURL=OrgChartNodeV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleCardV4 = VehicleCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const fleet_v4_1 = require("./internal/fleet-v4");
/** Status → tone and default word. Genuinely a status, so the tones stay. */
const STATUS_META = {
    available: { label: 'Available', tone: 'success' },
    'in-use': { label: 'In use', tone: 'primary' },
    maintenance: { label: 'Maintenance', tone: 'warn' },
    offline: { label: 'Offline', tone: 'neutral' },
};
/**
 * **V4 vehicle card** — same props as {@link VehicleCard} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The plate is monospaced-by-figures and boxed.** A registration is an
 *    identifier a user matches against a real car in a car park; the base set
 *    it as ordinary caption text among the other specs.
 * 2. **The spec list is a real definition list**, announced as label/value
 *    pairs rather than as a run of loose strings.
 * 3. **Press is a state layer**, not `opacity` on the card's content.
 * 4. **The skeleton is opaque** and the ground is `card`, so the tile reads as
 *    an object on a dark page instead of a bordered region.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function VehicleCardV4({ name, plate, vehicleClass, color, year, status = 'available', specs = [], variant = 'default', statusLabels, onPress, loading = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.sm }, style], children: [55, 35].map((w) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.typography.scale.base,
                    width: `${w}%`,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                } }, w))) }));
    }
    if (!name)
        return null;
    const meta = STATUS_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const compact = variant === 'compact';
    const caption = (0, fleet_v4_1.metaLine)([vehicleClass, color, year]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })] }), plate ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'flex-start',
                    marginTop: tokens.spacing.sm,
                    borderRadius: tokens.radius.sm,
                    borderWidth: 1,
                    borderColor: colors.border,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "onCard", numeric: "tabular", children: plate }) })) : null, !compact && specs.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md }, children: specs.map((spec) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${spec.label}: ${spec.value}`, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: spec.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numeric: "tabular", children: spec.value })] }, spec.label))) })) : null] }));
    if (!onPress)
        return (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, fleet_v4_1.metaLine)([name, plate, word, caption]), onPress: onPress, style: ({ pressed }) => ({
            borderRadius: tokens.radius.lg,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body }) }));
}
//# sourceMappingURL=VehicleCardV4.js.map
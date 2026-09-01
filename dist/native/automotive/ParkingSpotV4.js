"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSpotV4 = ParkingSpotV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../commerce/money");
const fleet_v4_1 = require("./internal/fleet-v4");
/** Status → tone, word and glyph. Genuinely a status, so the tones stay. */
const STATUS_META = {
    available: { label: 'Available', tone: 'success', glyph: 'P' },
    occupied: { label: 'Occupied', tone: 'danger', glyph: '✕' },
    reserved: { label: 'Reserved', tone: 'warn', glyph: '★' },
    disabled: { label: 'Out of service', tone: 'neutral', glyph: '—' },
};
/**
 * **V4 parking spot** — same props as {@link ParkingSpot} plus `statusLabels`,
 * `formatRate` and `evLabel`.
 *
 * ## Four changes
 *
 * 1. **The disc's glyph uses its *paired* ink.** The base filled the disc
 *    `colors[tone]` and inked the glyph `onPrimary` regardless — the compiler
 *    guarantees `onSuccess` against `success` and nothing about `onPrimary`
 *    on it. `onPair()` is the fix.
 * 2. **An unavailable spot cannot be pressed**, and dims at M3's 0.38. The
 *    base left `occupied` and `disabled` fully pressable.
 * 3. **Status is a word beside the colour**, not colour and a glyph alone.
 * 4. **The rate is tabular** so a list of bays lines up, and the EV marker is
 *    announced rather than being a bare lightning glyph.
 *
 * **Renders nothing without a `spotId`** (§4.5).
 */
function ParkingSpotV4({ spotId, level, status = 'available', priceCentsPerHour, currency = 'USD', distanceLabel, evCharging = false, variant = 'tile', statusLabels, formatRate, evLabel = 'EV charging', onSelect, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!spotId)
        return null;
    const meta = STATUS_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const tile = variant === 'tile';
    // Only an available bay can be taken. The base let a user press "Occupied".
    const selectable = status === 'available' && Boolean(onSelect);
    const unavailable = status === 'occupied' || status === 'disabled';
    const rate = typeof priceCentsPerHour === 'number'
        ? (formatRate ?? ((p) => `${p}/hr`))((0, money_1.formatMoney)(priceCentsPerHour, currency))
        : null;
    const caption = (0, fleet_v4_1.metaLine)([level, distanceLabel, evCharging ? evLabel : null]);
    const disc = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: (0, chrome_v4_1.minTap)(tokens.spacing),
            height: (0, chrome_v4_1.minTap)(tokens.spacing),
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (0, fleet_v4_1.toneFill)(theme, meta.tone),
        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", style: { color: (0, fleet_v4_1.onPair)(theme, meta.tone) }, children: meta.glyph }) }));
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: tile ? 'column' : 'row',
            alignItems: tile ? 'flex-start' : 'center',
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            padding: tokens.spacing.md,
            opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, unavailable),
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [disc, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: spotId }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), evCharging ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "bolt", size: "sm", color: "primaryText" }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    alignSelf: 'stretch',
                }, children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word }), rate ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numeric: "tabular", children: rate })) : null] })] }));
    const name = (0, fleet_v4_1.metaLine)([spotId, word, caption, rate]);
    if (!selectable) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, accessibilityState: { disabled: unavailable }, style: style, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onSelect, style: ({ pressed }) => [
            {
                borderRadius: tokens.radius.lg,
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
            },
            style,
        ], children: content }));
}
//# sourceMappingURL=ParkingSpotV4.js.map
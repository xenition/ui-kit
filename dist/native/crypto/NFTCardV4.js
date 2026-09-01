"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTCardV4 = NFTCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const NetworkBadgeV4_1 = require("./NetworkBadgeV4");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/** The `list` variant's thumbnail edge, and the `grid` variant's media height. */
const THUMB_STEPS = 4;
const MEDIA_STEPS = 10;
/**
 * **V4 collectible tile** — same props as {@link NFTCard} plus `loadingLabel`
 * and `floorLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton is visible.** The base painted `colors.border` at 50%
 *    opacity inside a `ramps.neutral[100]` well — two near-identical greys, so
 *    the only thing separating "loading" from "loaded, no image" was the pulse.
 *    It is now the shared opaque skeleton mix against the well's own ground.
 * 2. **A floor price never prints without its unit.** `floorSymbol` is
 *    optional and had no fallback, so a tile could show a bare `0.5` — a
 *    number a user has to guess the denomination of on a screen that exists to
 *    compare prices. With no symbol the floor is omitted rather than
 *    misreported.
 * 3. **The tile announces itself once, with the price in it.** The base's name
 *    was `"Punk #4231, CryptoPunks"` — the collection and nothing else. The
 *    chain and the floor now join it.
 * 4. **A press is a state layer**, not `opacity: 0.85`, and the card takes the
 *    same `outlined` variant its web twin does.
 */
function NFTCardV4({ name, collection, image, floorAmount, floorSymbol, floorDecimals = 3, network, variant = 'grid', loading = false, loadingLabel = 'Loading artwork', floorLabel = 'Floor', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const isList = variant === 'list';
    const thumb = tokens.spacing.md * THUMB_STEPS;
    const mediaHeight = tokens.spacing.md * MEDIA_STEPS;
    // A quantity with no unit is not a price. `floorSymbol` carries the unit and
    // has no default, so an amount without one is dropped rather than guessed at.
    const floorText = floorAmount != null && floorSymbol != null && floorSymbol !== ''
        ? (0, format_1.formatToken)(floorAmount, { decimals: floorDecimals, symbol: floorSymbol })
        : null;
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: isList ? thumb : '100%',
            height: isList ? thumb : mediaHeight,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, 
            // Opaque, and mixed against the well it sits in — the base's
            // translucent hairline colour was the same grey as the well.
            style: { width: '100%', height: '100%', backgroundColor: (0, market_v4_1.skeletonFill)(theme) } })) : image != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: image }, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: "No image" })) }));
    const meta = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: isList ? 1 : undefined,
            gap: tokens.spacing.xs,
            marginTop: isList ? 0 : tokens.spacing.sm,
        }, children: [collection != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: collection })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [network != null ? (0, jsx_runtime_1.jsx)(NetworkBadgeV4_1.NetworkBadgeV4, { name: network, size: "sm" }) : (0, jsx_runtime_1.jsx)(react_native_1.View, {}), floorText != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: floorLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", numeric: "tabular", children: floorText })] })) : null] })] }));
    const inner = isList ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [media, meta] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [media, meta] }));
    const spoken = (0, market_v4_1.spokenLine)([
        name,
        collection,
        network,
        floorText != null ? `${floorLabel} ${floorText}` : null,
    ]);
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "outlined", padding: "sm", style: style, children: onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: ({ pressed }) => ({
                borderRadius: tokens.radius.md,
                backgroundColor: pressed
                    ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface)
                    : 'transparent',
            }), children: inner })) : (inner) }));
}
//# sourceMappingURL=NFTCardV4.js.map
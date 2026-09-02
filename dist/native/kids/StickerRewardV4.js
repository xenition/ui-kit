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
exports.StickerRewardV4 = StickerRewardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 sticker board** — same props as {@link StickerReward} plus
 * `formatCount`, `earnedLabel` and `lockedLabel`.
 *
 * ## Four changes
 *
 * 1. **`columns={4}` renders four columns.** Each cell was `width: '25%'` and
 *    the grid added a `gap` *on top of* that, so four cells plus three gaps
 *    exceeded the line and the fourth wrapped: the prop rendered **three**
 *    columns and quietly meant something other than what it said. The grid now
 *    measures itself and subtracts the gaps before dividing, so `columns={n}`
 *    is `n` at any width, on any seed's spacing scale.
 * 2. **A locked sticker is dimmed to M3's band, not to a guess.** `0.45` was
 *    picked by hand; `state.disabledContent` is 0.38 and is the same number
 *    every other unavailable thing in the kit uses, so a locked sticker and a
 *    disabled button read alike.
 * 3. **A sticker is a target.** The pressable was the cell with no size floor
 *    under it at all, and the glyph inside it was a 44 circle whose padding was
 *    the only thing keeping it near the tap floor. Every cell now clears 44,
 *    and press is a state layer rather than `opacity: pressed ? 0.6 : 1` —
 *    which is inside M3's *disabled* band, so a pressed sticker read as a
 *    locked one.
 * 4. **The board is a card and its skeleton is a skeleton.** It painted
 *    `colors.surface` — the page colour — and drew its loading blocks in
 *    `colors.border`, the hairline colour used as a fill.
 */
function StickerRewardV4({ stickers, title = 'Sticker rewards', columns = 4, loading = false, emptyLabel = 'No stickers yet', formatCount, earnedLabel = 'earned', lockedLabel = 'locked', onCollect, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [gridWidth, setGridWidth] = React.useState(0);
    const cols = Math.max(1, Math.floor(Number.isFinite(columns) ? columns : 1));
    const gap = tokens.spacing.sm;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    // Percentage widths cannot know about the gaps between them. Measuring is the
    // only honest way to divide a row into `cols` equal cells with `cols - 1`
    // gaps in it — which is defect 1.
    const cellWidth = gridWidth > 0 ? Math.max(tap, (gridWidth - gap * (cols - 1)) / cols) : undefined;
    const container = [(0, tone_v4_1.cardStyle)(theme), style];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading stickers", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale.base, width: '40%' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tap }) })] }));
    }
    const items = stickers ?? [];
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([title, emptyLabel]), style: container, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: "\u2728" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptyLabel })] })] }));
    }
    const earnedCount = items.filter((s) => s.earned === true).length;
    const summary = (formatCount ?? ((e, t) => `${e}/${t}`))(earnedCount, items.length);
    const onGridLayout = (event) => {
        setGridWidth(event.nativeEvent.layout.width);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([title, summary]), style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: title }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", numeric: "tabular", children: summary })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { onLayout: onGridLayout, style: { flexDirection: 'row', flexWrap: 'wrap', gap }, children: items.map((sticker, i) => {
                    const earned = sticker.earned ?? false;
                    const name = (0, tone_v4_1.spokenLine)([sticker.label ?? title, earned ? earnedLabel : lockedLabel]);
                    const cell = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            width: cellWidth,
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.md,
                            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                                    (0, tone_v4_1.tapTargetStyle)(theme),
                                    {
                                        borderRadius: tokens.radius.full,
                                        borderWidth: 1,
                                        borderColor: earned ? (0, tone_v4_1.toneFill)(theme, 'accent') : colors.border,
                                        backgroundColor: earned ? 'transparent' : (0, tone_v4_1.trackGround)(theme),
                                        opacity: earned ? 1 : (0, chrome_v4_1.disabledOpacity)(theme.state, true),
                                    },
                                ], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", allowFontScaling: false, children: earned ? sticker.glyph : '🔒' }) }), sticker.label ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", numberOfLines: 1, children: sticker.label })) : null] }));
                    if (!onCollect) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: cell(false) }, sticker.id ?? i));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityState: { selected: earned }, onPress: () => onCollect(i), children: ({ pressed }) => cell(pressed) }, sticker.id ?? i));
                }) })] }));
}
//# sourceMappingURL=StickerRewardV4.js.map
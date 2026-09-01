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
exports.CategoryTileV4 = CategoryTileV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
/**
 * **V4 category tile** — the browse-grid entry, as a card with a badge.
 *
 * Six changes, each one a rule this module was breaking:
 *
 * 1. **The ground is `card`** (§4.2). Every card in `marketplace` painted the
 *    colour of the page and leaned on a border to be visible at all, which is
 *    why a browse grid in dark mode read as a flat sheet of rectangles.
 * 2. **The glyph became the tinted circular badge** (§4.7). A category names a
 *    kind of thing, which is the exact case the badge exists for, and the
 *    badge is the same 44 circle the row family's leading slot uses — so a
 *    category in a grid and a category in a list are recognisably one object.
 * 3. **Selection is not colour alone** (rule 6). The base carried it as an
 *    accent ring plus a tinted surface plus the a11y selected state — two
 *    colour channels and one channel a sighted reader cannot see. V4 adds a
 *    **checkmark**, which is M3's filter-chip behaviour and HIG's option-list
 *    rule: a selected option shows a mark, not just a shade.
 * 4. **The selected ground is the `selected` token**, not a hand-mixed tint.
 *    The base composed `withAlpha(colors.primary, 0.1)`; `selected` /
 *    `onSelected` is the pair the shadcn pass added for "the selected-row
 *    container", and it is a *pair*, so the label on it carries a measured
 *    contrast promise that a 10% wash of the brand does not.
 * 5. **The tile clears the tap floor.** `minTap()` (44) on the chip, and the
 *    tile keeps its taller block. The base's chip was `spacing.sm` around a
 *    `sm` label, which lands around 32.
 * 6. **Press feedback is the state layer** (§4.3). `opacity: pressed ? 0.85`
 *    is deleted rather than translated: dimming fades the tile's own content,
 *    which is the signal M3 spends `0.38` on to mean *disabled*. `pressOver`
 *    is given the opaque pair the tile actually wears.
 *
 * Composes `CardV4`, `IconV4` and `TextV4` (rule 7). Renders **nothing** when
 * it has neither a label nor a mark (§4.5) — never a blank bordered box.
 */
function CategoryTileV4({ label, glyph, iconName, count, selected = false, onPress, variant = 'tile', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // Held in state rather than read from `Pressable`'s render-prop, for the
    // reason `ButtonV4` already holds it: the pressed flag has to reach the
    // card's `backgroundColor`, and a component whose feedback is observable is
    // a component whose feedback can be tested.
    const [pressed, setPressed] = React.useState(false);
    const chip = variant === 'chip';
    const hasLabel = label !== undefined && label !== null && label !== '';
    const hasMark = glyph !== undefined || iconName !== undefined;
    // Nothing to name and nothing to show, so nothing is drawn (§4.5).
    if (!hasLabel && !hasMark)
        return null;
    const countLabel = typeof count === 'number' ? `${count.toLocaleString()} items` : undefined;
    const ground = selected ? colors.selected : colors.card;
    const ink = selected ? colors.onSelected : colors.onCard;
    /*
      A chip is a 44-tall pill: a 44 badge inside it would leave no room for its
      own padding, so the chip takes the bare glyph and the tile takes the badge.
      Both are `IconV4`; only the `badge` prop differs.
    */
    const mark = hasMark ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, name: iconName, size: chip ? 'base' : 'lg', color: "primary", badge: chip ? undefined : 'soft' })) : null;
    // Rule 6: the selected state gets a mark, not only a shade.
    const check = selected ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm", color: "primary" }) : null;
    const tile = (fill) => ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { radius: "lg", padding: chip ? 'sm' : 'lg', style: [
            {
                flexDirection: chip ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.sm,
                minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                paddingHorizontal: chip ? tokens.spacing.md : undefined,
                backgroundColor: fill,
                borderColor: selected ? colors.primary : colors.border,
            },
            style,
        ], children: [mark, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, alignItems: chip ? 'flex-start' : 'center' }, children: [hasLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: selected ? 'onSelected' : 'onCard', numberOfLines: 1, children: label })) : null, countLabel !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: countLabel })) : null] }), check] }));
    if (!onPress)
        return tile(ground);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: `${String(label ?? '')}${countLabel !== undefined ? `, ${countLabel}` : ''}`, onPress: onPress, onPressIn: () => setPressed(true), onPressOut: () => setPressed(false), children: tile(pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : ground) }));
}
//# sourceMappingURL=CategoryTileV4.js.map
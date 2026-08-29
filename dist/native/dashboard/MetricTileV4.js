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
exports.MetricTileV4 = MetricTileV4;
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
 * The tone colours the tile's **value**, which is text on the tile's ground —
 * so every entry is a `*Text` slot, not the fill of the same name. The native
 * twin already made this correction and the audit's 2.32:1 measurement was of
 * the *web* tile; what changes here is only the neutral entry.
 *
 * `neutral` is `onCard` rather than `onSurface` because the tile's ground is
 * now `card`, and the contrast promise a text slot makes is a promise about a
 * *named* ground.
 */
const TONE_TEXT = {
    neutral: 'onCard',
    primary: 'primaryText',
    success: 'successText',
    warn: 'warnText',
    danger: 'dangerText',
};
/**
 * The badge hue for a tone. `neutral` has no hue of its own, so its badge
 * falls to `primary` — brief §4.7's default family — rather than being drawn
 * in a grey that would read as disabled.
 */
const TONE_BADGE = {
    neutral: 'primary',
    primary: 'primary',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * **V4 metric tile** — the tile that lives *inside* a card, beside the
 * `StatCardV4` that lives on the page.
 *
 * Brief §5 keeps the pair and gives each a job: "`StatCard` is the on-page
 * card; `MetricTile` is the tile inside a card". Everything below follows from
 * that one sentence.
 *
 * 1. **The ground is `colors.card`, not `colors.surface`** (§4.2) — the most
 *    visible bug in the module was that every card in it painted the colour of
 *    the page.
 * 2. **`radius.lg` (was `md`), `spacing.md` padding, no border** (§5). A
 *    hairline box inside a hairline box is the dense admin look §3 rules out;
 *    the container owns the edge.
 * 3. **The label is above the value, `sm` and `mutedText`** — `mutedText`, not
 *    the `muted` *fill*, which the base used as a text colour and which is the
 *    exact bug the shadcn pass closed elsewhere. The base put the label at
 *    `xs` beside the icon, which made the tile read as a legend rather than as
 *    a number with a name.
 * 4. **Press feedback is the state layer** (§4.3, §1 rule 7).
 *    `opacity: pressed ? 0.8 : 1` is deleted, not translated: dimming fades the
 *    tile's own *content*, which is the signal M3 spends `0.38` on to mean
 *    disabled, so a pressed tile and a dead one looked alike. `pressOver`
 *    tints the container instead and leaves the content at full strength, and
 *    it is given the **opaque** `card` / `onCard` pair because the value's
 *    contrast is a promise about that fill — a translucent layer would make
 *    the promise depend on whatever happened to be behind the tile.
 * 5. **The glyph became a badge** (§4.7), and no shadow by default (§4.6).
 *
 * Composes `CardV4`, `TextV4` and `IconV4` (§10.5). Renders **nothing** when it
 * has neither a label nor a value (§4.5) — never a blank bordered box.
 */
function MetricTileV4({ label, value, icon, iconName, tone = 'neutral', onPress, raised = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // Held in state rather than read from `Pressable`'s render-prop, for the
    // reason `ButtonV4` already holds it: the pressed flag has to reach the
    // card's `backgroundColor`, and a component whose feedback is observable is
    // a component whose feedback can be tested.
    const [pressed, setPressed] = React.useState(false);
    const valueText = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
    const hasValue = value !== undefined && value !== null && value !== '';
    const hasLabel = label !== undefined && label !== null && label !== '';
    // Nothing to say, so nothing is drawn (§4.5).
    if (!hasLabel && !hasValue)
        return null;
    const slot = (0, nav_v4_1.minTap)(tokens.spacing);
    const badge = iconName !== undefined ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: iconName, badge: "soft", color: TONE_BADGE[tone] })) : icon != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: slot, height: slot, alignItems: 'center', justifyContent: 'center' }, children: icon })) : null;
    const a11yLabel = `${String(label ?? '')}${valueText ? `: ${valueText}` : ''}`;
    const tile = (ground) => ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "md", style: [
            {
                backgroundColor: ground,
                // §5 drops this tile's border: it sits inside a card, and a hairline
                // box inside a hairline box is the ruled look §3 rules out. The
                // width stays 1 so a raised tile and a flat one are the same size to
                // the pixel; the edge simply paints nothing.
                borderColor: 'transparent',
                gap: tokens.spacing.md,
            },
            style,
        ], children: [badge, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [hasLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: label })) : null, hasValue ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: TONE_TEXT[tone], numeric: "tabular", children: value })) : null] })] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11yLabel, children: tile(colors.card) });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, onPressIn: () => setPressed(true), onPressOut: () => setPressed(false), children: tile(pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : colors.card) }));
}
//# sourceMappingURL=MetricTileV4.js.map
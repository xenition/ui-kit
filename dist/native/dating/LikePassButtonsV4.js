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
exports.ACTION_SKIN = ACTION_SKIN;
exports.LikePassButtonsV4 = LikePassButtonsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const profile_v4_1 = require("./internal/profile-v4");
/** The 12% tone tint the skin is composited at. */
const SKIN_MIX = 0.12;
function ACTION_SKIN(theme, tone) {
    const { colors } = theme;
    // `neutral` resolves to `muted` — a ramp step with no contrast promise — so
    // it mixes from the page's own ink and rings with the hairline instead.
    const neutral = tone === 'neutral';
    const mix = neutral ? colors.onSurface : (0, tone_v4_1.toneFill)(theme, tone);
    return {
        ground: (0, v4_depth_1.mixToken)(colors.surface, mix, SKIN_MIX),
        ring: neutral ? colors.border : mix,
        mix,
    };
}
/** The glyph and the default name for each of the five actions. */
const SPEC = {
    rewind: { glyph: '↺', label: 'Rewind' },
    pass: { glyph: '✕', label: 'Pass' },
    superlike: { glyph: '★', label: 'Super like' },
    like: { glyph: '♥', label: 'Like' },
    boost: { glyph: '⚡', label: 'Boost' },
};
/**
 * Button diameters, composed from the spacing scale rather than remembered:
 * `sm` is the 44 tap floor exactly (`2xl - xs`), `md` is 56 (`2xl + sm`) and
 * `lg` is **64** (`2xl + md`) — the number the web twin already drew. Native
 * drew 68, one of a pair of nearly-equal sizes for one idea; 64 wins because
 * it lands on the scale and 68 does not, so a seed that re-scales its rhythm
 * re-scales the button row with it.
 */
function diameter(spacing, size) {
    if (size === 'sm')
        return spacing['2xl'] - spacing.xs;
    return spacing['2xl'] + (size === 'md' ? spacing.sm : spacing.md);
}
/** The glyph scales with the disc rather than staying one size in three circles. */
const GLYPH_SIZE = { sm: 'lg', md: 'xl', lg: '2xl' };
const DEFAULT_ACTIONS = ['pass', 'superlike', 'like'];
/**
 * **V4 like/pass row** — same props as {@link LikePassButtons} plus
 * `actionLabels`.
 *
 * ## Five changes
 *
 * 1. **Passing on someone is not an error.** The row typed `rewind → warn`,
 *    `pass → danger`, `like → success` — four status slots spent on five
 *    identities, sitting side by side in one toolbar, so the palette that is
 *    supposed to mean "something has gone wrong" meant "this is the left-hand
 *    button". `ACTION_TONE` gives pass and rewind a neutral identity and
 *    leaves the glyph to say which is which.
 * 2. **One control, one size, one skin.** `lg` was 64 on the web and 68 here,
 *    and the two platforms painted the disc differently besides. See
 *    {@link ACTION_SKIN} and {@link diameter}.
 * 3. **The row does not claim keyboard navigation it does not have.** The base
 *    set `accessibilityRole="toolbar"`, which promises arrow-key movement
 *    between the controls; nothing implemented it, and React Native has no
 *    contract to implement it *with* — the web twin has real roving focus, and
 *    here each button is simply its own reachable control.
 * 4. **Press is a state layer and disabled is 0.38.** The base drew press as
 *    `opacity: 0.85` and disabled as `0.4` — two numbers in the same band, so
 *    a pressed button and an unavailable one looked alike.
 * 5. **The row clears the home indicator.** This is the deck's pinned action
 *    row and it read no safe-area inset, so on a notched phone the like button
 *    sat under the home bar. It pays `insets.bottom` now; a caller embedding
 *    the row inside a card (as `ProfileCardV4` does) passes
 *    `style={{ paddingBottom: 0 }}` to take it back.
 *
 * The base's `emphasis` field is not carried over: every action was `'ghost'`
 * and nothing ever read it.
 */
function LikePassButtonsV4({ actions = DEFAULT_ACTIONS, onAction, disabledActions, size = 'md', actionLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    // Needs a `SafeAreaProvider` above it (Expo mounts one by default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const disabledSet = React.useMemo(() => new Set(disabledActions ?? []), [disabledActions]);
    const list = actions.length > 0 ? actions : DEFAULT_ACTIONS;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.md,
                paddingBottom: insets.bottom,
            },
            style,
        ], children: list.map((action) => {
            const tone = profile_v4_1.ACTION_TONE[action] ?? 'neutral';
            const skin = ACTION_SKIN(theme, tone);
            const ink = (0, profile_v4_1.toneInk)(theme, tone);
            const d = Math.max(diameter(tokens.spacing, size), (0, chrome_v4_1.minTap)(tokens.spacing));
            const disabled = disabledSet.has(action);
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: actionLabels?.[action] ?? SPEC[action].label, accessibilityState: { disabled }, disabled: disabled, onPress: () => onAction?.(action), style: ({ pressed }) => ({
                    width: d,
                    height: d,
                    // Geometry, not `radius.full`: these are circles in every brand,
                    // including a `sharp` seed where the token compiles to 0.
                    borderRadius: d / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, skin.ground, skin.mix) : skin.ground,
                    borderWidth: 1,
                    borderColor: skin.ring,
                    opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: GLYPH_SIZE[size], weight: "bold", allowFontScaling: false, style: { color: ink }, children: SPEC[action].glyph }) }, action));
        }) }));
}
//# sourceMappingURL=LikePassButtonsV4.js.map
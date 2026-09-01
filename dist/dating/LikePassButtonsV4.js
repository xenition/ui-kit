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
exports.LikePassButtonsV4 = exports.ACTION_SKIN = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const profile_v4_1 = require("./internal/profile-v4");
const NEUTRAL_SKIN = {
    fill: 'bg-[color-mix(in_srgb,var(--xen-on-surface)_12%,var(--xen-surface))]',
    ground: 'color-mix(in srgb, var(--xen-on-surface) 12%, var(--xen-surface))',
    ring: 'border-border',
    mix: 'var(--xen-on-surface)',
};
exports.ACTION_SKIN = {
    neutral: NEUTRAL_SKIN,
    muted: NEUTRAL_SKIN,
    primary: {
        fill: 'bg-[color-mix(in_srgb,var(--xen-primary)_12%,var(--xen-surface))]',
        ground: 'color-mix(in srgb, var(--xen-primary) 12%, var(--xen-surface))',
        ring: 'border-primary',
        mix: 'var(--xen-primary)',
    },
    accent: {
        fill: 'bg-[color-mix(in_srgb,var(--xen-accent)_12%,var(--xen-surface))]',
        ground: 'color-mix(in srgb, var(--xen-accent) 12%, var(--xen-surface))',
        ring: 'border-accent',
        mix: 'var(--xen-accent)',
    },
    success: {
        fill: 'bg-[color-mix(in_srgb,var(--xen-success)_12%,var(--xen-surface))]',
        ground: 'color-mix(in srgb, var(--xen-success) 12%, var(--xen-surface))',
        ring: 'border-success',
        mix: 'var(--xen-success)',
    },
    warn: {
        fill: 'bg-[color-mix(in_srgb,var(--xen-warn)_12%,var(--xen-surface))]',
        ground: 'color-mix(in srgb, var(--xen-warn) 12%, var(--xen-surface))',
        ring: 'border-warn',
        mix: 'var(--xen-warn)',
    },
    danger: {
        fill: 'bg-[color-mix(in_srgb,var(--xen-danger)_12%,var(--xen-surface))]',
        ground: 'color-mix(in srgb, var(--xen-danger) 12%, var(--xen-surface))',
        ring: 'border-danger',
        mix: 'var(--xen-danger)',
    },
};
/** The glyph and the default name for each of the five actions. */
const SPEC = {
    rewind: { glyph: '↺', label: 'Rewind' },
    pass: { glyph: '✕', label: 'Pass' },
    superlike: { glyph: '★', label: 'Super like' },
    like: { glyph: '♥', label: 'Like' },
    boost: { glyph: '⚡', label: 'Boost' },
};
/**
 * The three diameters, composed from the spacing scale rather than picked.
 *
 * `sm` is the 44 tap floor exactly (`2xl - xs`), `md` is 56 (`2xl + sm`) and
 * `lg` is **64** (`2xl + md`) — the number the web twin already drew. Native
 * drew 68, one of a pair of nearly-equal sizes for one idea; 64 wins because it
 * lands on the scale and 68 does not, so a seed that re-scales its rhythm
 * re-scales the button row with it.
 */
const DIAMETER = {
    sm: 'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
    md: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]',
    lg: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]',
};
/** The glyph scales with the disc rather than staying one size in three circles. */
const GLYPH_SIZE = { sm: 'lg', md: 'xl', lg: '2xl' };
const DEFAULT_ACTIONS = ['pass', 'superlike', 'like'];
/**
 * **V4 like/pass buttons** — the web twin of the native `LikePassButtonsV4`,
 * same props as {@link LikePassButtons} plus `actionLabels`.
 *
 * ## Five changes
 *
 * 1. **Passing on someone is no longer an error.** The row spent four *status*
 *    slots on five *identities* — `rewind → warn`, `pass → danger`,
 *    `like → success` — so a toolbar of ordinary, non-destructive choices was
 *    painted in the two colours that mean something has gone wrong. `ACTION_TONE`
 *    gives them identity tones and the glyph carries which action it is.
 * 2. **The row is one control on both platforms.** Web drew a bare `surface`
 *    circle with a 2px coloured border, native a 12% tint with a 1px border,
 *    and `lg` was 64 on one and 68 on the other. See {@link ACTION_SKIN} and
 *    {@link DIAMETER}.
 * 3. **`role="toolbar"` now means what it says.** The base claimed the role and
 *    left five separate tab stops behind it, so a keyboard user got the
 *    announcement of arrow-key navigation and none of the behaviour. Focus is
 *    roving: one tab stop for the row, arrows between the buttons, and a
 *    disabled action is stepped over rather than focused into.
 * 4. **Press is a state layer, not a dim.** `hover:bg-neutral-100` is a
 *    light-oriented ramp step that paints a near-white disc on a dark page, and
 *    `disabled:opacity-40` is not M3's 0.38 disabled band.
 * 5. **The five names are props.** They were English string literals on the
 *    only controls in the deck a screen-reader user can reach.
 */
exports.LikePassButtonsV4 = React.forwardRef(function LikePassButtonsV4({ actions = DEFAULT_ACTIONS, onAction, disabledActions, size = 'md', actionLabels, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const disabledSet = React.useMemo(() => new Set(disabledActions ?? []), [disabledActions]);
    const list = actions.length > 0 ? actions : DEFAULT_ACTIONS;
    const [focused, setFocused] = React.useState(0);
    const buttons = React.useRef([]);
    // The roving tab stop has to land on something focusable: a disabled
    // action cannot take focus, and a row whose first action is `rewind` with
    // nothing to undo is the common case.
    const firstEnabled = list.findIndex((action) => !disabledSet.has(action));
    const held = list[focused];
    const roving = held != null && !disabledSet.has(held) ? focused : Math.max(0, firstEnabled);
    const onKeyDown = (event) => {
        const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
        if (delta === 0 || firstEnabled < 0)
            return;
        event.preventDefault();
        let next = roving;
        for (let step = 0; step < list.length; step += 1) {
            next = (next + delta + list.length) % list.length;
            const candidate = list[next];
            if (candidate != null && !disabledSet.has(candidate))
                break;
        }
        setFocused(next);
        buttons.current[next]?.focus();
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "toolbar", "aria-orientation": "horizontal", onKeyDown: onKeyDown, className: (0, cn_1.cn)('flex items-center justify-center gap-md', className), ...rest, children: list.map((action, i) => {
            const spec = SPEC[action];
            const tone = profile_v4_1.ACTION_TONE[action] ?? 'neutral';
            const skin = exports.ACTION_SKIN[tone];
            const disabled = disabledSet.has(action);
            return ((0, jsx_runtime_1.jsx)("button", { ref: (node) => {
                    buttons.current[i] = node;
                }, type: "button", "aria-label": actionLabels?.[action] ?? spec.label, disabled: disabled, tabIndex: i === roving ? 0 : -1, onFocus: () => setFocused(i), onClick: () => onAction?.(action), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(skin.ground, skin.mix), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full border font-bold', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS, nav_v4_1.MIN_TAP_SQUARE_CLASS, DIAMETER[size], skin.fill, skin.ring, profile_v4_1.TONE_INK[tone]), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: spec.glyph, size: GLYPH_SIZE[size] }) }, action));
        }) }));
});
//# sourceMappingURL=LikePassButtonsV4.js.map
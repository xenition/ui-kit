"use strict";
/**
 * Shared plumbing for the **V4 navigation line** on the web — `TabsV4`,
 * `ScrollableTabsV4`, `SegmentedV4`, `BottomNavV4`, `BreadcrumbV4`, `MenuV4`,
 * `PopoverV4`, `TooltipV4`, `ToolbarV4`, `PaginationV4`, `StepsV4`.
 *
 * Navigation has one job that outranks every other: say where the user is
 * (`design.md` §29) and let them recognise it rather than recall it (§32). So
 * the two things this file owns are the two things a navigation control cannot
 * express honestly on its own:
 *
 * 1. **A selected state that moves.** §36.5 asks that related states keep
 *    continuity of position. A tab underline that vanishes here and reappears
 *    there is two events; the same underline sliding is one, and the eye
 *    follows it. That needs measurement, so it needs a hook — see
 *    {@link useMovingIndicator}.
 * 2. **Grounds and edges that are not utility classes.** A hover ground, a
 *    focus ring and a floating panel's shadow all have to be `var(--xen-*)`
 *    expressions, and `color-mix()` cannot be written as a Tailwind colour
 *    bound to a token. They live in {@link NAV_V4_CSS}.
 *
 * ## Why the grounds are a stylesheet and not inline styles
 *
 * Every value here is a `var()` or a `color-mix()`. A CSSOM that does not parse
 * custom properties — jsdom, and any SSR style extractor built on one — drops
 * such a value from an inline `style` outright, silently leaving the control
 * unstyled. In a stylesheet the declaration is never parsed by that layer at
 * all: it is a string handed to the browser. `GlassPanel` and the V4 surfaces
 * already work this way; the navigation line follows them.
 *
 * Depth for the floating members (`Menu`, `Popover`, `Tooltip`) is deliberately
 * NOT re-derived here: the panel skins reuse `--xen-elevation-*` and
 * `--xen-glass-*` exactly as `internal/surface-v4` does, because a menu and a
 * bottom sheet are the same kind of object at different sizes and should not
 * drift apart.
 */
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
exports.NAV_V4_CSS = exports.PANEL_MIN_WIDTH_CLASS = exports.MIN_TAP_SQUARE_CLASS = exports.MIN_TAP_CLASS = exports.MIN_TAP = exports.NAV_MOTION = void 0;
exports.useMovingIndicator = useMovingIndicator;
const React = __importStar(require("react"));
const glass_1 = require("../../theme/glass");
const v4_motion_1 = require("./v4-motion");
/**
 * Motion durations for the navigation line, in `design.md` §36.2's band for a
 * small state transition (160–240ms).
 *
 * `indicator` is the longer of the two because it travels a real distance and
 * the travel is the point; `reveal` is a floating panel appearing, which moves
 * nowhere and so takes the shortest time that still reads as a transition.
 */
exports.NAV_MOTION = {
    /** A thumb or an underline sliding to the newly selected item. */
    indicator: v4_motion_1.V4_MOTION.standard,
    /**
     * A menu, popover or tip coming into existence.
     *
     * Was 160 here, 180 in the picker line and 140 in the input — three numbers
     * for one idea. All three are now M3's `standard`.
     */
    reveal: v4_motion_1.V4_MOTION.standard,
};
/**
 * The minimum comfortable tap target, composed from the spacing scale rather
 * than hard-coded as `44px`.
 *
 * `2xl - xs` is 44 at the kit's scale — the same expression `ButtonV4` uses for
 * its default height, so a tab, a page number and a button land on one size
 * instead of three that happen to be close.
 */
exports.MIN_TAP = 'calc(var(--xen-space-2xl) - var(--xen-space-xs))';
/** {@link MIN_TAP} as a Tailwind arbitrary value (spaces are underscores). */
exports.MIN_TAP_CLASS = 'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
/** {@link MIN_TAP} applied to both axes — for a square target like a page number. */
exports.MIN_TAP_SQUARE_CLASS = 'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
/**
 * The minimum width of a floating panel — menu, popover — as a Tailwind
 * arbitrary value.
 *
 * Composed from the spacing scale rather than picked (the base components had
 * a hard-coded `10rem` and `12rem`, two numbers for one idea). Four times the
 * largest step is wide enough for a short label beside an icon without the
 * panel looking like a tooltip, and it scales with a seed that widens its
 * rhythm.
 */
exports.PANEL_MIN_WIDTH_CLASS = 'min-w-[calc(var(--xen-space-2xl)_*_4)]';
/**
 * Every ground, edge and panel skin the V4 navigation line paints, as one
 * injected stylesheet.
 *
 * The grounds are mixed from `--xen-border` rather than from a neutral ramp
 * step: `border` is re-derived per scheme by the compiler, so a hover ground
 * built from it is a hairline's worth of contrast in both schemes instead of a
 * fixed grey that disappears in one of them.
 */
exports.NAV_V4_CSS = `
@keyframes xen-v4-nav-in { from { opacity: 0; transform: translateY(calc(var(--xen-space-xs) * -1)); } to { opacity: 1; transform: none; } }
@keyframes xen-v4-nav-fade { from { opacity: 0; } to { opacity: 1; } }

/* The one thing that moves: a thumb or an underline tracking the selection. */
[data-xen-v4-nav-indicator] {
  transition: transform ${exports.NAV_MOTION.indicator}ms ${v4_motion_1.EASE_ENTER}, width ${exports.NAV_MOTION.indicator}ms ${v4_motion_1.EASE_ENTER};
  pointer-events: none;
}

/* A quiet ground for the item under the pointer — feedback, not a highlight. */
[data-xen-v4-nav-item] {
  transition: ${(0, v4_motion_1.transitionCss)(['color', 'background-color', 'border-color'], exports.NAV_MOTION.reveal)};
}
[data-xen-v4-nav-item]:hover:not(:disabled):not([aria-selected="true"]):not([aria-current="page"]) {
  background-color: color-mix(in srgb, var(--xen-border) 45%, transparent);
}
[data-xen-v4-nav-item]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: -2px;
}

/*
  A count chip riding on a tab.

  Both grounds are OPAQUE mixes rather than translucent tints: a translucent
  chip borrows whatever is behind it, and the label's contrast was measured
  against one ground only. The idle chip is \`on-surface\` stirred into
  \`surface\`, which moves correctly with the scheme in one expression instead of
  a light case and a dark one.
*/
[data-xen-v4-nav-badge] {
  background-color: color-mix(in srgb, var(--xen-on-surface) 12%, var(--xen-surface));
  color: var(--xen-on-surface);
}
[data-xen-v4-nav-badge="on"] {
  background-color: var(--xen-primary);
  color: var(--xen-on-primary);
}

/* The rail a segmented thumb slides along, and the thumb itself. */
[data-xen-v4-nav-rail] {
  background-color: color-mix(in srgb, var(--xen-border) 55%, var(--xen-surface));
}
[data-xen-v4-nav-thumb] {
  background-color: var(--xen-surface);
  /*
    No hairline. A raised card keeps its border because a shadow alone dissolves
    on a same-colour page; a thumb never has that problem, because the rail
    underneath it is a different colour by construction.
  */
  box-shadow: var(--xen-elevation-card);
}

/*
  A bottom navigation bar, and the contained fill behind its active icon.

  The bar's shadow is \`--xen-elevation-sheet\`, whose offset is NEGATIVE — the
  compiler built it for a sheet rising from the bottom edge, which is exactly
  the direction a bottom bar's shadow has to fall: onto the content passing
  underneath it, not onto the home indicator below.
*/
[data-xen-v4-nav-bar] {
  background-color: var(--xen-surface);
  box-shadow: var(--xen-elevation-sheet);
}
[data-xen-v4-nav-bar="glass"] {
  background-color: ${(0, glass_1.composeGlassCss)('regular')};
  border-top-color: var(--xen-glass-border);
  -webkit-backdrop-filter: blur(var(--xen-glass-blur));
  backdrop-filter: blur(var(--xen-glass-blur));
}
[data-xen-v4-nav-pill] {
  background-color: color-mix(in srgb, var(--xen-primary) 14%, var(--xen-surface));
}

/* A floating layer: menu, popover, tip. Same skin as the V4 sheets. */
[data-xen-v4-nav-panel] {
  background-color: var(--xen-surface);
  box-shadow: var(--xen-elevation-sheet);
  animation: xen-v4-nav-in ${exports.NAV_MOTION.reveal}ms ${v4_motion_1.EASE_ENTER};
}
/*
  A tooltip bubble.

  Not a panel: a tip is the one floating thing that INVERTS, because that is
  how a reader recognises "this is an annotation, not a surface" before reading
  a word (§31 — prefer the established pattern). \`on-surface\`/\`surface\` is a
  compiler-guaranteed pair, so the inversion carries its own contrast promise —
  unlike \`bg-neutral-900\`/\`text-neutral-50\`, which is a pair by luck of how
  the dark block re-emits the ramp.

  It takes \`--xen-elevation-card\`, the smallest of the three: a tip has barely
  left the page, and §36.8 asks for feedback proportional to the event.

  At \`depth: 'glass'\` it joins the glass family instead, because an inverted
  bubble behind a blur is neither legible nor translucent.
*/
[data-xen-v4-nav-tip] {
  background-color: var(--xen-on-surface);
  color: var(--xen-surface);
  box-shadow: var(--xen-elevation-card);
  animation: xen-v4-nav-fade ${exports.NAV_MOTION.reveal}ms ${v4_motion_1.EASE_EXIT};
}
[data-xen-v4-nav-tip="glass"] {
  background-color: ${(0, glass_1.composeGlassCss)('regular')};
  color: var(--xen-on-surface);
  border: 1px solid var(--xen-glass-border);
  -webkit-backdrop-filter: blur(var(--xen-glass-blur));
  backdrop-filter: blur(var(--xen-glass-blur));
}
[data-xen-v4-nav-panel="glass"] {
  background-color: ${(0, glass_1.composeGlassCss)('regular')};
  /*
    The hairline exists only on glass, where the panel edge would otherwise
    disappear into a busy ground. An opaque panel is separated by its shadow.
  */
  border: 1px solid var(--xen-glass-border);
  -webkit-backdrop-filter: blur(var(--xen-glass-blur));
  backdrop-filter: blur(var(--xen-glass-blur));
}

/*
  The scrim, for the one navigation control that needs one.

  NOT \`bg-neutral-950/50\`: the dark block re-emits the ramps mirrored, so that
  paints a near-WHITE veil over a dark page — the bug the base overlays have.
  \`--xen-elevation-color\` does not invert, because a shadow does not.
*/
[data-xen-v4-nav-scrim] {
  background-color: color-mix(in srgb, var(--xen-elevation-color) 44%, transparent);
  animation: xen-v4-nav-fade ${exports.NAV_MOTION.reveal}ms ${v4_motion_1.EASE_EXIT};
}

@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-nav-indicator] { transition: none; }
  [data-xen-v4-nav-panel] { animation: xen-v4-nav-fade ${exports.NAV_MOTION.reveal}ms ${v4_motion_1.EASE_EXIT}; }
}
`;
/**
 * Track the selected item with an indicator that **travels**.
 *
 * §36.5: a transition should preserve continuity of position between related
 * states. Two tabs are related states of one thing — "which section am I in" —
 * so the underline that answers that question is one object that moves, not two
 * that blink. The movement is also what makes the change readable at a glance
 * without the control having to shout (§32), which is the whole brief for
 * navigation.
 *
 * The geometry is `offsetLeft` / `offsetWidth` against the positioned ancestor
 * — which is the track itself — rather than `getBoundingClientRect`, so the
 * numbers are already in the coordinate space the indicator is absolutely
 * positioned in and no scroll offset has to be subtracted. That matters for
 * `ScrollableTabsV4`, whose track scrolls under the indicator.
 *
 * Measuring returns nothing in an environment with no layout engine (jsdom,
 * SSR), and that is the same state as "not measured yet": the indicator is
 * simply not rendered, and the selected tab still says it is selected through
 * its colour and weight. Nothing about knowing where you are depends on this
 * hook succeeding.
 */
function useMovingIndicator(activeKey, itemCount) {
    const items = React.useRef(new Map()).current;
    const [box, setBox] = React.useState(null);
    const measure = React.useCallback(() => {
        const node = items.get(activeKey);
        if (node === undefined) {
            setBox(null);
            return;
        }
        const w = node.offsetWidth;
        setBox(w > 0 ? { x: node.offsetLeft, w } : null);
        // `itemCount` is a dependency rather than an unused argument: adding or
        // removing a tab moves every tab after it, and nothing else would tell us.
    }, [activeKey, itemCount, items]);
    // Layout effect, not effect: the indicator must be in position on the same
    // frame the selection changed, or the first paint shows it in the old place.
    React.useLayoutEffect(() => {
        measure();
    }, [measure]);
    React.useEffect(() => {
        if (typeof window === 'undefined')
            return;
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [measure]);
    const itemRef = React.useCallback((key) => (node) => {
        if (node === null)
            items.delete(key);
        else
            items.set(key, node);
    }, [items]);
    return {
        itemRef,
        style: box === null ? null : { transform: `translateX(${box.x}px)`, width: `${box.w}px` },
    };
}
//# sourceMappingURL=nav-v4.js.map
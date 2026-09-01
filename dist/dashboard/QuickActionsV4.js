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
exports.QuickActionsV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const GridV4_1 = require("../layout/GridV4");
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_depth_1 = require("../primitives/internal/v4-depth");
const v4_state_1 = require("../primitives/internal/v4-state");
/**
 * Depth cannot be said as a utility class bound to a token — `box-shadow`
 * needs a composed value and the dark scheme needs *more* of it, not less — so
 * the tile's shadow lives in a sheet, exactly as `CardV4`'s does. Both values
 * are custom properties the component computed from the compiled theme, so the
 * no-literal-colours rule (§1.1) holds; with no provider above, `none` is the
 * honest fallback rather than a guessed shadow.
 */
const QUICK_ACTIONS_V4_CSS = `
[data-xen-v4-quick-action] { box-shadow: var(--xen-v4-shadow-l, none); }
[data-theme="dark"] [data-xen-v4-quick-action] { box-shadow: var(--xen-v4-shadow-d, none); }
`;
/**
 * **V4 quick actions** — the shortcut launcher on a dashboard home, on the V4
 * design line. Same props as {@link QuickActions} plus `minItemWidth`, and two
 * additive fields on each action (`iconName`, `tone`).
 *
 * ## It is a row of soft badges, not an admin toolbar
 *
 * §3 describes what this product actually looks like — *warm, generous, airy
 * consumer mobile; white cards floating on the warm ground; glyphs sit in soft
 * tinted circular badges* — and the base component was the opposite of it: a
 * bordered box the same colour as the page, an unstyled glyph slot, and a
 * `spacing.sm` gutter that packed the tiles tight enough to read as a control
 * strip. §5 asks for the whole tile:
 *
 * - **Ground `colors.card`, not `colors.surface`.** §4.2 calls this *"the most
 *   visible bug in the dashboard module today"* — the card slot was split out
 *   in the shadcn pass so a raised surface reads as raised in both schemes,
 *   and this module never adopted it. The ink moves with it, to `onCard`.
 * - **`radius.lg`, no border, `elevation.card`.** §4.2's recipe is a hairline
 *   *or* a soft shadow, never a heavy border and a shadow together; a tile
 *   floating on the warm page takes the shadow.
 * - **The glyph moves into a 44 tinted circular badge** — `IconV4
 *   badge="soft"`, §4.7's categorical badge, which is exactly what a quick
 *   action is: a *kind of thing* you can go and do.
 * - **Gutter `spacing.md`**, up from `sm`. §4.1's grid gutter, and §3's "when
 *   in doubt, more space".
 *
 * ## Reach, state and disabled
 *
 * Every tile clears the 44 floor through `MIN_TAP` (`spacing['2xl'] -
 * spacing.xs`, composed rather than typed). Hover and press are the **state
 * layer** over the tile's own opaque `card`/`onCard` pair — the base's
 * `hover:bg-neutral-100` was a raw ramp step that only worked in one scheme by
 * accident. `disabled` takes M3's 0.38 content opacity through
 * `V4_DISABLED_CLASS`, not the base's round-number `opacity-50`.
 *
 * ## Structure
 *
 * The grid is `GridV4`, so `columns` and the new `minItemWidth` are the
 * module's one answer to how many tracks fit rather than a second
 * `gridTemplateColumns` written here. The heading is an `<h3>` wrapping a
 * `TextV4` — the same anatomy `SectionV4` and `PageHeaderV4` use, so the
 * element carries the document semantics and the type comes from the scale.
 *
 * `actions: []` renders **nothing** (§4.5). A launcher with nothing to launch
 * is not a heading over a blank box.
 */
exports.QuickActionsV4 = React.forwardRef(function QuickActionsV4({ actions, title, columns = 3, minItemWidth, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-quick-actions-styles', QUICK_ACTIONS_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const theme = (0, v4_depth_1.useOptionalCompiledTheme)();
    // §4.5 — nothing to launch, nothing to draw. Not even the heading: a title
    // over a blank box is the bordered-empty-box §4.5 rules out, with a label.
    if (actions.length === 0)
        return null;
    const shadowVars = {};
    if (theme !== null) {
        shadowVars['--xen-v4-shadow-l'] = (0, v4_depth_1.shadowCss)(theme.lightElevation.card);
        shadowVars['--xen-v4-shadow-d'] = (0, v4_depth_1.shadowCss)(theme.darkElevation.card);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [title ? (
            // `m-0` because a bare `h3` carries a user-agent margin that would
            // fight §4.1's rhythm; the type itself comes from `TextV4`.
            (0, jsx_runtime_1.jsx)("h3", { className: "m-0", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onSurface", children: title }) })) : null, (0, jsx_runtime_1.jsx)(GridV4_1.GridV4, { columns: columns, gap: "md", minItemWidth: minItemWidth, children: actions.map((action) => {
                    const glyph = typeof action.icon === 'string' ? action.icon : undefined;
                    const badged = glyph !== undefined || action.iconName !== undefined;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": action.label, disabled: action.disabled, "data-xen-v4-quick-action": "", "data-xen-v4-state": "", onClick: action.onClick, className: (0, cn_1.cn)('flex h-full w-full flex-col items-center justify-center gap-sm p-md', 
                        // The HIG floor, composed from the spacing scale.
                        nav_v4_1.MIN_TAP_CLASS, 
                        // §4.2: the card ground, the card radius, and no border —
                        // the shadow in the sheet is the edge.
                        'rounded-[var(--xen-radius-lg)] bg-card text-on-card', 'focus-visible:outline-none', v4_state_1.V4_DISABLED_CLASS), style: {
                            ...shadowVars,
                            ...(0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'),
                        }, children: [badged ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, name: action.iconName, badge: "soft", color: action.tone ?? 'primary' })) : action.icon ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: action.icon })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, children: action.label })] }, action.key));
                }) })] }));
});
//# sourceMappingURL=QuickActionsV4.js.map
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
exports.CategoryTileV4 = exports.CATEGORY_TILE_V4_CSS = exports.CATEGORY_TILE_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const internal_1 = require("./internal");
/** The one `<style>` id this component injects its own sheet from. Idempotent. */
exports.CATEGORY_TILE_V4_STYLE_ID = 'xen-v4-category-tile-styles';
/**
 * Two rules, saying two things a class bound to a token cannot say.
 *
 * **The ground** (§4.2). The tile paints `--xen-card`, not `--xen-surface`.
 * `CardV4` hard-codes `bg-surface text-on-surface` in its own class list and
 * `cn()` is a plain string join with no `tailwind-merge` behind it, so passing
 * `bg-card` in `className` would put both utilities on the element and let the
 * generated stylesheet's ordering pick the winner. Two attributes (0-2-0) beat
 * one class (0-1-0) wherever the sheets land.
 *
 * **The selected container.** `--xen-selected` / `--xen-on-selected` is the
 * token the shadcn pass added for exactly this — "the selected-row container"
 * — and the base was hand-mixing `bg-primary-50` instead, which is a *ramp
 * step*: on a dark page `primary[50]` is a near-white, so a selected tile in
 * dark mode was a bright slab with brand-coloured text on it. The border
 * follows, because a selected tile is a container that has changed state and
 * §4.3's transition list moves fill and edge together.
 */
exports.CATEGORY_TILE_V4_CSS = `
[data-xen-v4-card][data-xen-v4-category-tile] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
[data-xen-v4-card][data-xen-v4-category-tile][data-selected="true"] {
  background-color: var(--xen-selected);
  color: var(--xen-on-selected);
  border-color: var(--xen-primary);
}
`;
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
 *    accent ring plus a tinted surface plus `aria-pressed` — two colour
 *    channels and one channel a sighted reader cannot see. V4 adds a
 *    **checkmark**, which is M3's filter-chip behaviour and HIG's option-list
 *    rule: a selected option shows a mark, not just a shade.
 * 4. **The selected ground is the `selected` token**, not a ramp step. See
 *    {@link CATEGORY_TILE_V4_CSS}.
 * 5. **The tile clears the tap floor.** `MIN_TAP_CLASS` (44) on the chip, and
 *    the tile keeps its taller block. The base's chip was `py-sm` around a
 *    `text-sm` label, which lands around 32.
 * 6. **Press feedback is the state layer** (§4.3), given the opaque
 *    `card`/`onCard` (or `selected`/`onSelected`) pair, because the label's
 *    contrast promise is made against the fill the tile actually wears.
 *
 * Composes `CardV4`, `IconV4` and `TextV4` (rule 7). Renders **nothing** when
 * it has neither a label nor a mark (§4.5) — never a blank bordered box.
 */
exports.CategoryTileV4 = React.forwardRef(function CategoryTileV4({ label, glyph, iconName, count, selected = false, variant = 'tile', onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.CATEGORY_TILE_V4_STYLE_ID, exports.CATEGORY_TILE_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const chip = variant === 'chip';
    const interactive = onClick != null;
    const hasLabel = label !== undefined && label !== null && label !== '';
    const hasMark = glyph !== undefined || iconName !== undefined;
    // Nothing to name and nothing to show, so nothing is drawn (§4.5).
    if (!hasLabel && !hasMark)
        return null;
    const countLabel = typeof count === 'number' ? `${count.toLocaleString()} items` : undefined;
    /*
      A chip is a 44-tall pill: a 44 badge inside it would leave no room for
      its own padding, so the chip takes the bare glyph and the tile takes the
      badge. Both are `IconV4`; only the `badge` prop differs.
    */
    const mark = hasMark ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, name: iconName, size: chip ? 'base' : 'lg', color: "primary", badge: chip ? undefined : 'soft', className: "shrink-0" })) : null;
    // Rule 6: the selected state gets a mark, not only a shade.
    const check = selected ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm", color: "primary", className: "shrink-0" })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [mark, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 flex-col gap-xs', chip ? 'items-start' : 'items-center'), children: [hasLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: selected ? 'onSelected' : 'onCard', numberOfLines: 1, children: label })) : null, countLabel !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: countLabel })) : null] }), check] }));
    const shared = {
        'data-xen-v4-category-tile': '',
        'data-selected': selected ? 'true' : 'false',
        radius: 'lg',
        padding: (chip ? 'sm' : 'lg'),
        className: (0, cn_1.cn)('flex items-center justify-center', nav_v4_1.MIN_TAP_CLASS, chip ? 'flex-row gap-sm px-md' : 'flex-col gap-sm', className),
    };
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, ...shared, ...rest, children: body }));
    }
    /*
      A `role="button"` container rather than a real `<button>`, which is the
      pattern every tappable card in the kit uses and the only one available
      here: the state layer has to sit on the element that owns the ground, and
      a `<button>` wrapped around an opaque card would tint a region the card
      covers completely — a press with no visible feedback.
    */
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, ...shared, ...rest, role: "button", tabIndex: 0, "aria-pressed": selected, "aria-label": `${String(label ?? '')}${countLabel !== undefined ? `, ${countLabel}` : ''}`, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(selected ? 'var(--xen-selected)' : 'var(--xen-card)', selected ? 'var(--xen-on-selected)' : 'var(--xen-on-card)'), onClick: onClick, onKeyDown: internal_1.activateOnKey, children: body }));
});
//# sourceMappingURL=CategoryTileV4.js.map
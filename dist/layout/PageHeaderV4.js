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
exports.PageHeaderV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const _tokens_1 = require("./_tokens");
/**
 * The width the title column asks for before `actions` is pushed onto its own
 * line, composed from the spacing scale rather than picked: `2xl × 4` is 192 at
 * the default scale — roughly a dozen characters at the `3xl` step, which is
 * the point below which a headline stops being readable as a headline.
 *
 * It is a `flex-basis`, not a `min-width`: flex line-breaking uses the basis, so
 * the actions wrap below the title when the row cannot give the title that
 * much, and `min-w-0` still lets the title truncate once it is on its own line.
 * Written out whole because Tailwind's scanner reads source text; the native
 * twin computes the identical product from `tokens.spacing`, and both specs
 * assert it.
 */
const TITLE_BASIS = 'basis-[calc(var(--xen-space-2xl)*4)]';
/**
 * `PageHeader`, V4 — the screen title block, drawn as the product's own opening
 * line rather than as an admin page banner.
 *
 * ## ⚠️ The default changed: there is no bottom border any more
 *
 * The base `PageHeader` paints `border-b border-border` unconditionally, so
 * every screen in the product opens with a hairline under its title.
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.4 rules that out in as many words: a
 * separator is for grouping rows *inside* a container, and **between
 * free-standing blocks the structuring device is space, not a rule** — "a
 * hairline under every screen title is admin styling", and it fights the warm,
 * airy ground §3 describes.
 *
 * So {@link PageHeaderV4Props.divided} defaults to **`false`**. This is the
 * single place the V4 rules' "additive only, defaults preserve today's
 * rendering" clause is knowingly set aside, because the brief asks for exactly
 * this change by name. The rule is still available — `divided` puts it back
 * verbatim, same 1px, same `colors.border` — for the rare surface (a split
 * view, a header pinned above a scrolling list) that genuinely needs the edge.
 *
 * Everything else follows §5's `PageHeader` note and §4.1's rhythm:
 *
 * 1. **The title is a real headline.** `text-2xl font-bold` becomes `TextV4`
 *    at `3xl`, `weight="bold"`, `tone="onSurface"` — the loudest thing on the
 *    screen, which is what a page title is meant to be.
 * 2. **The face is asked for, not painted over.** Like `AuthHeadingV4`, the
 *    title asks `TextV4` for `face="heading"` and the subtitle for
 *    `face="body"`, so a seed that chose a display face gets it here and the
 *    pairing is stated rather than inherited from whatever wrapper the header
 *    was dropped into.
 * 3. **The subtitle is a sentence, so it gets a text colour.** `text-sm
 *    text-muted` becomes `size="base" tone="mutedText"`. `muted` is a
 *    decorative fill with no contrast promise; `mutedText` is the same
 *    quietness walked until it clears AA. `AuthHeadingV4` and `EmptyStateV4`
 *    made the same move for the same reason.
 * 4. **Room below.** The block pads by `spacing.lg` rather than `spacing.md`
 *    (§5), with `spacing.xs` between the title and its supporting line (§4.1).
 * 5. **Actions wrap instead of crushing the title.** §5: "an `actions` node
 *    longer than an icon wraps below the title on a narrow screen rather than
 *    crushing it." See {@link TITLE_BASIS}.
 * 6. **An optional leading badge.** `icon` renders through `IconV4`'s
 *    `badge="soft"` — §4.7's 44 tinted circle, `primary` by default — for a
 *    screen whose title names a kind of thing. Absent unless asked for.
 *
 * **It does not clamp by default.** {@link PageHeaderV4Props.titleLines} and
 * {@link PageHeaderV4Props.subtitleLines} are offered and never applied
 * unasked: silently eliding a screen title a caller actually passed is worse
 * than a title that wraps to two lines.
 *
 * **It renders nothing when it has nothing** (§4.5): no title, no subtitle, no
 * actions and no icon produces `null`, not an empty block holding `spacing.lg`
 * of padding open.
 *
 * No motion and no state layer: a header has no states to transition between
 * and is not interactive (that is `ProfileHeader`'s job).
 */
exports.PageHeaderV4 = React.forwardRef(function PageHeaderV4({ title, subtitle, actions, divided = false, size = '3xl', icon, titleLines, subtitleLines, className, ...rest }, ref) {
    const hasTitle = title != null && title !== '';
    const hasSubtitle = subtitle != null && subtitle !== '';
    // `as unknown` because `IconName` has no empty member — the guard is for a
    // JS caller passing `''`, which TypeScript alone cannot rule out.
    const hasIcon = icon != null && icon !== '';
    // §4.5 — a component with nothing to show renders nothing, never a blank box
    // reserving the block's padding.
    if (!hasTitle && !hasSubtitle && !hasIcon && actions == null)
        return null;
    const mark = hasIcon
        ? typeof icon === 'string'
            ? // §4.7's categorical badge. A caller wanting another tone passes its
                // own `IconV4` element instead of a name.
                (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, badge: "soft", color: "primary" })
            : icon
        : null;
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, "data-xen-v4-page-header": "", "data-divided": divided ? '' : undefined, className: (0, cn_1.cn)(
        // `flex-wrap` is what lets a wide `actions` node drop below the title
        // instead of squeezing it — §5.
        'flex flex-row flex-wrap items-start justify-between', _tokens_1.SPACE_GAP.md, 'pb-[var(--xen-space-lg)]', 
        // §4.4 — off by default. The hairline is opt-in, not the house style.
        divided && 'border-b border-border', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-row items-start min-w-0 grow', TITLE_BASIS, _tokens_1.SPACE_GAP.md), children: [mark ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: mark }) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col min-w-0 grow', _tokens_1.SPACE_GAP.xs), children: [hasTitle ? (
                            // `m-0` because a bare `h1` carries a user-agent margin that would
                            // sit inside the `gap-xs` above and quietly widen it.
                            (0, jsx_runtime_1.jsx)("h1", { className: "m-0", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: size, weight: "bold", tone: "onSurface", face: "heading", numberOfLines: titleLines, children: title }) })) : null, hasSubtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", face: "body", numberOfLines: subtitleLines, children: subtitle })) : null] })] }), actions != null ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: actions }) : null] }));
});
//# sourceMappingURL=PageHeaderV4.js.map
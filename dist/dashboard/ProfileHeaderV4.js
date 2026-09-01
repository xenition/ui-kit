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
exports.ProfileHeaderV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const inject_1 = require("../motion/internal/inject");
const AvatarV4_1 = require("../primitives/AvatarV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_state_1 = require("../primitives/internal/v4-state");
/**
 * The tint's breathing room around the identity region, and the negative
 * margin that cancels it so the block's own rhythm is unchanged.
 *
 * The state layer is a *fill*, and a fill drawn exactly at the bounding box of
 * an avatar and two lines of text reads as a shrink-wrapped rectangle rather
 * than as the row lighting up. `spacing.sm` of padding pulled back by the same
 * negative margin gives the layer somewhere to be without moving anything —
 * the same in-place trick `picker-v4`'s `ringWrap` uses for the focus halo.
 */
const PRESS_PAD = 'p-[var(--xen-space-sm)] -m-[var(--xen-space-sm)]';
/**
 * `ProfileHeader`, V4 — the block that tops the account screen, drawn as an
 * identity rather than as a list row.
 *
 * ## What V4 changes
 *
 * §3's product is warm, generous and airy, and §5 asks this block to "feel
 * generous, not like a row". The base is a row: a `lg` avatar, a `text-xl`
 * name, a `text-sm` subtitle in `colors.muted`, `gap-0.5` between the two
 * lines, and no vertical padding at all — an anonymous strip that a settings
 * row could be mistaken for.
 *
 * 1. **A real avatar.** `AvatarV4` at `size="xl"` (72 on the stock scale, and
 *    composed from the spacing scale so a re-scaled seed re-scales it). It is
 *    the V4 avatar, so the monogram ground is derived from the name rather
 *    than being the same brand-tinted disc every person gets, and `status`
 *    names the presence state for a screen reader instead of relying on hue.
 * 2. **A confident name.** `TextV4 size="2xl" weight="bold" tone="onSurface"`
 *    in the seed's heading face — the loudest thing in the block, which is
 *    what a person's name is on their own screen.
 * 3. **Calm supporting text.** `size="base" tone="mutedText"` (§5; the base
 *    used `sm` and `colors.muted`). **`mutedText`, never the `muted` fill** —
 *    `muted` carries no contrast promise against `surface`, and a handle or a
 *    role is a line the user is meant to read.
 * 4. **Air around it.** `spacing.lg` vertically and `spacing.md` between the
 *    avatar and the text (§4.1), with `spacing.xs` between the name and its
 *    supporting line — the literal `gap-0.5` §1 names as a violation.
 * 5. **The whole identity can open the profile.** {@link
 *    ProfileHeaderV4Props.onClick} makes the avatar + name + subtitle one
 *    tappable region with §4.3's state layer — `data-xen-v4-state`, the
 *    opaque flavour over `surface`, because the name carries a measured
 *    contrast promise against the ground it is drawn on. `actions` sits
 *    outside that region, so a header with an "Edit" button never nests a
 *    button inside a button. There is no `hover:opacity-80` anywhere here;
 *    dimming the content is how M3 spells *disabled*.
 *
 * ## ⚠️ No hairline, by default
 *
 * §4.4: a separator groups rows *inside* a container, and **between
 * free-standing blocks the structuring device is space, not a rule** — "a
 * hairline under every screen title is admin styling". A profile header is a
 * free-standing block at the top of a screen, so
 * {@link ProfileHeaderV4Props.divided} defaults to **`false`**, exactly as
 * `PageHeaderV4`'s does, and puts the same 1px `colors.border` back when a
 * surface genuinely needs the edge. The base drew no border either, so nothing
 * moves for an existing caller — this is the rule being stated, not a default
 * being changed.
 *
 * **No card.** §5: the block sits directly on the page ground. No `card`
 * ground, no radius, no elevation — §4.6 gives a shadow to a card, a sheet and
 * the one dominant action, and this is none of the three.
 *
 * **It renders nothing when it has nothing** (§4.5): no name, no subtitle, no
 * avatar of any kind and no actions produces `null`, not an empty block
 * holding `spacing.lg` of padding open with a silhouette in it.
 */
exports.ProfileHeaderV4 = React.forwardRef(function ProfileHeaderV4({ name, subtitle, avatarUrl, avatar, status, actions, onClick, divided = false, nameLines = 1, subtitleLines = 1, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const hasName = name != null && name !== '';
    const hasSubtitle = subtitle != null && subtitle !== '';
    const hasAvatar = avatar != null || (avatarUrl != null && avatarUrl !== '');
    // §4.5 — a component with nothing to show renders nothing. A lone
    // silhouette over a name-shaped gap is not an identity.
    if (!hasName && !hasSubtitle && !hasAvatar && actions == null)
        return null;
    const face = avatar ?? ((0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: "xl", status: status }));
    const lines = ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 grow flex-col gap-[var(--xen-space-xs)]", children: [hasName ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: "onSurface", face: "heading", numberOfLines: nameLines, children: name })) : null, hasSubtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", face: "body", numberOfLines: subtitleLines, children: subtitle })) : null] }));
    const identityClass = 'flex min-w-0 grow flex-row items-center gap-[var(--xen-space-md)]';
    const identity = onClick ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: onClick, "data-xen-v4-state": "", 
        // The opaque flavour of the layer: the name is contrast-checked
        // against `surface`, so the fill it lights up with has to be an
        // opaque mix of that same pair rather than a translucent wash over
        // whatever happens to be behind the page.
        style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)(identityClass, PRESS_PAD, 'rounded-[var(--xen-radius-lg)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: face }), lines] })) : ((0, jsx_runtime_1.jsxs)("div", { className: identityClass, children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: face }), lines] }));
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, "data-xen-v4-profile-header": "", "data-divided": divided ? '' : undefined, className: (0, cn_1.cn)('flex flex-row items-center gap-[var(--xen-space-md)]', 'py-[var(--xen-space-lg)]', 
        // §4.4 — off by default. The hairline is opt-in, not the house style.
        divided && 'border-b border-border', className), ...rest, children: [hasName || hasSubtitle || hasAvatar ? identity : null, actions != null ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: actions }) : null] }));
});
//# sourceMappingURL=ProfileHeaderV4.js.map
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
exports.PodcastRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const reading_v4_1 = require("./internal/reading-v4");
/** Artwork: 44 compact, 64 standard, both composed from the spacing scale. */
const ART_SIZE = {
    compact: 'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
    standard: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]',
};
/**
 * **V4 podcast row** — the web twin of the native `PodcastRowV4`, same props as
 * {@link PodcastRow} plus `playLabel` and `pauseLabel`.
 *
 * ## Five changes
 *
 * 1. **The keyboard can play a podcast.** The base put the row's `onKeyDown`
 *    on the container that *wraps* the play button. Focus the play button,
 *    press Space: the container's handler ran first, called `preventDefault()`
 *    — which cancels the button's own Space activation, because browsers fire
 *    that on keyup — and navigated. Enter fired both: audio started and the
 *    page changed under it. There was no keyboard-only way to play an episode
 *    from a podcast row, and a mouse user never saw it. The row's activation
 *    now sits on a `<button>` that wraps only the artwork and the text, and
 *    the play control is its **sibling** — which removes the key bubbling, the
 *    invalid nested interactive content and native's unreachable play control
 *    in one change.
 * 2. **No dead play button.** `onPlayToggle` is optional; without it the base
 *    still drew a permanently greyed control. It is now not drawn at all.
 * 3. **The play control clears 44.** It was 40 square on both twins.
 * 4. **Press is the state layer.** The component carried three different
 *    opacity dims — 0.9 on the row, 0.8 on play, 0.5 on disabled — two of
 *    which sit at or below M3's disabled band.
 * 5. **The artwork placeholder is the shared media ground**, not
 *    `bg-neutral-100` on web against `colors.border` on native.
 */
exports.PodcastRowV4 = React.forwardRef(function PodcastRowV4({ episode, playing = false, onPlayToggle, onClick, variant = 'standard', playLabel = 'Play', pauseLabel = 'Pause', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!episode?.title)
        return null;
    const compact = variant === 'compact';
    const artSize = ART_SIZE[compact ? 'compact' : 'standard'];
    const meta = (0, reading_v4_1.metaLine)([episode.show, episode.duration]);
    const artwork = episode.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: episode.artworkUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('shrink-0 rounded-[var(--xen-radius-md)] object-cover', reading_v4_1.MEDIA_GROUND_CLASS, artSize) })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', reading_v4_1.MEDIA_GROUND_CLASS, artSize), children: (0, jsx_runtime_1.jsx)("span", { className: "text-lg leading-none text-on-card", children: "\uD83C\uDFA7" }) }));
    const text = ((0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-bold text-on-surface', compact ? 'line-clamp-1' : 'line-clamp-2'), children: episode.title }), !compact && meta ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('line-clamp-1 text-xs', reading_v4_1.TONE_INK.muted), children: meta })) : null] }));
    /*
      Spans, not `<div>`/`<p>`. This subtree is the child of a `<button>` on the
      interactive path, and a button may only contain phrasing content.
    */
    const region = onClick ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": (0, reading_v4_1.spokenLine)([episode.title, episode.show, episode.duration]), onClick: () => onClick(episode), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] p-xs text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [artwork, text] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-center gap-md p-xs", children: [artwork, text] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-sm', className), ...rest, children: [region, onPlayToggle ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, reading_v4_1.spokenLine)([playing ? pauseLabel : playLabel, episode.title]), "aria-pressed": playing, onClick: () => onPlayToggle(!playing), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-primary)', 'var(--xen-on-primary)'), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary', 
                // The HIG floor, composed from the spacing scale — not a typed 44.
                chrome_v4_1.MIN_TAP_CLASS, 'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: playing ? '❙❙' : '▶', size: "sm", color: "onPrimary" }) })) : null] }));
});
//# sourceMappingURL=PodcastRowV4.js.map
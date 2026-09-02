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
exports.BehaviorBadgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const tone_v4_1 = require("./internal/tone-v4");
/** The glyph each tone carries when the caller gives no `icon`. */
const TONE_GLYPH = {
    positive: '👍',
    negative: '👎',
    neutral: '•',
};
/** The sign the point value wears. `−` is U+2212, not a hyphen. */
const TONE_SIGN = {
    positive: '+',
    negative: '−',
    neutral: '',
};
/**
 * The default word each tone says out loud.
 *
 * `'negative'` was being read to a parent verbatim — "negative behavior:
 * Interrupted (−2)" — which is a verdict on a child rather than a description
 * of a moment. These three are descriptive instead, and all three are
 * replaceable through `toneLabels`.
 */
const TONE_LABEL = {
    positive: 'Positive',
    negative: 'Needs work',
    neutral: 'Noted',
};
/**
 * **V4 behavior badge** — same props as {@link BehaviorBadge} plus `note`,
 * `toneLabels` and a `size` that is finally read, on the standard
 * `className`/`style` surface.
 *
 * ## Six changes
 *
 * 1. **A child's conduct is no longer drawn in the error colour.** The base
 *    mapped `negative → danger`, and the web `Badge` defaults to `solid`, so
 *    `<BehaviorBadge tone="negative" label="Interrupted" points={2} />` put a
 *    saturated red chip against a six-year-old's name. `danger` means
 *    *something has gone wrong with the system*; spending it on a child is
 *    both a status-colour-on-identity violation and a shaming pattern. All
 *    three tones now wear one neutral chip, and the tone is carried by a glyph,
 *    a word and the signed number instead.
 * 2. **The spoken name stopped passing judgement.** It was the raw enum:
 *    "negative behavior: Interrupted (−2)". It is now the tone's *word* —
 *    "Needs work, Interrupted, −2" — and every word in it is overridable.
 * 3. **The chip can be positioned.** `BehaviorBadgeProps` extended nothing, so
 *    a caller could not pass `className`, `style`, `id` or a data attribute; a
 *    chip that cannot be placed is a chip that gets re-implemented. It now
 *    takes the standard HTML attribute surface.
 * 4. **`size` does something.** The base declared it "for prop parity" and
 *    dropped it on the floor, so `size="sm"` was silently `md` on web and `sm`
 *    on native — the same call, two chips.
 * 5. **`note` gives the neutral explanation a home.** Logging that a child
 *    interrupted without room to say why is how a log becomes a tally.
 * 6. **A press is the M3 state layer and clears 44.** It was
 *    `hover:opacity-70` — the band M3 spends on *disabled* — on a chip-sized
 *    target, in a module whose users are children.
 */
exports.BehaviorBadgeV4 = React.forwardRef(function BehaviorBadgeV4({ label, tone = 'neutral', points, icon, size = 'md', note, toneLabels, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    if (!label)
        return null;
    const glyph = icon ?? TONE_GLYPH[tone];
    const word = toneLabels?.[tone] ?? TONE_LABEL[tone];
    const pointsText = typeof points === 'number' && Number.isFinite(points)
        ? `${TONE_SIGN[tone]}${Math.abs(points)}`
        : undefined;
    const name = (0, tone_v4_1.spokenLine)([word, label, pointsText, note]);
    const chip = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: size, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph }), (0, jsx_runtime_1.jsx)("span", { children: label }), pointsText ? (0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: pointsText }) : null] }), note ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: note }) : null] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("span", { ...rest, ref: ref, "data-xen-behavior-badge": "", role: "group", "aria-label": name, className: (0, cn_1.cn)('inline-flex flex-col items-start gap-xs', className), children: chip }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ...rest, ref: ref, type: "button", "data-xen-behavior-badge": "", "aria-label": name, onClick: () => onClick(), "data-xen-v4-state": "", style: (0, tone_v4_1.surfaceStateVars)(), className: (0, cn_1.cn)('inline-flex flex-col items-start justify-center gap-xs rounded-[var(--xen-radius-md)]', chrome_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS, className), children: chip }));
});
//# sourceMappingURL=BehaviorBadgeV4.js.map
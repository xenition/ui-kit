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
exports.MatchCelebrationV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const profile_v4_1 = require("./internal/profile-v4");
/**
 * The two celebrations, told apart by more than their copy.
 *
 * `variant="superlike"` changed the headline and the sentence and nothing
 * else, so the one moment the product is trying to make feel different looked
 * identical. It is `accent` throughout — the mark between the avatars, the
 * halo around them and the headline — and the mark itself is a star rather
 * than a heart, so the difference survives a greyscale screenshot.
 */
const VARIANT = {
    match: { tone: 'primary', glyph: '♥', fill: 'bg-primary text-on-primary' },
    superlike: { tone: 'accent', glyph: '★', fill: 'bg-accent text-on-accent' },
};
const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';
/**
 * **V4 match celebration** — the web twin of the native `MatchCelebrationV4`,
 * same props as {@link MatchCelebration} plus `closeLabel`.
 *
 * ## Five changes
 *
 * 1. **It can be dismissed.** The Escape handler sat on the backdrop `<div>` —
 *    a `<div>` with no `tabIndex`, which therefore never held focus, in a
 *    modal that autofocused nothing. A React `onKeyDown` only fires for keys
 *    pressed inside the subtree, so Escape reached the handler on exactly zero
 *    presses. The listener is on the document, focus moves into the dialog when
 *    it opens and back to whatever opened it when it closes, and Tab is
 *    trapped — a full-screen overlay that leaves focus behind it lets a
 *    keyboard user tab silently through a page they cannot see.
 * 2. **There is a close control.** The two buttons were "send a message" and
 *    "keep swiping", so a user with neither intention had only the backdrop —
 *    and the native twin's backdrop is not pressable at all, which is why this
 *    prop exists on both twins.
 * 3. **The backdrop stops inverting.** `bg-neutral-900` is a ramp step, and the
 *    web ramp *mirrors* under `[data-theme="dark"]`: the scrim over a dark page
 *    was drawn in the near-white step. A scrim is dark in both schemes by
 *    definition, so it is `PHOTO_SCRIM_STRONG`, which is fixed.
 * 4. **The headline is a heading**, and it names the dialog — the base labelled
 *    the dialog with the headline and the sentence glued together and left the
 *    headline itself a `<p>`, so the copy was read twice and the overlay had no
 *    structure to navigate by.
 * 5. **`superlike` looks like something.** See {@link VARIANT}. The heart
 *    between the avatars also stops being `danger`: a match is the best thing
 *    that happens in the product, drawn in the error slot.
 */
exports.MatchCelebrationV4 = React.forwardRef(function MatchCelebrationV4({ visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping', closeLabel = 'Close', }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const headingId = React.useId();
    const dialogRef = React.useRef(null);
    const restoreRef = React.useRef(null);
    // The handler is read through a ref so the key listener subscribes once per
    // opening rather than on every render a parent happens to trigger.
    const closeRef = React.useRef(onClose);
    closeRef.current = onClose;
    React.useEffect(() => {
        if (!visible || typeof document === 'undefined')
            return undefined;
        restoreRef.current = document.activeElement;
        const dialog = dialogRef.current;
        const first = dialog?.querySelectorAll(FOCUSABLE);
        (first && first.length ? first[0] : dialog)?.focus();
        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeRef.current?.();
                return;
            }
            if (event.key !== 'Tab')
                return;
            const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE);
            if (!nodes || nodes.length === 0)
                return;
            const items = Array.from(nodes);
            const head = items[0];
            const tail = items[items.length - 1];
            if (event.shiftKey && document.activeElement === head) {
                event.preventDefault();
                tail.focus();
            }
            else if (!event.shiftKey && document.activeElement === tail) {
                event.preventDefault();
                head.focus();
            }
        };
        document.addEventListener('keydown', onKeyDown, true);
        return () => {
            document.removeEventListener('keydown', onKeyDown, true);
            restoreRef.current?.focus?.();
        };
    }, [visible]);
    const setRefs = (node) => {
        dialogRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    };
    if (!visible)
        return null;
    const skin = VARIANT[variant];
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle = variant === 'superlike'
        ? `You super liked ${match.name}.`
        : `You and ${match.name} liked each other.`;
    return ((0, jsx_runtime_1.jsx)("div", { 
        // `mousedown` and not `click`: a click that STARTED inside the dialog
        // and ended on the backdrop — a drag off the edge of a button — is not
        // a dismissal, and `onClick` cannot tell the two apart.
        onMouseDown: (event) => {
            if (event.target === event.currentTarget)
                onClose?.();
        }, style: { backgroundColor: profile_v4_1.PHOTO_SCRIM_STRONG }, className: "fixed inset-0 z-50 flex items-center justify-center p-xl", children: (0, jsx_runtime_1.jsxs)("div", { ref: setRefs, role: "dialog", "aria-modal": "true", "aria-labelledby": headingId, tabIndex: -1, className: "relative flex w-full max-w-sm flex-col items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-xl", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": closeLabel, onClick: () => onClose?.(), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('absolute right-sm top-sm inline-flex items-center justify-center rounded-full text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', nav_v4_1.MIN_TAP_SQUARE_CLASS), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "lg" }) }), (0, jsx_runtime_1.jsx)("h2", { id: headingId, className: (0, cn_1.cn)('font-heading text-2xl font-bold', profile_v4_1.TONE_INK[skin.tone]), children: heading }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [you ? (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: you.photoUri, name: you.name, alt: "", size: "lg", ring: true }) : null, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-sm))] items-center justify-center rounded-full text-lg', skin.fill), children: skin.glyph }), (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: match.photoUri, name: match.name, alt: "", size: "lg", ring: true })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-center text-sm text-muted-text", children: subtitle }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-xs flex w-full flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onClick: () => onMessage?.(), children: messageLabel }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", onClick: () => (onKeepSwiping ?? onClose)?.(), children: keepSwipingLabel })] })] }) }));
});
//# sourceMappingURL=MatchCelebrationV4.js.map
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
exports.CivicAlertV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const civic_v4_1 = require("./internal/civic-v4");
/**
 * Severity → word, glyph, tone and border.
 *
 * Four severities and only three tones, because the base already folds the
 * native `accent` advisory into `primary` on web; keeping that fold here means
 * an advisory does not quietly become a second kind of warning.
 */
const SEVERITY_V4 = {
    info: { label: 'Information', glyph: 'ℹ️', tone: 'primary', border: 'border-primary' },
    advisory: { label: 'Advisory', glyph: '📢', tone: 'primary', border: 'border-primary' },
    warning: { label: 'Warning', glyph: '⚠️', tone: 'warn', border: 'border-warn' },
    emergency: { label: 'Emergency', glyph: '🚨', tone: 'danger', border: 'border-danger' },
};
/** The two severities that are allowed to interrupt whatever is being read. */
const URGENT = ['warning', 'emergency'];
/**
 * **V4 civic alert** — the web twin of the native `CivicAlertV4`, same props as
 * {@link CivicAlert} plus `severityLabels` and `confirmDismissLabel`.
 *
 * ## Four changes
 *
 * 1. **It actually announces.** The base put `role="alert"` on the banner
 *    itself — content present at first paint. A live region announces
 *    *changes*, so a banner that is already in the tree when the region is
 *    created is read out by nobody, and the ordinary case is the only case an
 *    emergency banner has. V4 keeps a live region whose text arrives one commit
 *    after mount, and reserves `assertive` for `warning` and `emergency`:
 *    announcing everything teaches a user to ignore everything.
 * 2. **The message is inside the name.** `aria-label={`${severity}: ${title}`}`
 *    on the container replaced its own subtree, so the field carrying "evacuate
 *    via Route 9" — the sentence the alert exists for — never reached a reader.
 *    The container no longer names itself; the announcement carries severity,
 *    title, message, source and time in that order.
 * 3. **Dismissing an emergency takes a second press.** One tap removed the
 *    banner irreversibly and the component offers no way to restore it. The
 *    control arms first, renames itself, and disarms on blur.
 * 4. **Dismiss is a target.** It was a bare 14×20 glyph with no padding at all —
 *    the smallest control in the module, on the component people tap while
 *    moving. It clears 44, answers with a state layer rather than a fade, and
 *    the eyebrow takes the contrast-corrected ink instead of the `primary` /
 *    `warn` / `danger` **fill** used as words on a tint of itself.
 */
exports.CivicAlertV4 = React.forwardRef(function CivicAlertV4({ severity, title, message, source, time, actionLabel = 'View details', onAction, onDismiss, severityLabels, confirmDismissLabel = 'Confirm dismiss', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [armed, setArmed] = React.useState(false);
    const sd = SEVERITY_V4[severity] ?? SEVERITY_V4.info;
    const word = severityLabels?.[severity] ?? sd.label;
    const urgent = URGENT.includes(severity);
    const meta = (0, tone_v4_1.metaLine)([source, time]);
    const announcement = (0, civic_v4_1.spokenLine)([word, title, message, source, time]);
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
        setAnnounced(announcement);
    }, [announcement]);
    const dismissWord = armed ? confirmDismissLabel : 'Dismiss alert';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-start gap-md rounded-[var(--xen-radius-md)] border p-md', sd.border, className), style: { background: (0, civic_v4_1.tintGround)(sd.tone) }, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { role: urgent ? 'alert' : 'status', "aria-live": urgent ? 'assertive' : 'polite', className: "sr-only", children: announced }), (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sd.glyph, size: "xl", "aria-hidden": true, className: (0, civic_v4_1.tintInkClass)(sd.tone) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs font-bold uppercase', (0, civic_v4_1.tintInkClass)(sd.tone)), children: word }), (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), message != null ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: message }) : null, meta !== '' ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: meta }) : null, onAction != null ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-sm", children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: severity === 'emergency' ? 'danger' : 'primary', onClick: onAction, children: actionLabel }) })) : null] }), onDismiss != null ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": dismissWord, onClick: () => {
                    // An emergency alert has no undo, so the first press only arms.
                    if (!armed) {
                        setArmed(true);
                        return;
                    }
                    setArmed(false);
                    onDismiss();
                }, 
                // Walking away from an armed dismiss disarms it.
                onBlur: () => setArmed(false), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center gap-xs rounded-[var(--xen-radius-md)] px-sm', chrome_v4_1.MIN_TAP_CLASS, 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-muted-text", children: armed ? '?' : '✕' }), armed ? (
                    // The word changes with the state, so the confirm is not carried
                    // by a glyph swap alone.
                    (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-on-surface", children: confirmDismissLabel })) : null] })) : null] }));
});
//# sourceMappingURL=CivicAlertV4.js.map
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
exports.MailSwipeActionsV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const mail_v4_1 = require("./internal/mail-v4");
/** The rail's panel width — `2xl + 2xl` at the kit's scale, not a typed 72. */
const PANEL_WIDTH = 'min-w-[calc(var(--xen-space-2xl)_+_var(--xen-space-2xl))]';
/**
 * **V4 mail swipe rail** — same props as {@link MailSwipeActions} plus
 * `destructiveIds`, `confirmLabel` and `toolbarLabel`.
 *
 * ## Four changes
 *
 * 1. **Delete asks first.** A single tap on the rail destroyed a message with
 *    no confirmation, no undo, and no prop through which a caller could
 *    express either — on a control that is revealed by a *gesture*, so the tap
 *    that reveals it and the tap that deletes are the same motion a few pixels
 *    apart. An action listed in `destructiveIds` arms on the first press,
 *    renames itself through `confirmLabel` so the change is announced, and
 *    fires on the second.
 * 2. **Tab order follows the eye.** `side="trailing"` reversed the *paint*
 *    with `flex-row-reverse` and left the DOM alone, so on a rail whose last
 *    action is typically Delete, the first thing a keyboard reached was the
 *    rightmost panel. The trailing rail now reverses the list itself and lays
 *    out forwards: same picture, and the order a reader walks is the order a
 *    user sees.
 * 3. **The glyph and its word are the same colour.** A `neutral` panel drew an
 *    `onSurface` glyph over a `text-surface` label on a `muted` fill — three
 *    slots, none of them paired with the fill underneath. Both now take the
 *    tone's guaranteed pair.
 * 4. **The rail has a name, clears 44 and answers with a state layer**, rather
 *    than dimming itself at the band that means disabled.
 */
exports.MailSwipeActionsV4 = React.forwardRef(function MailSwipeActionsV4({ actions, side = 'trailing', destructiveIds, confirmLabel = (value) => `Confirm ${value}`, toolbarLabel = 'Message actions', className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [armedId, setArmedId] = React.useState(null);
    const safe = actions ?? [];
    if (safe.length === 0)
        return null;
    // The trailing rail paints right-to-left. Reversing the LIST rather than
    // the flex direction keeps the picture and fixes the tab order.
    const ordered = side === 'leading' ? safe : [...safe].reverse();
    const destructive = new Set(destructiveIds ?? []);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "toolbar", "aria-label": toolbarLabel, "aria-orientation": "horizontal", className: (0, cn_1.cn)('flex items-stretch', className), children: ordered.map((action) => {
            const tone = action.tone ?? 'neutral';
            const armed = armedId === action.id;
            const needsConfirm = destructive.has(action.id);
            const name = armed ? confirmLabel(action.label) : action.label;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": name, onClick: () => {
                    if (needsConfirm && !armed) {
                        setArmedId(action.id);
                        return;
                    }
                    setArmedId(null);
                    action.onClick?.();
                }, 
                // Walking away from an armed action disarms it, so a rail left
                // open does not sit one stray tap from deleting a message.
                onBlur: () => setArmedId((current) => (current === action.id ? null : current)), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(tone_v4_1.TONE_VAR[tone], 'currentColor'), className: (0, cn_1.cn)('flex flex-col items-center justify-center gap-xs px-md py-md', PANEL_WIDTH, chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', tone_v4_1.TONE_BG[tone], mail_v4_1.TONE_ON[tone]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg leading-none", children: armed ? '?' : action.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-semibold", children: name })] }, action.id));
        }) }));
});
//# sourceMappingURL=MailSwipeActionsV4.js.map
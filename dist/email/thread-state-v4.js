"use strict";
/**
 * Thread expansion state — **pure, and shared by both twins**, the way
 * `calendar/layout-v4.ts` and `booking/schedule-v4.ts` are. The native twin
 * imports it as `../../email/thread-state-v4`.
 *
 * Nothing here is exported from the package.
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
exports.useThreadExpansion = useThreadExpansion;
exports.canSendMail = canSendMail;
const React = __importStar(require("react"));
/**
 * The fix for the module's worst defect.
 *
 * `EmailThread` computed `const expanded = new Set(expandedIds ?? [lastId])`
 * fresh on every render and held **no state at all** — while `expandedIds` is
 * an *optional* prop. Mounted the way the module's own barrel doc describes
 * it (`<EmailThread subject messages />`), every header click fired
 * `onToggleMessage` into a callback nobody was listening to: the newest
 * message stayed open, every earlier one stayed a clipped one-line snippet,
 * and `aria-expanded` never flipped. A user tapped the third reply, saw
 * nothing happen, tapped again, and concluded the app was broken.
 *
 * V4 keeps the controlled path exactly as it was — pass `expandedIds` and you
 * own the state — and gives the **uncontrolled** path somewhere to put it.
 *
 * @param expandedIds  The controlled set, or `undefined` to self-manage.
 * @param initialOpenId  Which message starts open when uncontrolled. The base
 *   opened the last message, so that stays the default.
 */
function useThreadExpansion(expandedIds, initialOpenId) {
    const controlled = expandedIds != null;
    const [own, setOwn] = React.useState(() => initialOpenId ? [initialOpenId] : []);
    // The uncontrolled default follows the thread: opening a different
    // conversation should open *its* newest message, not keep the old one's id.
    const lastSeeded = React.useRef(initialOpenId);
    if (!controlled && lastSeeded.current !== initialOpenId) {
        lastSeeded.current = initialOpenId;
    }
    const active = controlled ? expandedIds : own;
    const set = React.useMemo(() => new Set(active), [active]);
    const toggle = React.useCallback((id) => {
        if (controlled)
            return;
        setOwn((current) => current.includes(id) ? current.filter((one) => one !== id) : [...current, id]);
    }, [controlled]);
    return {
        isOpen: (id) => set.has(id),
        toggle,
        controlled,
    };
}
/**
 * Whether a compose bar may send.
 *
 * The base tested the body and the attachments and **never tested the
 * recipient**, so one character of body — or a single staged file — enabled
 * Send with an empty `to`, and `onSend({ to: '', … })` fired.
 *
 * `to` carries two meanings in this component, which is why the check is not
 * simply `!to`. `ComposeBar` renders its recipient field only when `to !==
 * undefined`, so:
 *
 * - **`undefined`** — there is no recipient field. This is a reply bar, where
 *   the thread already knows who it is going to. Nothing to require.
 * - **`''`** — there *is* a field and it is empty. This is the defect: the
 *   base sent anyway.
 *
 * Requiring a recipient in the first case would stop every reply bar in the
 * kit from sending at all — a wider break than the bug being fixed.
 */
function canSendMail(options) {
    const { to, body, hasAttachments, disabled, sending } = options;
    if (disabled || sending)
        return false;
    if (to !== undefined && to.trim().length === 0)
        return false;
    return (body?.trim().length ?? 0) > 0 || hasAttachments === true;
}
//# sourceMappingURL=thread-state-v4.js.map
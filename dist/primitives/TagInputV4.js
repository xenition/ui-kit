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
exports.TagInputV4 = TagInputV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const v4_state_1 = require("./internal/v4-state");
const cn_1 = require("./cn");
const picker_v4_1 = require("./internal/picker-v4");
/**
 * The wrapper's own class list.
 *
 * It mirrors `FIELD_CLASS`'s metrics — the same minimum height, padding scale
 * and `md` radius `InputV4` uses — but sets its own flex directives, because a
 * tag field wraps to as many rows as the tags need and `cn()` is a plain join
 * with no conflict resolution.
 */
const WRAP_CLASS = [
    'flex w-full flex-wrap items-center gap-xs bg-surface text-on-surface',
    'min-h-[var(--xen-space-2xl)] px-md py-xs text-base',
    'border rounded-[var(--xen-radius-md)]',
].join(' ');
/**
 * **V4 tag input** — the web twin of `TagInputV4`, the same props as
 * {@link TagInput}, a different design line.
 *
 * ## The duplicate was the bug
 *
 * Type a tag you already have and the base clears the field and does nothing
 * else. From the outside that is indistinguishable from the app dropping your
 * input: you typed something, it vanished, no tag appeared. §38 is explicit
 * that an error state has to help you recover, and the recovery here is simply
 * being told what happened.
 *
 * So V4 **keeps what you typed** and says `“React” is already added` under the
 * field, in a polite live region. Nothing is lost, the reason is on screen, and
 * the message clears itself the moment you change the text. `dedupe={false}`
 * still turns the whole rule off.
 *
 * ## The remove ✕ was the other one
 *
 * A chip's ✕ is necessarily small — it lives inside a 32px chip — and the base
 * gives it no padding at all, so roughly a 16px target sitting next to other
 * chips' ✕s. `data-xen-v4-hit` centres an invisible `--xen-space-2xl`
 * pseudo-element on it: out of flow, costing no layout, the web's `hitSlop`.
 *
 * ## The rest
 *
 * The wrapper wears `InputV4`'s metrics and the same `box-shadow` halo, armed
 * on `:focus-within`. Chips are `accent`/`on-accent`, a pair the compiler
 * contrast-checks, at `text-sm` rather than `text-xs`: a tag is a thing you
 * have to be able to read, not a decoration.
 */
function TagInputV4({ value = [], onChange, placeholder = 'Add a tag…', dedupe = true, invalid = false, disabled = false, accessibilityLabel = 'Add a tag', className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-picker-styles', picker_v4_1.PICKER_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [draft, setDraft] = React.useState('');
    // What went wrong last time, in words. Cleared by the next keystroke.
    const [notice, setNotice] = React.useState(null);
    const noticeId = React.useId();
    const add = () => {
        const t = draft.trim();
        if (!t)
            return;
        if (dedupe && value.some((v) => v.toLowerCase() === t.toLowerCase())) {
            // The draft is NOT cleared: losing what someone typed to tell them
            // nothing is the failure §38 is about.
            setNotice(`“${t}” is already added`);
            return;
        }
        onChange?.([...value, t]);
        setDraft('');
        setNotice(null);
    };
    const removeAt = (index) => {
        onChange?.(value.filter((_, i) => i !== index));
        setNotice(null);
    };
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            add();
        }
        else if (e.key === 'Backspace' && draft.length === 0 && value.length > 0) {
            removeAt(value.length - 1);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('grid gap-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-field": invalid ? 'invalid' : '', className: (0, cn_1.cn)(WRAP_CLASS, disabled && 'pointer-events-none opacity-[0.38]'), style: {
                    '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
                }, children: [value.map((tag, i) => ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex items-center gap-xs rounded-[var(--xen-radius-full)] px-sm', 'h-[var(--xen-space-xl)] bg-accent text-sm text-on-accent'), children: [tag, (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove ${tag}`, disabled: disabled, onClick: () => removeAt(i), "data-xen-v4-hit": "", "data-xen-v4-state": "", className: "rounded-[var(--xen-radius-full)] text-xs text-on-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-accent", children: "\u2715" })] }, `${tag}-${i}`))), (0, jsx_runtime_1.jsx)("input", { "aria-label": accessibilityLabel, "aria-invalid": invalid || undefined, "aria-describedby": notice !== null ? noticeId : undefined, value: draft, disabled: disabled, onChange: (e) => {
                            setDraft(e.target.value);
                            setNotice(null);
                        }, onKeyDown: onKeyDown, placeholder: value.length === 0 ? placeholder : '', className: (0, cn_1.cn)('h-[var(--xen-space-xl)] min-w-[var(--xen-space-2xl)] flex-grow', 'bg-transparent text-base text-on-surface placeholder:text-muted-text focus:outline-none') })] }), notice !== null ? ((0, jsx_runtime_1.jsx)("p", { id: noticeId, role: "status", className: "text-sm text-muted-text", children: notice })) : null] }));
}
//# sourceMappingURL=TagInputV4.js.map
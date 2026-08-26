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
exports.PinInputV4 = PinInputV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const field_v4_1 = require("./internal/field-v4");
/**
 * **V4 PIN / OTP entry** — the same props as {@link PinInput}, a different
 * design line.
 *
 * A one-time code is the most time-critical field in any product: it is read
 * off another screen while a timer runs. So the changes are about getting
 * through it, not about how it looks:
 *
 * 1. **The code can be pasted whole.** The base takes one character per box, so
 *    pasting six from a message filled one and dropped five. V4 intercepts the
 *    paste, spreads it across the remaining boxes and lands the caret at the
 *    end; the first box carries `autoComplete="one-time-code"`, so the browser
 *    can offer the code from the SMS itself — §4, optimize for time to value,
 *    and §32, recognition over recall.
 * 2. **Boxes at the form's own height.** Each is `2xl` tall — the height every
 *    other V4 control takes — and `2xl − sm` wide, so a row of six still fits a
 *    narrow screen while each box stays a real target (§30).
 * 3. **A ring that shows where you are.** Each box takes the shared V4 halo, and
 *    a box that already holds a digit keeps a brand border, so the row shows
 *    its own progress. The ring is a `box-shadow`, so advancing between boxes
 *    costs no layout (§36.11).
 *
 * The figures are `tabular-nums` and centred, so a `1` sits where an `8` sits
 * and the row does not twitch as it fills. Focusing a box selects what is in
 * it, so typing over a digit replaces it rather than fighting the caret.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and this
 * is the most minimal form there is.
 */
function PinInputV4({ length = 6, value, onChange, className, }) {
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    const refs = React.useRef([]);
    const chars = Array.from({ length }, (_, i) => value[i] ?? '');
    const emit = (next) => onChange(next.join(''));
    const setChar = (index, char) => {
        const next = chars.slice();
        next[index] = char.slice(-1);
        emit(next);
        if (char && index < length - 1)
            refs.current[index + 1]?.focus();
    };
    /** Spread a pasted code forward from this box instead of dropping all but one. */
    const paste = (index, event) => {
        const text = event.clipboardData.getData('text').replace(/\s/g, '');
        if (text.length <= 1)
            return;
        event.preventDefault();
        const next = chars.slice();
        let cursor = index;
        for (const char of text) {
            if (cursor >= length)
                break;
            next[cursor] = char;
            cursor += 1;
        }
        emit(next);
        refs.current[Math.min(cursor, length - 1)]?.focus();
    };
    const onKeyDown = (index, event) => {
        if (event.key === 'Backspace' && !chars[index] && index > 0)
            refs.current[index - 1]?.focus();
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex gap-sm', className), children: chars.map((char, index) => ((0, jsx_runtime_1.jsx)("input", { ref: (el) => {
                refs.current[index] = el;
            }, "data-xen-v4-field": "", inputMode: "numeric", 
            // Only the first box asks for the code: the browser fills the rest
            // from it, and six boxes all claiming the same autofill is a fight.
            autoComplete: index === 0 ? 'one-time-code' : 'off', maxLength: 1, value: char, onChange: (e) => setChar(index, e.target.value), onPaste: (e) => paste(index, e), onFocus: (e) => e.target.select(), onKeyDown: (e) => onKeyDown(index, e), className: (0, cn_1.cn)('h-[var(--xen-space-2xl)] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-sm))]', 'rounded-[var(--xen-radius-md)] border bg-surface', 'text-center text-lg tabular-nums text-on-surface', 
            // A filled box keeps the brand edge, so the row shows its progress.
            char ? 'border-primary' : 'border-border'), style: (0, field_v4_1.fieldRingVars)(false) }, index))) }));
}
//# sourceMappingURL=PinInputV4.js.map
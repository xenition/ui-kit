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
exports.SearchInputV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const v4_state_1 = require("./internal/v4-state");
const cn_1 = require("./cn");
const picker_v4_1 = require("./internal/picker-v4");
/**
 * **V4 search field** — the web twin of `SearchInputV4`, the same props as
 * {@link SearchInput}, a different design line.
 *
 * ## It looks like the other fields, and that is the point
 *
 * The base is a pill: `rounded-[var(--xen-radius-full)]`, `py-sm`. A pill is a
 * perfectly good search affordance on a toolbar — but a search field is most
 * often a field in a form, sitting under a label and above two `InputV4`s, and
 * there it reads as a foreign object. §16 asks for forms that are minimal, and
 * a form built from three different field shapes is not minimal however few
 * questions it asks.
 *
 * So V4 takes `InputV4`'s treatment exactly: the same `--xen-space-2xl` minimum
 * height, the same `md` radius, and the same `box-shadow` halo — armed here on
 * `:focus-within`, since the ring belongs to the row and the caret is in the
 * `<input>` inside it. The leading ⌕ is what says "search"; the shape does not
 * have to.
 *
 * ## The clear button is the fix nobody sees
 *
 * The base's ✕ is a bare glyph with no padding at all — a ~16px target inside a
 * field, next to the text you are trying to select. Miss it and you put the
 * caret somewhere instead. Here it keeps its drawn size (a 48px ✕ inside a 48px
 * field would be absurd) and gains an invisible `--xen-space-2xl` target
 * through `data-xen-v4-hit`, a centred pseudo-element that is out of flow and
 * costs no layout. It is the web's `hitSlop`.
 *
 * It is announced as "Clear search" and only exists when there is something to
 * clear, so the row never carries a dead affordance.
 */
exports.SearchInputV4 = React.forwardRef(function SearchInputV4({ value = '', onChangeText, onClear, placeholder = 'Search…', invalid = false, disabled = false, accessibilityLabel = 'Search', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-picker-styles', picker_v4_1.PICKER_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const clear = () => {
        onChangeText?.('');
        onClear?.();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-field": invalid ? 'invalid' : '', className: (0, cn_1.cn)(picker_v4_1.FIELD_CLASS, disabled && 'pointer-events-none opacity-[0.38]', className), style: {
            '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
        }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base text-muted-text", children: "\u2315" }), (0, jsx_runtime_1.jsx)("input", { ref: ref, type: "search", "aria-label": accessibilityLabel, "aria-invalid": invalid || undefined, value: value, disabled: disabled, placeholder: placeholder, onChange: (e) => onChangeText?.(e.target.value), className: (0, cn_1.cn)('min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted-text', 'focus:outline-none [&::-webkit-search-cancel-button]:appearance-none'), ...rest }), value.length > 0 ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Clear search", disabled: disabled, onClick: clear, "data-xen-v4-hit": "", "data-xen-v4-state": "", className: "shrink-0 rounded-[var(--xen-radius-full)] text-base text-muted-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", children: "\u2715" })) : null] }));
});
//# sourceMappingURL=SearchInputV4.js.map
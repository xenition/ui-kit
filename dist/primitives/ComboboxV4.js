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
exports.ComboboxV4 = ComboboxV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const picker_v4_1 = require("./internal/picker-v4");
const useDismiss_1 = require("./useDismiss");
/**
 * **V4 combobox** — the web twin of `ComboboxV4`, the same props as
 * {@link Combobox}, a different design line.
 *
 * ## The selected option has to be findable
 *
 * The base marks it with `text-primary`. `--xen-primary` is the one brand token
 * with no contrast promise against `--xen-surface` — it is guaranteed against
 * `on-primary` — and `--xen-primary-text` is the slot the compiler derives for
 * exactly this case: brand-coloured text ON a surface. So the selected row uses
 * `text-primary-text`, and it also carries a ✓, because colour alone is never
 * the only cue (§46).
 *
 * ## Everything else is about size, keyboard and honesty
 *
 * 1. **Rows at the tap-target floor.** `--xen-space-2xl`, where the base is
 *    `py-1.5` around `text-sm`: in a filtered list, the row above is a
 *    different answer.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment, with the same
 *    halo armed on `:focus-within`.
 * 3. **A keyboard that works.** The base opens a list you can only click. ↑/↓
 *    move the active option, Enter takes it, Escape closes, and
 *    `aria-activedescendant` names the live row — the `combobox` pattern §31
 *    points at, actually implemented.
 * 4. **An empty state that says something.** "No matches for “x”", quoting the
 *    query back rather than a bare "No matches" (§15, §37).
 * 5. **Hover from a `color-mix`,** never `hover:bg-neutral-100`: the neutral
 *    ramp keeps the light orientation in both schemes, so step 100 flashes
 *    near-white on a dark page.
 *
 * The panel floats on `--xen-elevation-card` with its hairline and takes glass
 * only when the seed asked for `depth: 'glass'`.
 */
function ComboboxV4({ options, value, onChange, placeholder = 'Search…', className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-picker-styles', picker_v4_1.PICKER_V4_CSS);
    const glass = (0, picker_v4_1.useDepth)() === 'glass';
    const [query, setQuery] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState(0);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const listId = React.useId();
    const selected = options.find((o) => o.value === value);
    const trimmed = query.trim();
    const filtered = React.useMemo(() => {
        if (!trimmed)
            return options;
        const q = trimmed.toLowerCase();
        return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, trimmed]);
    // A new query means a new list; the highlight goes back to the top rather
    // than pointing at whatever happens to be in that slot now.
    React.useEffect(() => setActive(0), [trimmed]);
    const choose = (opt) => {
        onChange(opt.value);
        setQuery('');
        setOpen(false);
    };
    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!open) {
                setOpen(true);
                return;
            }
            if (filtered.length === 0)
                return;
            setActive((i) => e.key === 'ArrowDown'
                ? (i + 1) % filtered.length
                : (i - 1 + filtered.length) % filtered.length);
        }
        else if (e.key === 'Enter') {
            const opt = filtered[active];
            if (open && opt) {
                e.preventDefault();
                choose(opt);
            }
        }
        else if (e.key === 'Escape') {
            setOpen(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative w-full', className), children: [(0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-field": "", "data-open": open ? 'true' : undefined, className: picker_v4_1.FIELD_CLASS, children: [(0, jsx_runtime_1.jsx)("input", { role: "combobox", "aria-expanded": open, "aria-controls": open ? listId : undefined, "aria-activedescendant": open && filtered.length > 0 ? `${listId}-${active}` : undefined, "aria-autocomplete": "list", value: open ? query : (selected?.label ?? ''), placeholder: placeholder, autoComplete: "off", onChange: (e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                        }, onFocus: () => setOpen(true), onKeyDown: onKeyDown, className: "min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted-text focus:outline-none" }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base text-muted-text", children: "\u25BE" })] }), open ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-pop": "card", "data-glass": glass ? 'true' : undefined, className: "absolute z-50 mt-xs w-full overflow-hidden", children: filtered.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { role: "status", className: "px-md py-md text-sm text-muted-text", children: trimmed ? `No matches for “${trimmed}”` : 'Nothing to choose from yet' })) : ((0, jsx_runtime_1.jsx)("div", { role: "listbox", id: listId, className: "max-h-[calc(var(--xen-space-2xl)_*_5)] overflow-auto", children: filtered.map((opt, i) => {
                        const isSelected = opt.value === value;
                        return ((0, jsx_runtime_1.jsxs)("div", { id: `${listId}-${i}`, role: "option", "aria-selected": isSelected, "data-xen-v4-hover": "", "data-xen-v4-active": i === active ? 'true' : 'false', onMouseDown: (e) => {
                                e.preventDefault();
                                choose(opt);
                            }, onMouseEnter: () => setActive(i), className: (0, cn_1.cn)('flex min-h-[var(--xen-space-2xl)] cursor-pointer items-center gap-sm px-md', 'text-base', 
                            // `primary-text`, not `primary`: the compiler derives the
                            // former to read ON a surface.
                            isSelected ? 'font-semibold text-primary-text' : 'text-on-surface'), children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate", children: opt.label }), isSelected ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-primary-text", children: "\u2713" })) : null] }, opt.value));
                    }) })) })) : null] }));
}
//# sourceMappingURL=ComboboxV4.js.map
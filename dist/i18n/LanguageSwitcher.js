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
exports.LanguageSwitcher = LanguageSwitcher;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * A small, self-contained language dropdown. It styles itself from the kit's
 * `--xen-*` CSS custom properties, so it automatically matches whatever theme
 * the surrounding template uses — no props required. Drop it into a navbar.
 */
const React = __importStar(require("react"));
const context_1 = require("./context");
function LanguageSwitcher({ className, compact = false, align = 'end', }) {
    const { locale, setLocale, locales, t } = (0, context_1.useT)();
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const rootRef = React.useRef(null);
    const triggerRef = React.useRef(null);
    const listRef = React.useRef(null);
    const current = locales.find((l) => l.code === locale) ?? locales[0];
    // Close on outside click / Escape.
    React.useEffect(() => {
        if (!open)
            return;
        const onDown = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target))
                setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape')
                setOpen(false);
        };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);
    // On open, seed the active option to the current locale and move focus into
    // the listbox so arrow-key navigation works immediately.
    React.useEffect(() => {
        if (!open)
            return;
        const idx = locales.findIndex((l) => l.code === locale);
        setActiveIndex(idx < 0 ? 0 : idx);
        listRef.current?.focus();
    }, [open, locale, locales]);
    const choose = (code) => {
        setLocale(code);
        setOpen(false);
        triggerRef.current?.focus();
    };
    // Roving keyboard control for the listbox (design.md §46 semantic controls):
    // Up/Down move the active option, Enter/Space select, Escape closes.
    const onListKeyDown = (e) => {
        const n = locales.length;
        if (n === 0)
            return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex((i) => (i + 1) % n);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex((i) => (i - 1 + n) % n);
                break;
            case 'Home':
                e.preventDefault();
                setActiveIndex(0);
                break;
            case 'End':
                e.preventDefault();
                setActiveIndex(n - 1);
                break;
            case 'Enter':
            case ' ': {
                e.preventDefault();
                const opt = locales[activeIndex];
                if (opt)
                    choose(opt.code);
                break;
            }
            case 'Escape':
                e.preventDefault();
                setOpen(false);
                triggerRef.current?.focus();
                break;
            default:
                break;
        }
    };
    const activeCode = locales[activeIndex]?.code;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: rootRef, style: { position: 'relative', display: 'inline-block' }, children: [(0, jsx_runtime_1.jsxs)("button", { ref: triggerRef, type: "button", onClick: () => setOpen((v) => !v), "aria-haspopup": "listbox", "aria-expanded": open, "aria-label": t('lang.label'), className: className, style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--xen-space-xs)',
                    padding: 'var(--xen-space-xs) var(--xen-space-sm)',
                    fontSize: 'var(--xen-text-sm)',
                    fontWeight: 500,
                    lineHeight: 1,
                    color: 'var(--xen-on-surface)',
                    background: 'transparent',
                    border: '1px solid var(--xen-border)',
                    borderRadius: 'var(--xen-radius-md)',
                    cursor: 'pointer',
                }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { fontSize: 'var(--xen-text-base)' }, children: current.flag }), !compact && (0, jsx_runtime_1.jsx)("span", { children: current.label }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { opacity: 0.6, fontSize: 'var(--xen-text-xs)' }, children: "\u25BE" })] }), open && ((0, jsx_runtime_1.jsx)("ul", { ref: listRef, role: "listbox", tabIndex: 0, "aria-label": t('lang.label'), "aria-activedescendant": activeCode ? `xen-lang-opt-${activeCode}` : undefined, onKeyDown: onListKeyDown, style: {
                    position: 'absolute',
                    top: 'calc(100% + var(--xen-space-xs))',
                    [align === 'end' ? 'right' : 'left']: 0,
                    zIndex: 50,
                    minWidth: '11rem',
                    maxHeight: '18rem',
                    overflowY: 'auto',
                    margin: 0,
                    padding: 'var(--xen-space-xs)',
                    listStyle: 'none',
                    background: 'var(--xen-surface)',
                    color: 'var(--xen-on-surface)',
                    border: '1px solid var(--xen-border)',
                    borderRadius: 'var(--xen-radius-lg)',
                    outline: 'none',
                    boxShadow: '0 12px 32px -8px var(--xen-border)',
                }, children: locales.map((l, i) => {
                    const selected = l.code === locale;
                    const highlighted = i === activeIndex;
                    return ((0, jsx_runtime_1.jsx)("li", { id: `xen-lang-opt-${l.code}`, role: "option", "aria-selected": selected, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", tabIndex: -1, onClick: () => choose(l.code), onMouseEnter: () => setActiveIndex(i), style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--xen-space-sm)',
                                width: '100%',
                                padding: 'var(--xen-space-sm) var(--xen-space-sm)',
                                fontSize: 'var(--xen-text-sm)',
                                textAlign: 'left',
                                color: 'inherit',
                                background: highlighted || selected ? 'var(--xen-primary-50)' : 'transparent',
                                border: 'none',
                                borderRadius: 'var(--xen-radius-md)',
                                cursor: 'pointer',
                                fontWeight: selected ? 600 : 400,
                            }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { fontSize: 'var(--xen-text-base)' }, children: l.flag }), (0, jsx_runtime_1.jsx)("span", { children: l.label })] }) }, l.code));
                }) }))] }));
}
//# sourceMappingURL=LanguageSwitcher.js.map
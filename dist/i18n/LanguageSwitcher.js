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
    const rootRef = React.useRef(null);
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
    const choose = (code) => {
        setLocale(code);
        setOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: rootRef, style: { position: 'relative', display: 'inline-block' }, children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setOpen((v) => !v), "aria-haspopup": "listbox", "aria-expanded": open, "aria-label": t('lang.label'), className: className, style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.6rem',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    lineHeight: 1,
                    color: 'var(--xen-color-on-surface, currentColor)',
                    background: 'transparent',
                    border: '1px solid var(--xen-color-border, rgba(0,0,0,0.12))',
                    borderRadius: 'var(--xen-radius-md, 0.5rem)',
                    cursor: 'pointer',
                }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { fontSize: '1rem' }, children: current.flag }), !compact && (0, jsx_runtime_1.jsx)("span", { children: current.label }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { opacity: 0.6, fontSize: '0.7rem' }, children: "\u25BE" })] }), open && ((0, jsx_runtime_1.jsx)("ul", { role: "listbox", "aria-label": t('lang.label'), style: {
                    position: 'absolute',
                    top: 'calc(100% + 0.35rem)',
                    [align === 'end' ? 'right' : 'left']: 0,
                    zIndex: 50,
                    minWidth: '11rem',
                    maxHeight: '18rem',
                    overflowY: 'auto',
                    margin: 0,
                    padding: '0.3rem',
                    listStyle: 'none',
                    background: 'var(--xen-color-surface, #fff)',
                    color: 'var(--xen-color-on-surface, #111)',
                    border: '1px solid var(--xen-color-border, rgba(0,0,0,0.12))',
                    borderRadius: 'var(--xen-radius-lg, 0.75rem)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.16)',
                }, children: locales.map((l) => {
                    const active = l.code === locale;
                    return ((0, jsx_runtime_1.jsx)("li", { role: "option", "aria-selected": active, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => choose(l.code), style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.55rem',
                                width: '100%',
                                padding: '0.5rem 0.6rem',
                                fontSize: '0.88rem',
                                textAlign: 'left',
                                color: 'inherit',
                                background: active
                                    ? 'var(--xen-color-primary-50, rgba(0,0,0,0.05))'
                                    : 'transparent',
                                border: 'none',
                                borderRadius: 'var(--xen-radius-md, 0.5rem)',
                                cursor: 'pointer',
                                fontWeight: active ? 600 : 400,
                            }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { fontSize: '1.05rem' }, children: l.flag }), (0, jsx_runtime_1.jsx)("span", { children: l.label })] }) }, l.code));
                }) }))] }));
}
//# sourceMappingURL=LanguageSwitcher.js.map
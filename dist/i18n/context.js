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
exports.XenitionI18nProvider = XenitionI18nProvider;
exports.useT = useT;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * `@xenition/ui/i18n` — a tiny, zero-dependency translation layer for the
 * template SPAs. No i18next, no network: seven languages are bundled at build
 * time and switched at runtime. A template wraps its root in
 * `<XenitionI18nProvider bundle={...}>`, reads strings with `useT().t('key')`,
 * and drops in `<LanguageSwitcher/>`.
 *
 * Resolution for `t(key)`: the template's own bundle wins, then the shared base
 * bundle, each tried in the active locale then English, then the raw key — so a
 * missing translation degrades to English and never to a blank.
 */
const React = __importStar(require("react"));
const base_1 = require("./base");
const locales_1 = require("./locales");
const I18nContext = React.createContext(null);
/** Merge a template bundle over the base bundle, per locale (template keys win). */
function mergeBundles(base, extra) {
    if (!extra)
        return base;
    const out = {};
    const codes = new Set([
        ...Object.keys(base),
        ...Object.keys(extra),
    ]);
    for (const code of codes) {
        out[code] = { ...(base[code] ?? {}), ...(extra[code] ?? {}) };
    }
    return out;
}
function interpolate(template, vars) {
    if (!vars)
        return template;
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (whole, name) => name in vars ? String(vars[name]) : whole);
}
/** First-render locale: persisted choice → browser language → default. SSR-safe. */
function initialLocale(persistKey, fallback) {
    if (typeof window === 'undefined')
        return fallback;
    try {
        const saved = (0, locales_1.coerceLocale)(window.localStorage.getItem(persistKey));
        if (saved)
            return saved;
    }
    catch {
        /* localStorage may be unavailable (private mode) — fall through */
    }
    const nav = typeof navigator !== 'undefined'
        ? (0, locales_1.coerceLocale)(navigator.languages?.[0] ?? navigator.language)
        : null;
    return nav ?? fallback;
}
/**
 * Provides the active locale + `t()` to everything below it. Place once at the
 * app root (inside XenitionUIProvider is fine). Stamps `<html lang>`/`<html dir>`
 * so document language and direction track the choice.
 */
function XenitionI18nProvider({ children, bundle, defaultLocale = locales_1.DEFAULT_LOCALE, persistKey = 'xen-locale', }) {
    const merged = React.useMemo(() => mergeBundles(base_1.baseBundle, bundle), [bundle]);
    const [locale, setLocaleState] = React.useState(() => initialLocale(persistKey, defaultLocale));
    // Keep <html lang>/<html dir> in sync so the browser and assistive tech agree.
    React.useEffect(() => {
        if (typeof document === 'undefined')
            return;
        const { dir } = (0, locales_1.localeMeta)(locale);
        document.documentElement.setAttribute('lang', locale);
        document.documentElement.setAttribute('dir', dir);
    }, [locale]);
    const setLocale = React.useCallback((next) => {
        setLocaleState(next);
        try {
            window.localStorage.setItem(persistKey, next);
        }
        catch {
            /* ignore persistence failure */
        }
    }, [persistKey]);
    const t = React.useCallback((key, vars) => {
        const hit = merged[locale]?.[key] ??
            merged[locales_1.DEFAULT_LOCALE]?.[key] ??
            key;
        return interpolate(hit, vars);
    }, [merged, locale]);
    const value = React.useMemo(() => ({ t, locale, setLocale, dir: (0, locales_1.localeMeta)(locale).dir, locales: locales_1.LOCALES }), [t, locale, setLocale]);
    return (0, jsx_runtime_1.jsx)(I18nContext.Provider, { value: value, children: children });
}
/**
 * Read translation state. Throws if used outside a provider — but templates that
 * want to be robust can use `useT`'s fallback-friendly `t` freely once wrapped.
 */
function useT() {
    const ctx = React.useContext(I18nContext);
    if (!ctx) {
        throw new Error('useT must be used within <XenitionI18nProvider>');
    }
    return ctx;
}
//# sourceMappingURL=context.js.map
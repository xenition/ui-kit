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
import * as React from 'react';
import { baseBundle } from './base';
import {
  DEFAULT_LOCALE,
  LOCALES,
  coerceLocale,
  localeMeta,
  type Locale,
} from './locales';

/** A flat map of translation key → string, for one locale. */
export type Dict = Record<string, string>;
/** A set of dictionaries keyed by locale. English should always be present. */
export type Bundle = Partial<Record<Locale, Dict>>;

export interface I18nContextValue {
  /** Translate a key, interpolating `{{var}}` placeholders from `vars`. */
  t: (key: string, vars?: Record<string, string | number>) => string;
  /** The active locale. */
  locale: Locale;
  /** Switch language (persists to localStorage, updates <html lang/dir>). */
  setLocale: (locale: Locale) => void;
  /** Writing direction of the active locale. */
  dir: 'ltr' | 'rtl';
  /** All supported locales, for building a switcher. */
  locales: typeof LOCALES;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

/** Merge a template bundle over the base bundle, per locale (template keys win). */
function mergeBundles(base: Bundle, extra?: Bundle): Bundle {
  if (!extra) return base;
  const out: Bundle = {};
  const codes = new Set<Locale>([
    ...(Object.keys(base) as Locale[]),
    ...(Object.keys(extra) as Locale[]),
  ]);
  for (const code of codes) {
    out[code] = { ...(base[code] ?? {}), ...(extra[code] ?? {}) };
  }
  return out;
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (whole, name: string) =>
    name in vars ? String(vars[name]) : whole,
  );
}

/** First-render locale: persisted choice → browser language → default. SSR-safe. */
function initialLocale(persistKey: string, fallback: Locale): Locale {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = coerceLocale(window.localStorage.getItem(persistKey));
    if (saved) return saved;
  } catch {
    /* localStorage may be unavailable (private mode) — fall through */
  }
  const nav =
    typeof navigator !== 'undefined'
      ? coerceLocale(navigator.languages?.[0] ?? navigator.language)
      : null;
  return nav ?? fallback;
}

export interface XenitionI18nProviderProps {
  children: React.ReactNode;
  /** Template-specific translations, merged over (and winning against) the shared base. */
  bundle?: Bundle;
  /** Language used before any user choice / detection. Defaults to English. */
  defaultLocale?: Locale;
  /** localStorage key the choice is remembered under. Defaults to `xen-locale`. */
  persistKey?: string;
}

/**
 * Provides the active locale + `t()` to everything below it. Place once at the
 * app root (inside XenitionUIProvider is fine). Stamps `<html lang>`/`<html dir>`
 * so document language and direction track the choice.
 */
export function XenitionI18nProvider({
  children,
  bundle,
  defaultLocale = DEFAULT_LOCALE,
  persistKey = 'xen-locale',
}: XenitionI18nProviderProps): React.ReactElement {
  const merged = React.useMemo(() => mergeBundles(baseBundle, bundle), [bundle]);
  const [locale, setLocaleState] = React.useState<Locale>(() =>
    initialLocale(persistKey, defaultLocale),
  );

  // Keep <html lang>/<html dir> in sync so the browser and assistive tech agree.
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const { dir } = localeMeta(locale);
    document.documentElement.setAttribute('lang', locale);
    document.documentElement.setAttribute('dir', dir);
  }, [locale]);

  const setLocale = React.useCallback(
    (next: Locale) => {
      setLocaleState(next);
      try {
        window.localStorage.setItem(persistKey, next);
      } catch {
        /* ignore persistence failure */
      }
    },
    [persistKey],
  );

  const t = React.useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const hit =
        merged[locale]?.[key] ??
        merged[DEFAULT_LOCALE]?.[key] ??
        key;
      return interpolate(hit, vars);
    },
    [merged, locale],
  );

  const value = React.useMemo<I18nContextValue>(
    () => ({ t, locale, setLocale, dir: localeMeta(locale).dir, locales: LOCALES }),
    [t, locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Read translation state. Throws if used outside a provider — but templates that
 * want to be robust can use `useT`'s fallback-friendly `t` freely once wrapped.
 */
export function useT(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) {
    throw new Error('useT must be used within <XenitionI18nProvider>');
  }
  return ctx;
}

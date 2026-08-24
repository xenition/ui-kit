/**
 * The languages `@xenition/ui/i18n` ships. Deliberately a small, curated set —
 * the seven the marketing site prioritises — all left-to-right for now. The
 * `dir` field is carried through the provider so adding a right-to-left
 * language later is a data change, not a code change.
 */

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ja';

export interface LocaleMeta {
  /** BCP-47 code used everywhere (localStorage, <html lang>, the switcher). */
  code: Locale;
  /** The language's own name, shown in the switcher. */
  label: string;
  /** English name, for aria-labels / accessibility. */
  english: string;
  /** Flag emoji for the switcher. */
  flag: string;
  /** Writing direction — stamped on <html dir>. All seven are ltr today. */
  dir: 'ltr' | 'rtl';
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', label: 'English', english: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'es', label: 'Español', english: 'Spanish', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', label: 'Français', english: 'French', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', label: 'Deutsch', english: 'German', flag: '🇩🇪', dir: 'ltr' },
  { code: 'pt', label: 'Português', english: 'Portuguese', flag: '🇧🇷', dir: 'ltr' },
  { code: 'it', label: 'Italiano', english: 'Italian', flag: '🇮🇹', dir: 'ltr' },
  { code: 'ja', label: '日本語', english: 'Japanese', flag: '🇯🇵', dir: 'ltr' },
];

export const LOCALE_CODES: Locale[] = LOCALES.map((l) => l.code);

/** The fallback every lookup ends at, and the language source content is authored in. */
export const DEFAULT_LOCALE: Locale = 'en';

/** Narrow an arbitrary string (localStorage value, navigator.language) to a supported Locale. */
export function coerceLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  const lower = value.toLowerCase();
  // exact, then primary subtag (en-US -> en)
  const exact = LOCALE_CODES.find((c) => c === lower);
  if (exact) return exact;
  const primary = lower.split('-')[0];
  return LOCALE_CODES.find((c) => c === primary) ?? null;
}

export function localeMeta(code: Locale): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0]!;
}

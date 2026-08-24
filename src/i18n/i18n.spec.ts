import { baseBundle, baseKeys } from './base';
import { LOCALE_CODES, coerceLocale } from './locales';
import { localize, pickLocale } from './content';

describe('base dictionary', () => {
  it('every locale mirrors the full English key set', () => {
    const en = new Set(baseKeys);
    for (const code of LOCALE_CODES) {
      const dict = baseBundle[code];
      expect(dict).toBeDefined();
      const keys = new Set(Object.keys(dict!));
      // no missing keys
      for (const k of en) expect(keys.has(k)).toBe(true);
      // no extra keys (keeps the six in lockstep with en)
      expect(keys.size).toBe(en.size);
    }
  });

  it('has translated (non-English) values for a sample key in each locale', () => {
    const enVal = baseBundle.en!['action.addToCart'];
    for (const code of LOCALE_CODES.filter((c) => c !== 'en')) {
      expect(baseBundle[code]!['action.addToCart']).not.toBe(enVal);
    }
  });
});

describe('coerceLocale', () => {
  it('accepts exact and primary-subtag matches, rejects unknown', () => {
    expect(coerceLocale('fr')).toBe('fr');
    expect(coerceLocale('pt-BR')).toBe('pt');
    expect(coerceLocale('en-US')).toBe('en');
    expect(coerceLocale('zz')).toBeNull();
    expect(coerceLocale(null)).toBeNull();
  });
});

describe('content helpers', () => {
  const base = { title: 'Hello', excerpt: 'Hi there' };
  const i18n = { es: { title: 'Hola' }, fr: { title: 'Bonjour', excerpt: 'Salut' } };

  it('pickLocale returns the locale value or English fallback', () => {
    expect(pickLocale(i18n, 'fr')).toEqual({ title: 'Bonjour', excerpt: 'Salut' });
    expect(pickLocale(i18n, 'de', 'es')).toEqual({ title: 'Hola' }); // fallback to es
    expect(pickLocale(undefined, 'fr')).toBeUndefined();
  });

  it('localize overlays partial locale fields, leaving the rest as base', () => {
    expect(localize(base, i18n, 'es')).toEqual({ title: 'Hola', excerpt: 'Hi there' });
    expect(localize(base, i18n, 'fr')).toEqual({ title: 'Bonjour', excerpt: 'Salut' });
    expect(localize(base, i18n, 'ja')).toEqual(base); // no ja override, no fallback hit -> base
  });
});

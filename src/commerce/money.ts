/**
 * Money is always carried as an **integer number of cents** (the catalog /
 * cart / order shapes never use floats), so this is the single home for
 * cents → localized-currency-string formatting. Every commerce component that
 * prints a price funnels through here (and accepts a `formatMoney` override
 * for locale control), so currency rendering is consistent and testable.
 */

/**
 * Format an integer amount of **minor units (cents)** as a localized currency
 * string.
 *
 * ```ts
 * formatMoney(1200)          // "$12.00"
 * formatMoney(1200, 'EUR')   // "€12.00"
 * formatMoney(0)             // "$0.00"
 * formatMoney(123456789)     // "$1,234,567.89"
 * ```
 *
 * @param cents    integer minor units (e.g. `1299` → 12.99)
 * @param currency ISO 4217 code (default `USD`)
 * @param locale   BCP-47 locale (default: the runtime's default locale)
 */
export function formatMoney(cents: number, currency = 'USD', locale?: string): string {
  const amount = (Number.isFinite(cents) ? cents : 0) / 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/** Signature of a `formatMoney`-compatible override accepted by components. */
export type MoneyFormatter = (cents: number, currency?: string) => string;

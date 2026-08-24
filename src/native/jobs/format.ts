/**
 * Tiny pure formatters shared by the native jobs components. No React, no
 * theme, no color — presentation-only string helpers so each component stays
 * focused on layout + tokens.
 */
import type { Salary, SalaryPeriod } from './types';

const PERIOD_SUFFIX: Record<SalaryPeriod, string> = {
  hour: '/hr',
  day: '/day',
  month: '/mo',
  year: '/yr',
};

/** Compact money, e.g. `120000` → `$120k`. Falls back to grouped digits. */
export function formatCompactMoney(amount: number, currency = 'USD'): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  } catch {
    // Unknown currency code, etc. — never throw from a formatter.
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
}

/**
 * Render a salary band as a single label, e.g. `$90k – $120k/yr`. Returns
 * `null` when neither bound is present so callers can show an empty hint.
 */
export function formatSalary(salary?: Salary | null): string | null {
  if (!salary) return null;
  const { min, max, currency = 'USD', period = 'year' } = salary;
  const hasMin = typeof min === 'number';
  const hasMax = typeof max === 'number';
  if (!hasMin && !hasMax) return null;

  const suffix = PERIOD_SUFFIX[period] ?? '';
  if (hasMin && hasMax) {
    return `${formatCompactMoney(min as number, currency)} – ${formatCompactMoney(
      max as number,
      currency
    )}${suffix}`;
  }
  if (hasMin) return `From ${formatCompactMoney(min as number, currency)}${suffix}`;
  return `Up to ${formatCompactMoney(max as number, currency)}${suffix}`;
}

/** Localized short date, e.g. `Jun 15`. Empty string on bad input. */
export function formatShortDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(d);
}

/** Localized `h:mm a` time. Empty string on bad input. */
export function formatTime(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(d);
}

/** Coarse relative age, e.g. `2d ago`, `just now`. Empty on bad input. */
export function formatRelative(iso?: string, now: number = Date.now()): string {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '';
  const secs = Math.max(0, Math.round((now - t) / 1000));
  if (secs < 60) return 'just now';
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

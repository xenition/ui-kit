/**
 * Number-masking helpers shared by the account / card / payment-method
 * components. Pure string utilities — no theme, no float, no side effects.
 */

/** Extract only the digits from an arbitrary account/card string. */
function digitsOf(input: string): string {
  return (input ?? '').replace(/\D+/g, '');
}

/**
 * Last four digits of an account number, prefixed with a bullet — e.g.
 * `"•• 4242"`. Falls back to `"••••"` when fewer than four digits are present.
 */
export function maskAccountNumber(input: string): string {
  const digits = digitsOf(input);
  const last4 = digits.slice(-4);
  return last4.length === 4 ? `•• ${last4}` : '••••';
}

/**
 * A full 16-digit card face masked to `•••• •••• •••• 1234`. Any grouping in
 * the input is ignored; only the trailing four digits are revealed. When the
 * last four are unknown the final group renders as bullets too.
 */
export function maskCardNumber(input: string): string {
  const digits = digitsOf(input);
  const last4 = digits.slice(-4);
  const tail = last4.length === 4 ? last4 : '••••';
  return `•••• •••• •••• ${tail}`;
}

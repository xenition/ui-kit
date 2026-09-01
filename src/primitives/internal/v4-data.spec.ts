import { isNumericColumn, isNumericText } from './v4-data';

describe('isNumericText — the prefix rule', () => {
  /**
   * The regression the showcase found. The old rule allowed any three
   * non-digit characters in front, and three is exactly the width of the
   * commonest order-reference prefix there is: two letters and a hyphen.
   */
  it.each(['SO-4417', 'PO-118', 'A12', 'INV-9', 'Order #A12', '2026-0881', 'ESP-9014-BLK'])(
    'does not read %s as a quantity',
    (text) => {
      expect(isNumericText(text)).toBe(false);
    }
  );

  /**
   * And it rejected money that a real locale actually formats this way, which
   * is the other half of the same mistake.
   */
  it.each(['CHF 1,240', 'USD 30', 'SEK 99', '$1,240.00', '£45.00', '-12', '+12%', '1,240', '98.6°', '12 kg'])(
    'reads %s as a quantity',
    (text) => {
      expect(isNumericText(text)).toBe(true);
    }
  );

  it('keeps a whole column of order references left-aligned', () => {
    expect(isNumericColumn(['SO-4417', 'SO-4418', 'PO-118'])).toBe(false);
    expect(isNumericColumn(['$1,240.00', '$98.00', 'CHF 1,240'])).toBe(true);
    // One stray label still disqualifies the column — a half-aligned column is
    // noise rather than structure.
    expect(isNumericColumn(['$1,240.00', 'Pending'])).toBe(false);
  });
});

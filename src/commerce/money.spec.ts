import { formatMoney } from './money';

describe('formatMoney', () => {
  it('formats cents as USD dollars by default', () => {
    expect(formatMoney(1200)).toBe('$12.00');
    expect(formatMoney(1299)).toBe('$12.99');
    expect(formatMoney(1250)).toBe('$12.50');
  });

  it('formats zero', () => {
    expect(formatMoney(0)).toBe('$0.00');
  });

  it('formats large amounts with grouping', () => {
    expect(formatMoney(123456789)).toBe('$1,234,567.89');
  });

  it('rounds sub-cent floats defensively but keeps integer cents exact', () => {
    expect(formatMoney(5)).toBe('$0.05');
    expect(formatMoney(100)).toBe('$1.00');
  });

  it('supports other currencies via the code', () => {
    // en-US locale renders the symbol; assert on the numeric portion + symbol.
    expect(formatMoney(1200, 'EUR', 'en-US')).toBe('€12.00');
    expect(formatMoney(1200, 'GBP', 'en-US')).toBe('£12.00');
    expect(formatMoney(150000, 'JPY', 'en-US')).toBe('¥1,500');
  });

  it('respects an explicit locale for grouping/symbol placement', () => {
    expect(formatMoney(123456, 'EUR', 'de-DE')).toBe('1.234,56 €');
  });

  it('treats non-finite input as zero rather than throwing', () => {
    expect(formatMoney(Number.NaN)).toBe('$0.00');
  });
});

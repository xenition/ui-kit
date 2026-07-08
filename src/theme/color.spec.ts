import {
  contrastRatio,
  ensureContrast,
  hexToHsl,
  hexToRgb,
  hslToHex,
  isValidHex,
  relativeLuminance,
  rgbToHex,
} from './color';

describe('isValidHex', () => {
  it('accepts #rgb and #rrggbb', () => {
    expect(isValidHex('#fff')).toBe(true);
    expect(isValidHex('#FFF')).toBe(true);
    expect(isValidHex('#7C3AED')).toBe(true);
    expect(isValidHex('#000000')).toBe(true);
  });

  it('rejects malformed values', () => {
    expect(isValidHex('7C3AED')).toBe(false);
    expect(isValidHex('#12345')).toBe(false);
    expect(isValidHex('#GGGGGG')).toBe(false);
    expect(isValidHex('red')).toBe(false);
    expect(isValidHex('')).toBe(false);
    expect(isValidHex(undefined)).toBe(false);
    expect(isValidHex(123 as unknown)).toBe(false);
  });
});

describe('hex ↔ RGB', () => {
  it('parses 6-digit hex', () => {
    expect(hexToRgb('#7C3AED')).toEqual({ r: 124, g: 58, b: 237 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('expands 3-digit hex', () => {
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#f0a')).toEqual({ r: 255, g: 0, b: 170 });
  });

  it('throws a descriptive error on invalid hex', () => {
    expect(() => hexToRgb('nope')).toThrow(/Invalid hex color/);
    expect(() => hexToRgb('#12345')).toThrow(/expected/);
  });

  it('round-trips rgb → hex → rgb exactly', () => {
    const samples = [
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
      { r: 124, g: 58, b: 237 },
      { r: 17, g: 17, b: 17 },
      { r: 255, g: 255, b: 0 },
      { r: 1, g: 128, b: 254 },
    ];
    for (const rgb of samples) {
      expect(hexToRgb(rgbToHex(rgb))).toEqual(rgb);
    }
  });
});

describe('hex ↔ HSL', () => {
  const samples = [
    '#7C3AED',
    '#F59E0B',
    '#FFFF00',
    '#111111',
    '#FFFFFF',
    '#000000',
    '#0EA5E9',
    '#EF4444',
    '#808080',
    '#663399',
  ];

  it('round-trips hex → HSL → hex within ±2 per channel', () => {
    for (const hex of samples) {
      const back = hexToRgb(hslToHex(hexToHsl(hex)));
      const original = hexToRgb(hex);
      expect(Math.abs(back.r - original.r)).toBeLessThanOrEqual(2);
      expect(Math.abs(back.g - original.g)).toBeLessThanOrEqual(2);
      expect(Math.abs(back.b - original.b)).toBeLessThanOrEqual(2);
    }
  });

  it('handles achromatic colors', () => {
    expect(hexToHsl('#000000')).toEqual({ h: 0, s: 0, l: 0 });
    expect(hexToHsl('#ffffff')).toEqual({ h: 0, s: 0, l: 100 });
    const gray = hexToHsl('#808080');
    expect(gray.s).toBe(0);
    expect(gray.l).toBeCloseTo(50.2, 0);
  });

  it('normalizes out-of-range hue', () => {
    expect(hslToHex({ h: 400, s: 100, l: 50 })).toBe(hslToHex({ h: 40, s: 100, l: 50 }));
    expect(hslToHex({ h: -320, s: 100, l: 50 })).toBe(hslToHex({ h: 40, s: 100, l: 50 }));
  });
});

describe('WCAG relative luminance + contrast (reference values)', () => {
  it('luminance of white is 1 and black is 0', () => {
    expect(relativeLuminance('#ffffff')).toBeCloseTo(1, 10);
    expect(relativeLuminance('#000000')).toBeCloseTo(0, 10);
  });

  it('black on white is exactly 21:1', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });

  it('matches known WCAG reference pairs', () => {
    // Pure red on white ≈ 4.0:1
    expect(contrastRatio('#ff0000', '#ffffff')).toBeCloseTo(4.0, 1);
    // #777777 on white ≈ 4.48:1 (the classic "just fails AA" gray)
    expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.48, 2);
    // Same color = 1:1
    expect(contrastRatio('#7C3AED', '#7C3AED')).toBe(1);
  });

  it('is symmetric', () => {
    expect(contrastRatio('#7C3AED', '#F59E0B')).toBeCloseTo(
      contrastRatio('#F59E0B', '#7C3AED'),
      10
    );
  });
});

describe('ensureContrast', () => {
  it('returns the foreground unchanged when it already passes', () => {
    expect(ensureContrast('#ffffff', '#000000')).toBe('#ffffff');
    expect(ensureContrast('#000000', '#ffffff')).toBe('#000000');
  });

  it('adjusts lightness until the pair passes 4.5:1', () => {
    const pairs: Array<[string, string]> = [
      ['#888888', '#7C3AED'],
      ['#cccccc', '#ffffff'],
      ['#333333', '#000000'],
      ['#ff0000', '#ffff00'],
      ['#808080', '#808080'],
    ];
    for (const [fg, bg] of pairs) {
      const adjusted = ensureContrast(fg, bg);
      expect(contrastRatio(adjusted, bg)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('preserves hue and saturation when it adjusts', () => {
    const adjusted = ensureContrast('#9a72e8', '#7C3AED');
    const { h, s } = hexToHsl(adjusted);
    // Purple family, still saturated (small drift allowed from hex rounding).
    expect(Math.abs(h - hexToHsl('#9a72e8').h)).toBeLessThanOrEqual(6);
    expect(s).toBeGreaterThan(30);
  });

  it('terminates with a passing black/white fallback in the worst case', () => {
    // Mid-gray bg is the hardest case; fallback must still clear 4.5.
    const adjusted = ensureContrast('#7b7b7b', '#7b7b7b', 4.5);
    expect(contrastRatio(adjusted, '#7b7b7b')).toBeGreaterThanOrEqual(4.5);
  });
});

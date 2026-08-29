/** @jest-environment jsdom */
/**
 * The named icon set, and the web `Icon` resolving through it. The point of
 * the set is that `close` is `close` everywhere, so the specs guard the two
 * things that would quietly undo it: a name resolving to nothing, and the
 * pre-set behaviour (raw glyphs through `name`) breaking.
 */
import { render } from '@testing-library/react';
import { ICON_GLYPHS, isIconName, resolveIconGlyph, type IconName } from './icon-names';
import { Icon } from './Icon';

describe('icon set', () => {
  it('maps every name to a non-empty glyph and never to its own name', () => {
    const entries = Object.entries(ICON_GLYPHS);
    expect(entries.length).toBeGreaterThan(40);
    for (const [name, glyph] of entries) {
      expect(typeof glyph).toBe('string');
      expect(glyph.length).toBeGreaterThan(0);
      // The bug this set exists to kill: `<Icon name="home" />` rendering "home".
      expect(glyph).not.toBe(name);
    }
  });

  it('covers the names the kit and its apps actually reach for', () => {
    const required: IconName[] = [
      'home',
      'search',
      'add',
      'close',
      'check',
      'chevron-right',
      'back',
      'settings',
      'user',
      'trash',
      'edit',
      'filter',
      'calendar',
      'bell',
      'heart',
      'star',
      'cart',
      'menu',
      'more',
      'warning',
      'info',
      'success',
      'error',
    ];
    required.forEach((name) => expect(isIconName(name)).toBe(true));
  });

  it('resolves a known name and passes an unknown string straight through', () => {
    expect(resolveIconGlyph('check')).toBe('✓');
    // The escape valve that keeps pre-named-set callers working.
    expect(resolveIconGlyph('🫐')).toBe('🫐');
    expect(isIconName('hoome')).toBe(false);
  });

  it('does not inherit Object.prototype keys as icon names', () => {
    expect(isIconName('toString')).toBe(false);
    expect(resolveIconGlyph('constructor')).toBe('constructor');
  });
});

describe('Icon (web) with the named set', () => {
  it('renders the mapped glyph for a name', () => {
    const { getByText } = render(<Icon name="chevron-right" />);
    expect(getByText('›')).toBeTruthy();
  });

  it('still renders a raw string passed as `name`', () => {
    // Typed as IconName, so a raw glyph needs a cast — but the runtime path is
    // the one that matters for apps compiled before the set existed.
    const { getByText } = render(<Icon name={'🥕' as IconName} />);
    expect(getByText('🥕')).toBeTruthy();
  });

  it('lets `glyph` win as the one-off escape hatch', () => {
    const { getByText } = render(<Icon name="home" glyph="🏡" />);
    expect(getByText('🏡')).toBeTruthy();
  });

  it('keeps the token color behaviour for a named icon', () => {
    const { getByText } = render(<Icon name="warning" color="danger" />);
    expect(getByText('⚠').className).toContain('text-danger');
  });
});

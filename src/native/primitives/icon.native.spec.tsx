/**
 * Native `Icon` resolving through the shared named set. Same invariants as the
 * web spec — a name resolves to its glyph, an unknown string falls through,
 * `glyph` wins — plus the native-only bit: `color` still lands on a token.
 */
import * as React from 'react';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { Icon } from './Icon';
import { ICON_GLYPHS, type IconName } from '../../primitives/icon-names';

const allowed = tokenHexSet(SEED_LIGHT);
const LIGHT = toNativeTokens(compileTheme(SEED_LIGHT));

// An `Icon` with no `accessibilityLabel` is decorative — `no-hide-descendants`
// hides it from the a11y tree, and RNTL's queries skip hidden elements by
// default. These specs are about the glyph, so opt them back in.
const HIDDEN = { includeHiddenElements: true } as const;

describe('Icon (native) with the named set', () => {
  it('renders the mapped glyph for a name, not the name', () => {
    const { getByText, queryByText } = renderThemed(<Icon name="home" />, SEED_LIGHT);
    expect(getByText(ICON_GLYPHS.home, HIDDEN)).toBeTruthy();
    expect(queryByText('home', HIDDEN)).toBeNull();
  });

  it('resolves a hyphenated name', () => {
    const { getByText } = renderThemed(<Icon name="chevron-right" />, SEED_LIGHT);
    expect(getByText('›', HIDDEN)).toBeTruthy();
  });

  it('still renders a raw glyph passed through `name` (pre-set callers)', () => {
    const { getByText } = renderThemed(<Icon name={'🥕' as IconName} />, SEED_LIGHT);
    expect(getByText('🥕', HIDDEN)).toBeTruthy();
  });

  it('lets `glyph` win as the one-off escape hatch', () => {
    const { getByText } = renderThemed(<Icon name="home" glyph="🏡" />, SEED_LIGHT);
    expect(getByText('🏡', HIDDEN)).toBeTruthy();
  });

  it('keeps `color: keyof SemanticColors` resolving to a token', () => {
    const { getByText, root } = renderThemed(<Icon name="warning" color="danger" />, SEED_LIGHT);
    const flat = ([] as unknown[])
      .concat(getByText('⚠', HIDDEN).props.style)
      .reduce<Record<string, unknown>>((acc, s) => Object.assign(acc, s as object), {});
    expect(flat.color).toBe(LIGHT.colors.light.danger);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

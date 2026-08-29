import * as React from 'react';
import { Text } from 'react-native';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { LabelV4 } from './LabelV4';

function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

describe('LabelV4 (native)', () => {
  it('announces "required" instead of leaving it to the eye', () => {
    const { getByLabelText } = renderThemed(<LabelV4 required>Email</LabelV4>, SEED_LIGHT);
    // The base label drew a red asterisk and told assistive tech nothing.
    expect(getByLabelText('Email, required')).toBeTruthy();
  });

  it('says nothing extra when the field is optional', () => {
    const { getByText, queryByLabelText } = renderThemed(<LabelV4>Email</LabelV4>, SEED_LIGHT);
    expect(getByText('Email')).toBeTruthy();
    expect(queryByLabelText('Email, required')).toBeNull();
  });

  it('leaves a rich child’s accessible name alone', () => {
    const { queryByLabelText } = renderThemed(
      <LabelV4 required>
        <Text>Email</Text>
      </LabelV4>,
      SEED_LIGHT
    );
    // Only a string child can be folded into a name; anything richer belongs
    // to the caller, and guessing at it would be worse than saying nothing.
    expect(queryByLabelText(/required/)).toBeNull();
  });

  it('marks required with the measured red, in both schemes', () => {
    ([SEED_LIGHT, SEED_DARK] as const).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const theme = compileTheme(seed);
        const { getByText } = renderThemed(<LabelV4 required>Email</LabelV4>, seed, scheme);
        const color = flat(getByText('*').props.style).color as string;
        expect(color).toBe(theme[scheme].dangerText);
        expect(contrastRatio(color, theme[scheme].surface)).toBeGreaterThanOrEqual(4.5);
      });
    });
  });

  it('offsets the marker from the spacing scale, not from a literal', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(<LabelV4 required>Email</LabelV4>, SEED_LIGHT);
    expect(flat(getByText('*').props.style).marginLeft).toBe(theme.spacing.xs / 2);
  });

  it('sets the seed’s body face — native was falling through to the system font', () => {
    const theme = compileTheme(SEED_DARK);
    const { getByText } = renderThemed(<LabelV4>Email</LabelV4>, SEED_DARK);
    const style = flat(getByText('Email').props.style);
    expect(style.fontFamily).toBe(theme.typography.fontBody);
    expect(style.fontSize).toBe(theme.typography.scale.sm);
    // SEED_DARK is a dark-mode seed, so the provider resolves the dark scheme.
    expect(style.color).toBe(theme.dark.onSurface);
  });

  it('lets the caller override through `style` and pass Text props through', () => {
    const { getByText } = renderThemed(
      <LabelV4 style={{ fontWeight: '400' }} numberOfLines={1}>
        Email
      </LabelV4>,
      SEED_LIGHT
    );
    const node = getByText('Email');
    expect(flat(node.props.style).fontWeight).toBe('400');
    expect(node.props.numberOfLines).toBe(1);
  });
});

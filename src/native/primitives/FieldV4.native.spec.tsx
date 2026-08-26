import * as React from 'react';
import { TextInput } from 'react-native';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { FieldV4 } from './FieldV4';

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

describe('FieldV4 (native)', () => {
  it('hands the error down to the control, not just to the eye', () => {
    const { UNSAFE_getByType } = renderThemed(
      <FieldV4 label="Email" error="Enter a work address">
        <TextInput testID="control" />
      </FieldV4>,
      SEED_LIGHT
    );
    // The base field left the message in a sibling Text, so a screen reader
    // landing on the input heard the label and nothing else.
    expect(UNSAFE_getByType(TextInput).props.accessibilityHint).toBe('Enter a work address');
  });

  it('hands the hint down when there is no error', () => {
    const { UNSAFE_getByType } = renderThemed(
      <FieldV4 label="Email" hint="We never share this">
        <TextInput />
      </FieldV4>,
      SEED_LIGHT
    );
    expect(UNSAFE_getByType(TextInput).props.accessibilityHint).toBe('We never share this');
  });

  it('leaves a hint the caller already set alone — §23', () => {
    const { UNSAFE_getByType } = renderThemed(
      <FieldV4 label="Email" error="Bad">
        <TextInput accessibilityHint="Mine" />
      </FieldV4>,
      SEED_LIGHT
    );
    expect(UNSAFE_getByType(TextInput).props.accessibilityHint).toBe('Mine');
  });

  it('adds nothing when there is no message at all', () => {
    const { UNSAFE_getByType } = renderThemed(
      <FieldV4 label="Email">
        <TextInput />
      </FieldV4>,
      SEED_LIGHT
    );
    expect(UNSAFE_getByType(TextInput).props.accessibilityHint).toBeUndefined();
  });

  it('gives the error a shape as well as a hue', () => {
    const { getByText } = renderThemed(
      <FieldV4 label="Email" error="Enter a work address">
        <TextInput />
      </FieldV4>,
      SEED_LIGHT
    );
    // Red alone is invisible to a red-green viewer (§46).
    // Decorative, so it is hidden from assistive tech — the query has to say
    // so, which is itself the assertion that it is hidden.
    expect(getByText(resolveIconGlyph('error'), { includeHiddenElements: true })).toBeTruthy();
  });

  it('measures BOTH messages against the page, in both schemes', () => {
    ([SEED_LIGHT, SEED_DARK] as const).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const surface = compileTheme(seed)[scheme].surface;

        const err = renderThemed(
          <FieldV4 error="Enter a work address">
            <TextInput />
          </FieldV4>,
          seed,
          scheme
        );
        expect(
          contrastRatio(flat(err.getByText('Enter a work address').props.style).color as string, surface)
        ).toBeGreaterThanOrEqual(4.5);

        const hint = renderThemed(
          <FieldV4 hint="We never share this">
            <TextInput />
          </FieldV4>,
          seed,
          scheme
        );
        // `muted` is `neutral[600]` and promises nothing here.
        expect(
          contrastRatio(flat(hint.getByText('We never share this').props.style).color as string, surface)
        ).toBeGreaterThanOrEqual(4.5);
      });
    });
  });

  it('lets an error take the hint’s place, and announces it', () => {
    const { getByText, queryByText, UNSAFE_getAllByProps } = renderThemed(
      <FieldV4 label="Email" hint="We never share this" error="Enter a work address">
        <TextInput />
      </FieldV4>,
      SEED_LIGHT
    );
    expect(getByText('Enter a work address')).toBeTruthy();
    expect(queryByText('We never share this')).toBeNull();
    expect(UNSAFE_getAllByProps({ accessibilityRole: 'alert' }).length).toBeGreaterThan(0);
  });

  it('stacks on the spacing scale, so both twins are the same height', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <FieldV4 label="Email">
        <TextInput />
      </FieldV4>,
      SEED_LIGHT
    );
    const outer = flat(root.findAll((n) => typeof n.type === 'string')[0].props.style);
    expect(outer.gap).toBe(theme.spacing.xs);
  });

  it('labels through LabelV4, so "required" is announced there too', () => {
    const { getByLabelText } = renderThemed(
      <FieldV4 label="Email" required>
        <TextInput />
      </FieldV4>,
      SEED_LIGHT
    );
    expect(getByLabelText('Email, required')).toBeTruthy();
  });
});
